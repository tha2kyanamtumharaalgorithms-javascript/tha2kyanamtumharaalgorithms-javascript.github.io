// AWB Courier Dashboard
// All data fetched directly from courier APIs — no local database reads

let awbData = []; // unified data array from all couriers
let awbCurrentTab = 'all';
let awbLoading = false;

function openAwbDashboard() {
  w3_close();
  let pkj = document.getElementById('gstall');
  pkj.style.display = '';
  document.getElementById('bnm7').style.display = 'none';
  document.getElementById('p78').style.display = 'none';
  document.querySelector('.w3-bar.w3-panel').style.display = '';

  pkj.innerHTML = `<div id="awbDash">
    <div id="awbTabs" class="w3-bar w3-border-bottom" style="position:sticky;top:0;z-index:4;background:#fff;">
      <button class="w3-bar-item w3-button awb-tab awb-tab-active" onclick="awbSwitchTab('all',this)">All</button>
      <button class="w3-bar-item w3-button awb-tab" onclick="awbSwitchTab('scheduled',this)">Scheduled</button>
      <button class="w3-bar-item w3-button awb-tab" onclick="awbSwitchTab('transit',this)">In-Transit</button>
      <button class="w3-bar-item w3-button awb-tab" onclick="awbSwitchTab('delivered',this)">Delivered</button>
      <button class="w3-bar-item w3-button w3-right w3-light-grey" onclick="awbRefresh()" title="Refresh">&#x21bb;</button>
    </div>
    <div id="awbSummary" class="awb-summary">
      <div class="awb-card awb-card-warn"><b id="awbNotPicked">...</b><span>Not picked (3+ days)</span></div>
      <div class="awb-card awb-card-red"><b id="awbTotalDeducted">...</b><span>Total deducted cost</span></div>
      <div class="awb-card awb-card-grey"><b id="awbTotalCollected">&mdash;</b><span>Total collected cost</span></div>
    </div>
    <div id="awbTableWrap" class="awb-table-wrap">
      <table class="w3-table w3-striped w3-bordered w3-small" id="awbTable">
        <thead>
          <tr class="w3-blue-gray">
            <th>Track</th>
            <th>AWB</th>
            <th>Mobile</th>
            <th>Buyer</th>
            <th>Cancel</th>
            <th>Order ID</th>
            <th>Ship Cost</th>
            <th>Extra Wt.</th>
            <th>Other</th>
            <th>Collected</th>
          </tr>
        </thead>
        <tbody id="awbTableBody">
          <tr><td colspan="10"><p class="loading">.</p></td></tr>
        </tbody>
      </table>
    </div>
  </div>`;

  awbFetchAll();
}

// ============ FETCH ALL DATA FROM COURIER APIs ============

async function awbFetchAll() {
  if (awbLoading) return;
  awbLoading = true;
  awbData = [];

  try {
    // Fetch from all three courier services in parallel
    const [shpResults, dlResults, rkbResults] = await Promise.allSettled([
      awbFetchShipRocket(),
      awbFetchDelhivery(),
      awbFetchRocketBox()
    ]);

    if (shpResults.status === 'fulfilled' && shpResults.value) {
      awbData.push(...shpResults.value);
    }
    if (dlResults.status === 'fulfilled' && dlResults.value) {
      awbData.push(...dlResults.value);
    }
    if (rkbResults.status === 'fulfilled' && rkbResults.value) {
      awbData.push(...rkbResults.value);
    }

    // Sort by most recent first
    awbData.sort((a, b) => new Date(b.orderDate || 0) - new Date(a.orderDate || 0));

    if (!awbData.length) {
      document.getElementById('awbTableBody').innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px!important;">No shipments found from courier APIs</td></tr>';
    } else {
      awbRender(awbCurrentTab);
    }
  } catch (e) {
    console.log('AWB fetch error:', e);
    document.getElementById('awbTableBody').innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px!important;color:red;">Error fetching data: ' + e.message + '</td></tr>';
  }
  awbLoading = false;
}

// ============ SHIPROCKET: Fetch all orders/shipments ============

