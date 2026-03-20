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
// NOTE: Env vars must include "Token " prefix (e.g. "Token abc123...")
const DL_TOKENS = { dl0: env.DL_TOKEN_A, dl1: env.DL_TOKEN_C, dl2: env.DL_TOKEN_B };
let rkbTokenOverride = ''; // Updated at runtime by Google Script's rkb() trigger

// Log token info at cold start (safe: only first 15 chars)
console.log('DL_TOKEN_A:', env.DL_TOKEN_A ? env.DL_TOKEN_A.substring(0, 15) + '...' : 'MISSING');
console.log('DL_TOKEN_B:', env.DL_TOKEN_B ? env.DL_TOKEN_B.substring(0, 15) + '...' : 'MISSING');
console.log('DL_TOKEN_C:', env.DL_TOKEN_C ? env.DL_TOKEN_C.substring(0, 15) + '...' : 'MISSING');
console.log('RKB_TOKEN:', env.RKB_TOKEN ? env.RKB_TOKEN.substring(0, 15) + '...' : 'MISSING');

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
  const params = new URLSearchParams(query);
  // ss is mandatory for Delhivery pricing API (possible values: RTO, DTO, Delivered)
  if (!params.has('ss')) params.set('ss', 'Delivered');
  const baseUrl = 'https://track.delhivery.com/api/kinko/v1/invoice/charges/.json?' + params.toString();

  console.log('[dlPricing] Query params:', JSON.stringify(query));
  console.log('[dlPricing] Base URL:', baseUrl);

  // Fetch 3 Delhivery services + RocketBox in parallel (same order as Google Script: a, c, b)
  // Delhivery requires md param: S=Surface, E=Express
  const [rA, rC, rB, rRkb] = await Promise.all([
    nfetch(baseUrl + '&md=S', { headers: { 'Authorization': env.DL_TOKEN_A, 'Content-Type': 'application/json' } }),
    nfetch(baseUrl + '&md=E', { headers: { 'Authorization': env.DL_TOKEN_C, 'Content-Type': 'application/json' } }),
    nfetch(baseUrl + '&md=S', { headers: { 'Authorization': env.DL_TOKEN_B, 'Content-Type': 'application/json' } }),
    rkbPricing(query)
  ]);

  // Log each Delhivery response for debugging
  console.log('[dlPricing] DL_A (DUSHIRTS01 Surface) status:', rA.status, 'body:', rA.body.substring(0, 300));
  console.log('[dlPricing] DL_C (DUSHIRTSEXPRESS) status:', rC.status, 'body:', rC.body.substring(0, 300));
  console.log('[dlPricing] DL_B (10KG DUSURFACE) status:', rB.status, 'body:', rB.body.substring(0, 300));
  console.log('[dlPricing] RocketBox body:', (typeof rRkb === 'string' ? rRkb : JSON.stringify(rRkb)).substring(0, 300));

  // Ensure each Delhivery response is always a valid JSON array
  // Frontend expects v[0][0].total_amount — if Delhivery returns XML/error, return error object inside array
  const wrapArray = (raw, status, label) => {
    try {
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      // Log the actual field names so we can debug "undefined" pricing
      if (arr[0]) console.log('[dlPricing]', label, 'keys:', Object.keys(arr[0]).join(','), 'total_amount:', arr[0].total_amount);
      return JSON.stringify(arr);
    } catch (e) {
      console.error('[dlPricing] FAILED to parse ' + label + ' (HTTP ' + status + '):', raw.substring(0, 200));
      // Return a valid JSON array with error info so the whole response stays valid JSON
      return JSON.stringify([{ error: true, total_amount: 0, msg: label + ' HTTP ' + status, detail: raw.substring(0, 100) }]);
    }
  };

  return '[' + wrapArray(rA.body, rA.status, 'DL_A') + ',' + wrapArray(rC.body, rC.status, 'DL_C') + ',' + wrapArray(rB.body, rB.status, 'DL_B') + ',' + rRkb + ']';
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
  console.log('[dlPincode] pin:', pin, 'status:', r.status);
  const data = JSON.parse(r.body);
  const info = data?.delivery_codes?.[0]?.postal_code;
  if (info) {
    return JSON.stringify({ location: [info.city, info.state_code] });
  }
  return JSON.stringify({ location: [] });
}

