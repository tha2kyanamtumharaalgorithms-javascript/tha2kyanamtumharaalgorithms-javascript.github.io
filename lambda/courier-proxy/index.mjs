// Courier Proxy Lambda — handles Delhivery, ShipRocket, and RocketBox API calls
// Deploy as AWS Lambda with Node.js 20.x, Function URL enabled, 30s timeout
//
// Environment Variables Required:
//   DL_TOKEN_A  — Delhivery DUSHIRTS01 SURFACE token
//   DL_TOKEN_B  — Delhivery 10KG DUSURFACE token
//   DL_TOKEN_C  — Delhivery DUSHIRTSEXPRESS token
//   SHP_EMAIL   — ShipRocket login email
//   SHP_PASS    — ShipRocket login password
//   RKB_TOKEN   — RocketBox Bearer token

import https from 'https';

const env = process.env;

// Delhivery token mapping: dl0=Surface(A), dl1=Express(C), dl2=10KG(B)
const DL_TOKENS = { dl0: env.DL_TOKEN_A, dl1: env.DL_TOKEN_C, dl2: env.DL_TOKEN_B };
let rkbTokenOverride = ''; // Updated at runtime by Google Script's rkb() trigger

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

function res(body, status = 200) {
  return { statusCode: status, headers: CORS, body: typeof body === 'string' ? body : JSON.stringify(body) };
}

// HTTPS fetch helper (no dependencies)
function nfetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: opts.method || 'GET',
      headers: opts.headers || {}
    };
    const req = https.request(options, (r) => {
      let data = '';
      r.on('data', c => data += c);
      r.on('end', () => resolve({ status: r.statusCode, body: data }));
    });
    req.on('error', reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

// ============ SHIPROCKET ============

async function shpLogin() {
  const r = await nfetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: env.SHP_EMAIL, password: env.SHP_PASS })
  });
  const d = JSON.parse(r.body);
  return d.token;
}

async function shpOrders(q) {
  const token = await shpLogin();
  const params = new URLSearchParams();
  params.set('page', q?.page || 1);
  params.set('per_page', q?.per_page || 50);
  // Pass through optional filter params
  if (q?.status) params.set('status', q.status);
  if (q?.filter) params.set('filter', q.filter);
  if (q?.filter_by) params.set('filter_by', q.filter_by);
  if (q?.sort) params.set('sort', q.sort);
  if (q?.sort_by) params.set('sort_by', q.sort_by);
  const r = await nfetch(`https://apiv2.shiprocket.in/v1/external/orders?${params}`, {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
  });
  return r.body;
}

async function shpOrderDetail(orderId) {
  const token = await shpLogin();
  const r = await nfetch(`https://apiv2.shiprocket.in/v1/external/orders/show/${orderId}`, {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
  });
  return r.body;
}

async function shpCancel(body) {
  const token = await shpLogin();
  const r = await nfetch('https://apiv2.shiprocket.in/v1/external/orders/cancel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(body)
  });
  return r.body;
}

// Weight discrepancy endpoint removed — ShipRocket does NOT have a public API for this.
// Weight dispute data is only available in the ShipRocket dashboard UI.

async function shpBook(courierId, orderData) {
  const token = await shpLogin();
  const auth = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };

  // Step 1: Create order
  const r1 = await nfetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
    method: 'POST', headers: auth, body: orderData
  });
  const order = JSON.parse(r1.body);
  const shipmentId = order.shipment_id;
  if (!shipmentId) return r1.body;

  // Step 2: Assign AWB
  const r2 = await nfetch('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', {
    method: 'POST', headers: auth,
    body: JSON.stringify({ shipment_id: shipmentId, courier_id: Number(courierId) })
  });
  const awbData = JSON.parse(r2.body);
  const awb = awbData?.response?.data?.awb_code || '';

  // Step 3: Generate pickup
  try {
    await nfetch('https://apiv2.shiprocket.in/v1/external/courier/generate/pickup', {
      method: 'POST', headers: auth,
      body: JSON.stringify({ shipment_id: [shipmentId] })
    });
  } catch (e) { console.log('Pickup generation error:', e); }

  return JSON.stringify({ a: [shipmentId, awb] });
}