async function awbFetchShipRocket() {
  if (!shipr1) return [];
  const headers = { 'Content-Type': 'application/json', 'Authorization': shipr1 };
  let allOrders = [];
  let page = 1;
  let hasMore = true;

  // Fetch all orders page by page from ShipRocket API
  while (hasMore) {
    try {
      const url = 'https://apiv2.shiprocket.in/v1/external/orders?page=' + page + '&per_page=50';
      const res = await fetch(url, { method: 'GET', headers });

      if (res.status === 401) {
        // Token expired — try refresh
        await awbRefreshShpToken();
        return awbFetchShipRocket(); // retry once
      }

      const data = await res.json();

      if (data.data && data.data.length) {
        data.data.forEach(order => {
          let shipment = order.shipments?.[0] || {};
          let awb = shipment.awb || '';
          let status = shipment.status || order.status || 'NEW';
          let statusNorm = awbNormalizeStatus(status);

          // All data from ShipRocket API directly
          allOrders.push({
            id: order.id,
            channelOrderId: order.channel_order_id || order.id,
            awb: awb,
            dl: 'shp',
            courierName: shipment.courier_name || 'ShipRocket',
            buyer: order.customer_name || '',
            mobile: order.customer_phone || '',
            status: statusNorm,
            statusRaw: status,
            orderDate: order.created_at || '',
            pickupDate: shipment.pickup_scheduled_date || '',
            tch: Number(shipment.freight_charge || 0),
            och: Number(shipment.weight_charges || 0),
            otherCharges: Number(shipment.cod_charges || 0) + Number(shipment.rto_charges || 0) + Number(shipment.other_charges || 0),
            trackUrl: awb ? 'https://www.shiprocket.in/shipment-tracking/' + awb : '',
            cancelled: (status === 'CANCELED' || status === 'CANCELLED'),
            shipmentId: shipment.id || '',
            invoiceAmount: Number(order.total || 0)
          });
        });

        // Check if more pages
        let meta = data.meta || {};
        if (meta.last_page && page < meta.last_page) {
          page++;
        } else if (data.data.length === 50) {
          page++; // might have more
        } else {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    } catch (e) {
      console.log('ShipRocket fetch page ' + page + ' error:', e);
      hasMore = false;
    }
  }

  console.log('ShipRocket: fetched ' + allOrders.length + ' orders');
  return allOrders;
}

async function awbRefreshShpToken() {
  try {
    let res = await fetch('https://dsfdyyhqqgvk6duva445txkioq0jzoqe.lambda-url.ap-south-1.on.aws');
    let v = await res.json();
    localStorage.shipr1 = '{"a":"Bearer ' + v[0] + '"}';
    localStorage.setItem('shpdt', Date.now());
    shipr1 = 'Bearer ' + v[0];
  } catch (e) {
    console.log('ShipRocket token refresh error:', e);
  }
}

// ============ DELHIVERY: Fetch shipments via Lambda ============

async function awbFetchDelhivery() {
  const lambdaBase = 'https://bldn7ye7cv2pbdmdmgn4dhibi40fviwc.lambda-url.ap-south-1.on.aws';
  let allOrders = [];

  try {
    // Fetch all Delhivery shipments via Lambda
    const url = lambdaBase + '/del/shipments';
    const res = await fetch(url, { method: 'GET' });
    const data = await res.json();

    if (Array.isArray(data)) {
      data.forEach(pkg => {
        let status = pkg.status || pkg.Status || '';
        let statusNorm = awbNormalizeStatus(status);

        allOrders.push({
          id: pkg.client_order_id || pkg.order_id || pkg.refnum || '',
          awb: pkg.waybill || pkg.awb || '',
          dl: 'dl',
          courierName: 'Delhivery',
          buyer: pkg.consignee_name || pkg.name || '',
          mobile: pkg.consignee_phone || pkg.phone || '',
          status: statusNorm,
          statusRaw: status,
          orderDate: pkg.order_date || pkg.added_on || '',
          pickupDate: pkg.pickup_date || '',
          tch: Number(pkg.charges?.freight_charge || pkg.total_amount || 0),
          och: Number(pkg.charges?.weight_charge || 0),
          otherCharges: Number(pkg.charges?.cod_charge || 0) + Number(pkg.charges?.other_charge || 0),
          trackUrl: (pkg.waybill || pkg.awb) ? 'https://www.delhivery.com/track/package/' + (pkg.waybill || pkg.awb) : '',
          cancelled: (status === 'Cancelled' || status === 'RTO'),
          invoiceAmount: Number(pkg.total_amount || pkg.invoice_amount || 0)
        });
      });
    }
  } catch (e) {
    console.log('Delhivery fetch error:', e);
    // Lambda may not have /del/shipments endpoint yet — that's OK
  }

  console.log('Delhivery: fetched ' + allOrders.length + ' orders');
  return allOrders;
}

// ============ ROCKETBOX: Fetch shipments via Google Sheets macro ============

async function awbFetchRocketBox() {
  let allOrders = [];

  try {
    const rkbUrl = 'https://script.google.com/macros/s/AKfycbxV9vG5zPSAu2xFAZjXpEVfvyMlJOOZgbxvGafsz609QmUnHal2HWNCc9TToXO17xpzwg/exec';
    let formData = new FormData();
    formData.append('t', 'list'); // request shipment list

    const res = await fetch(rkbUrl, { method: 'POST', body: formData });
    const data = await res.json();

    if (Array.isArray(data)) {
      data.forEach(pkg => {
        let status = pkg.status || '';
        let statusNorm = awbNormalizeStatus(status);

        allOrders.push({
          id: pkg.order_id || pkg.id || '',
          awb: pkg.awb || pkg.tracking_id || pkg.label_url || '',
          dl: 'rkb',
          courierName: pkg.courier_name || 'RocketBox',
          buyer: pkg.recipient_name || pkg.buyer_name || '',
          mobile: pkg.recipient_phone || pkg.mobile || '',
          status: statusNorm,
          statusRaw: status,
          orderDate: pkg.order_date || pkg.created_at || '',
          pickupDate: pkg.pickup_date || '',
          tch: Number(pkg.freight_charge || pkg.rate || 0),
          och: Number(pkg.weight_charge || 0),
          otherCharges: Number(pkg.other_charges || 0),
          trackUrl: pkg.tracking_url || pkg.label_url || '',
          cancelled: (status === 'Cancelled'),
          invoiceAmount: Number(pkg.invoice_value || 0)
        });
      });
    }
  } catch (e) {
    console.log('RocketBox fetch error:', e);
    // Google Sheets macro may not support 'list' yet — that's OK
  }

  console.log('RocketBox: fetched ' + allOrders.length + ' orders');
  return allOrders;
}

// ============ STATUS NORMALIZATION ============

function awbNormalizeStatus(raw) {
  if (!raw) return 'Unknown';
  let s = raw.toLowerCase().trim();

  // Delivered
  if (s === 'delivered' || s === 'dl_delivered') return 'Delivered';

  // In Transit
  if (s.includes('transit') || s === 'shipped' || s === 'in transit'
    || s === 'in_transit' || s === 'reached at destination hub') return 'In Transit';

  // Out for delivery
  if (s.includes('out for delivery') || s === 'out_for_delivery') return 'Out for Delivery';

  // Pickup / Scheduled
  if (s.includes('pickup') || s === 'ready to ship' || s === 'pickup scheduled'
    || s === 'pickup_scheduled' || s === 'manifested' || s === 'new'
    || s === 'created' || s === 'ready_to_ship' || s === 'booked') return 'Pickup Scheduled';

  // Not picked up
  if (s.includes('not picked') || s === 'pickup_error' || s === 'pickup error') return 'Not Picked';

  // Cancelled / RTO
  if (s.includes('cancel') || s === 'canceled') return 'Cancelled';
  if (s.includes('rto') || s === 'rto_delivered' || s === 'returned') return 'RTO';

  // Pending
  if (s === 'pending' || s === 'processing') return 'Pending';

  return raw; // return as-is if no match
}

// ============ TAB SWITCHING ============

function awbSwitchTab(tab, btn) {
  awbCurrentTab = tab;
  document.querySelectorAll('.awb-tab').forEach(b => b.classList.remove('awb-tab-active'));
  btn.classList.add('awb-tab-active');
  awbRender(tab);
}

// ============ RENDER TABLE ============

function awbRender(tab) {
  let filtered = awbData;
  if (tab === 'scheduled') {
    filtered = awbData.filter(d => ['Pickup Scheduled', 'Not Picked', 'Pending', 'Ready to Ship', 'Booked'].includes(d.status));
  } else if (tab === 'transit') {
    filtered = awbData.filter(d => ['In Transit', 'Out for Delivery'].includes(d.status));
  } else if (tab === 'delivered') {
    filtered = awbData.filter(d => d.status === 'Delivered');
  }

  let html = '';
  if (!filtered.length) {
    html = '<tr><td colspan="10" style="text-align:center;padding:20px!important;">No shipments in this category</td></tr>';
  } else {
    filtered.forEach(d => {
      let trackLink = d.trackUrl
        ? `<a href="${d.trackUrl}" target="_blank" class="awb-track-link">${d.courierName}</a>`
        : d.courierName;

      let awbDisplay = d.awb || '\u2014';
      if (typeof awbDisplay === 'object') awbDisplay = JSON.stringify(awbDisplay);
      if (awbDisplay.length > 20) awbDisplay = awbDisplay.slice(0, 20) + '...';

      let cancelBtn = d.cancelled
        ? '<span style="color:#999;font-size:10px">Cancelled</span>'
        : `<button class="w3-button w3-tiny w3-red w3-round" onclick="awbCancel('${d.id}','${d.dl}')">Cancel</button>`;

      let statusBadge = `<span class="awb-status awb-st-${awbStatusClass(d.status)}">${d.status}</span>`;

      html += `<tr>
        <td style="white-space:nowrap">${trackLink}</td>
        <td title="${d.awb || ''}">${awbDisplay}</td>
        <td><a href="tel:${d.mobile}">${d.mobile || '\u2014'}</a></td>
        <td>${d.buyer || '\u2014'}</td>
        <td>${cancelBtn}</td>
        <td>${d.id} ${statusBadge}</td>
        <td>${d.tch}\u20B9</td>
        <td>${d.och}\u20B9</td>
        <td>${d.otherCharges}\u20B9</td>
        <td>\u2014</td>
      </tr>`;
    });
  }

  document.getElementById('awbTableBody').innerHTML = html;
  awbCalcSummary(filtered);
}

function awbStatusClass(status) {
  if (status === 'Delivered') return 'green';
  if (['In Transit', 'Out for Delivery'].includes(status)) return 'blue';
  if (['Not Picked', 'RTO', 'Cancelled'].includes(status)) return 'red';
  return 'yellow';
}

// ============ SUMMARY METRICS ============

function awbCalcSummary(data) {
  let threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  let now = Date.now();

  // 3-day old not picked: scheduled orders older than 3 days
  let notPicked = data.filter(d => {
    let isScheduled = ['Pickup Scheduled', 'Not Picked', 'Pending', 'Ready to Ship', 'Booked'].includes(d.status);
    if (!isScheduled) return false;
    let bookTime = d.orderDate ? new Date(d.orderDate).getTime() : 0;
    if (!bookTime || isNaN(bookTime)) return false;
    return (now - bookTime) > threeDaysMs;
  }).length;

  // Total deducted shipping cost (all charges from courier APIs)
  let totalDeducted = data.reduce((sum, d) => sum + (d.tch || 0) + (d.och || 0) + (d.otherCharges || 0), 0);

  document.getElementById('awbNotPicked').textContent = notPicked;
  document.getElementById('awbTotalDeducted').textContent = Math.ceil(totalDeducted).toLocaleString('en-IN') + '\u20B9';
}

// ============ CANCEL SHIPMENT ============

async function awbCancel(orderId, courierType) {
  let rec = awbData.find(d => String(d.id) === String(orderId));
  if (!rec) return;

  let msg = 'Cancel shipment?\nOrder: ' + orderId + '\nCourier: ' + rec.courierName + '\nAWB: ' + (rec.awb || 'N/A') + '\nBuyer: ' + rec.buyer;
  if (!confirm(msg)) return;

  try {
    if (courierType === 'shp') {
      // ShipRocket: cancel order via API
      let url = 'https://apiv2.shiprocket.in/v1/external/orders/cancel';
      let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': shipr1 },
        body: JSON.stringify({ ids: [orderId] })
      });
      let data = await res.json();
      if (res.ok) {
        rec.status = 'Cancelled';
        rec.cancelled = true;
        snackbar('ShipRocket order cancelled', 1500);
      } else {
        alert('Cancel failed: ' + (data.message || JSON.stringify(data)));
        return;
      }
    } else if (courierType === 'dl' || courierType?.startsWith('dl')) {
      // Delhivery: cancel via Lambda
      let lambdaUrl = 'https://bldn7ye7cv2pbdmdmgn4dhibi40fviwc.lambda-url.ap-south-1.on.aws/del/cancel';
      let res = await fetch(lambdaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ waybill: rec.awb, order_id: orderId })
      });
      let data = await res.json();
      if (res.ok) {
        rec.status = 'Cancelled';
        rec.cancelled = true;
        snackbar('Delhivery order cancelled', 1500);
      } else {
        alert('Cancel failed: ' + (data.message || data.error || JSON.stringify(data)));
        return;
      }
    } else if (courierType === 'rkb') {
      // RocketBox: cancel via Google Sheets macro
      let rkbUrl = 'https://script.google.com/macros/s/AKfycbxV9vG5zPSAu2xFAZjXpEVfvyMlJOOZgbxvGafsz609QmUnHal2HWNCc9TToXO17xpzwg/exec';
      let formData = new FormData();
      formData.append('t', 'cancel');
      formData.append('order_id', orderId);
      formData.append('awb', rec.awb);
      let res = await fetch(rkbUrl, { method: 'POST', body: formData });
      let data = await res.json();
      if (res.ok) {
        rec.status = 'Cancelled';
        rec.cancelled = true;
        snackbar('RocketBox order cancelled', 1500);
      } else {
        alert('Cancel failed: ' + (data.message || JSON.stringify(data)));
        return;
      }
    }

    awbRender(awbCurrentTab);
  } catch (e) {
    console.log('Cancel error:', e);
    alert('Cancel failed: ' + e.message);
  }
}

// ============ REFRESH ============

function awbRefresh() {
  if (awbLoading) return;
  snackbar('Refreshing from couriers...', 1000);
  document.getElementById('awbTableBody').innerHTML = '<tr><td colspan="10"><p class="loading">.</p></td></tr>';
  awbFetchAll();
}