async function dlShipments() {
  // Fetch shipments from all 3 Delhivery accounts in parallel
  const fetchAccount = async (token, label) => {
    const r = await nfetch('https://track.delhivery.com/api/v1/packages/json/?verbose=2&page_size=200', {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    });
    console.log('[dlShipments]', label, 'status:', r.status, 'bodyLen:', r.body.length);
    try {
      const d = JSON.parse(r.body);
      return d.ShipmentData || [];
    } catch { return []; }
  };

  const [a, b, c] = await Promise.all([
    fetchAccount(env.DL_TOKEN_A, 'DL_A'),
    fetchAccount(env.DL_TOKEN_B, 'DL_B'),
    fetchAccount(env.DL_TOKEN_C, 'DL_C')
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

// ============ DEBUG ENDPOINT ============

async function debugTokens() {
  const results = {};

  // Test each Delhivery token against pincode endpoint (lightweight)
  const testToken = async (token, label) => {
    if (!token) return { status: 'MISSING', token_preview: 'N/A' };
    try {
      const r = await nfetch('https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=110062', {
        headers: { 'Authorization': token, 'Content-Type': 'application/json' }
      });
      const isJson = r.body.trim().startsWith('{') || r.body.trim().startsWith('[');
      return {
        http_status: r.status,
        token_preview: token.substring(0, 15) + '...',
        token_length: token.length,
        response_is_json: isJson,
        response_preview: r.body.substring(0, 150)
      };
    } catch (e) {
      return { status: 'ERROR', error: e.message, token_preview: token.substring(0, 15) + '...' };
    }
  };

  // Test pricing endpoint — show full response so we can see field names
  const testPricing = async (token, label) => {
    if (!token) return { status: 'MISSING TOKEN' };
    try {
      const r = await nfetch('https://track.delhivery.com/api/kinko/v1/invoice/charges/.json?o_pin=110062&d_pin=110062&cgm=500&ss=Delivered&md=S', {
        headers: { 'Authorization': token, 'Content-Type': 'application/json' }
      });
      try {
        const parsed = JSON.parse(r.body);
        const obj = Array.isArray(parsed) ? parsed[0] : parsed;
        return {
          http_status: r.status,
          response_keys: obj ? Object.keys(obj) : [],
          has_total_amount: obj ? ('total_amount' in obj) : false,
          full_response: obj
        };
      } catch {
        return { http_status: r.status, parse_error: true, response_preview: r.body.substring(0, 300) };
      }
    } catch (e) {
      return { status: 'ERROR', error: e.message };
    }
  };

  const [a, b, c, pricingA] = await Promise.all([
    testToken(env.DL_TOKEN_A, 'DL_TOKEN_A'),
    testToken(env.DL_TOKEN_B, 'DL_TOKEN_B'),
    testToken(env.DL_TOKEN_C, 'DL_TOKEN_C'),
    testPricing(env.DL_TOKEN_A, 'DL_TOKEN_A')
  ]);

  results.DL_TOKEN_A_pincode = a;
  results.DL_TOKEN_B_pincode = b;
  results.DL_TOKEN_C_pincode = c;
  results.DL_TOKEN_A_pricing = pricingA;
  results.RKB_TOKEN = env.RKB_TOKEN ? { preview: env.RKB_TOKEN.substring(0, 15) + '...', length: env.RKB_TOKEN.length } : 'MISSING';
  results.rkbTokenOverride = rkbTokenOverride ? rkbTokenOverride.substring(0, 15) + '...' : 'not set';

  return results;
}

// ============ MAIN HANDLER ============

export const handler = async (event) => {
  const path = event.rawPath || event.path || '/';
  const method = event.requestContext?.http?.method || 'GET';
  const q = event.queryStringParameters || {};

  console.log('Request:', path, method, 'query:', JSON.stringify(q));

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return res('');
  }

  try {
    // --- RocketBox: Token update from Google Script ---
    if (q.rkb) {
      rkbTokenOverride = 'Bearer ' + q.rkb;
      return res({ ok: true, msg: 'RKB token updated' });
    }

    // --- Debug: Test all tokens ---
    if (path === '/debug' || path === '/debug/') {
      const data = await debugTokens();
      console.log('[debug] results:', JSON.stringify(data));
      return res(data);
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