// ============ DELHIVERY ============

async function dlPricing(query) {
  const qs = new URLSearchParams(query).toString();
  const baseUrl = 'https://track.delhivery.com/api/kinko/v1/invoice/charges/.json?' + qs;

  // Fetch 3 Delhivery services + RocketBox in parallel (same order as Google Script: a, c, b)
  // Delhivery requires md param: S=Surface, E=Express
  const [rA, rC, rB, rRkb] = await Promise.all([
    nfetch(baseUrl + '&md=S', { headers: { 'Authorization': env.DL_TOKEN_A, 'Content-Type': 'application/json' } }),
    nfetch(baseUrl + '&md=E', { headers: { 'Authorization': env.DL_TOKEN_C, 'Content-Type': 'application/json' } }),
    nfetch(baseUrl + '&md=S', { headers: { 'Authorization': env.DL_TOKEN_B, 'Content-Type': 'application/json' } }),
    rkbPricing(query)
  ]);

  return '[' + rA.body + ',' + rC.body + ',' + rB.body + ',' + rRkb + ']';
}

async function rkbPricing(query) {
  const weight = Number(query.cgm || 0) / 1000; // grams to kg
  const oPin = query.o_pin || '110062';
  let fromCity = 'aaaa', fromState = 'aaaa';
  if (oPin == '110062') { fromCity = 'New Delhi'; fromState = 'Delhi'; }
  else if (oPin == '641607') { fromCity = 'Tiruppur'; fromState = 'Tamil Nadu'; }

  const payload = {
    from_pincode: oPin,
    to_pincode: query.d_pin,
    from_city: fromCity,
    from_state: fromState,
    to_city: 'aaaa',
    to_state: 'aaaa',
    packaging_unit_details: [{ weight, units: 1, length: 1, height: 2, width: 3, unit: 'cm' }],
    quantity: 1,
    invoice_value: 1000
  };

  const r = await nfetch('https://api.rocketbox.in/api/shipment/charges/', {
    method: 'POST',
    headers: { 'Authorization': rkbTokenOverride || env.RKB_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return r.body;
}

async function dlPincode(pin) {
  const r = await nfetch('https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=' + pin, {
    headers: { 'Authorization': env.DL_TOKEN_A, 'Content-Type': 'application/json' }
  });
  const data = JSON.parse(r.body);
  const info = data?.delivery_codes?.[0]?.postal_code;
  if (info) {
    return JSON.stringify({ location: [info.city, info.state_code] });
  }
  return JSON.stringify({ location: [] });
}

async function dlShipments() {
  // Fetch shipments from all 3 Delhivery accounts in parallel
  const fetchAccount = async (token) => {
    const r = await nfetch('https://track.delhivery.com/api/v1/packages/json/?verbose=2&page_size=200', {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    });
    try {
      const d = JSON.parse(r.body);
      return d.ShipmentData || [];
    } catch { return []; }
  };

  const [a, b, c] = await Promise.all([
    fetchAccount(env.DL_TOKEN_A),
    fetchAccount(env.DL_TOKEN_B),
    fetchAccount(env.DL_TOKEN_C)
  ]);

  // Normalize to flat array the frontend expects
  const all = [];
  for (const list of [a, b, c]) {
    for (const s of list) {
      const pkg = s.Shipment || s;
      all.push({
        client_order_id: pkg.OrderID || pkg.ReferenceNo || '',
        waybill: pkg.AWB || '',
        status: pkg.Status?.Status || '',
        consignee_name: pkg.Consignee?.Name || pkg.ConsigneeName || '',
        consignee_phone: pkg.Consignee?.Phone || pkg.DestRecievedBy || '',
        order_date: pkg.PickUpDate || pkg.SRScanDate || '',
        charges: {
          freight_charge: Number(pkg.Charges?.TotalFreightCharges || pkg.Charges?.ActualCharges || 0),
          weight_charge: Number(pkg.Charges?.ExcessWeightCharges || 0),
          cod_charge: Number(pkg.Charges?.CODCharges || 0),
          other_charge: Number(pkg.Charges?.OtherCharges || 0)
        },
        total_amount: Number(pkg.InvoiceAmount || 0)
      });
    }
  }
  return JSON.stringify(all);
}

async function dlCancel(body) {
  // Cancel by waybill
  const payload = JSON.stringify({
    waybill: body.waybill,
    cancellation: true
  });
  const r = await nfetch('https://track.delhivery.com/api/p/edit', {
    method: 'POST',
    headers: { 'Authorization': env.DL_TOKEN_A, 'Content-Type': 'application/json' },
    body: payload
  });
  return r.body;
}

async function dlBook(dlType, bookingData) {
  const token = DL_TOKENS[dlType];
  if (!token) return JSON.stringify({ error: 'Unknown delivery type: ' + dlType });

  const r = await nfetch('https://track.delhivery.com/api/cmu/create.json', {
    method: 'POST',
    headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: bookingData
  });
  return r.body;
}

// ============ MAIN HANDLER ============

export const handler = async (event) => {
  console.log('Request:', event.rawPath, event.requestContext?.http?.method);

  // Handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return res('');
  }

  const path = event.rawPath || event.path || '/';
  const method = event.requestContext?.http?.method || 'GET';
  const q = event.queryStringParameters || {};

  try {
    // --- RocketBox: Token update from Google Script ---
    if (q.rkb) {
      rkbTokenOverride = 'Bearer ' + q.rkb;
      return res({ ok: true, msg: 'RKB token updated' });
    }

    // --- ShipRocket: Token refresh ---
    if (path === '/token' || path === '/token/') {
      const token = await shpLogin();
      return res([token]);
    }

    // --- ShipRocket: Fetch orders ---
    if (path === '/orders' || path === '/orders/') {
      const data = await shpOrders(q);
      return res(data);
    }

    // --- ShipRocket: Order detail ---
    if (path.match(/^\/orders\/show\/\d+$/)) {
      const orderId = path.split('/').pop();
      const data = await shpOrderDetail(orderId);
      return res(data);
    }

    // --- ShipRocket: Cancel ---
    if (path === '/cancel' || path === '/cancel/') {
      const body = JSON.parse(event.body || '{}');
      const data = await shpCancel(body);
      return res(data);
    }

    // --- ShipRocket: Book ---
    if (path.startsWith('/shp/')) {
      const courierId = path.split('/shp/')[1];
      const data = await shpBook(courierId, event.body);
      return res(data);
    }

    // --- Delhivery + RocketBox: Pricing ---
    if (path === '/price' || path === '/price/' || (path === '/' && q.o_pin)) {
      const data = await dlPricing(q);
      return res(data);
    }

    // --- Delhivery: Pincode lookup ---
    if (path.startsWith('/pin/')) {
      const pin = path.split('/pin/')[1];
      const data = await dlPincode(pin);
      return res(data);
    }

    // --- Delhivery: Fetch shipments ---
    if (path === '/del/shipments' || path === '/del/shipments/') {
      const data = await dlShipments();
      return res(data);
    }

    // --- Delhivery: Cancel ---
    if (path === '/del/cancel' || path === '/del/cancel/') {
      const body = JSON.parse(event.body || '{}');
      const data = await dlCancel(body);
      return res(data);
    }

    // --- Delhivery: Book (dl0, dl1, dl2) ---
    if (path.match(/^\/del\/dl[0-2]$/)) {
      const dlType = path.split('/del/')[1]; // dl0, dl1, or dl2
      const data = await dlBook(dlType, event.body);
      return res(data);
    }

    // --- Root: backward compatible (pricing if query params, else token) ---
    if (path === '/') {
      if (Object.keys(q).length > 0) {
        const data = await dlPricing(q);
        return res(data);
      }
      const token = await shpLogin();
      return res([token]);
    }

    return res({ error: 'Not found: ' + path }, 404);

  } catch (err) {
    console.error('Handler error:', err);
    return res({ error: err.message || 'Internal error' }, 500);
  }
};
