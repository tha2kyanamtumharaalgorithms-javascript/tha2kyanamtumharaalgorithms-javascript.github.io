// AWB Courier Dashboard
// Displays all shipments across ShipRocket, RocketBox, Delhivery with live tracking

let awbData = []; // unified data array
let awbCurrentTab = 'all';

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
      <div class="awb-card awb-card-warn"><b id="awbNotPicked">0</b><span>Not picked (3+ days)</span></div>
      <div class="awb-card awb-card-red"><b id="awbTotalDeducted">0</b><span>Total deducted cost</span></div>
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

  awbLoadData();
}

async function awbLoadData() {
  try {
    awbData = [];
    const dlRecords = await dldb.dl.toArray();
    if (!dlRecords.length) {
      document.getElementById('awbTableBody').innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px!important;">No shipments found</td></tr>';
      return;
    }

    // Build enriched data for each delivery record
    for (const dl of dlRecords) {
      let awb = '';
      if (dl.order) {
        if (dl.dl === 'shp') {
          // ShipRocket: order can be an object with order_id/shipment_id or AWB
          awb = dl.order?.order_id || dl.order?.shipment_id || dl.order?.awb_code || (typeof dl.order === 'string' ? dl.order : JSON.stringify(dl.order));
        } else if (dl.dl === 'rkb') {
          awb = dl.order[0] || '';
        } else {
          // Delhivery: waybill stored in dl.order[0]
          awb = dl.order[0] || '';
        }
      }

      let buyer = '', mobile = '';
      // Try to get party data via order's pt field
      try {
        let orderId = String(dl.id);
        let monthKey = 's' + orderId.slice(0, 6);
        let tmpDb = new Dexie(monthKey);
        tmpDb.version(1).stores({ od: "id,dt,bulk" });
        let od = await tmpDb.od.get(dl.id);
        if (od && od.pt) {
          let pt = await db.pt.get(od.pt);
          if (pt) {
            buyer = pt.cn || '';
            mobile = pt.mn1 || '';
          }
        }
        if (!buyer && od) buyer = od.cn || '';
      } catch (e) { }

      let courierName = dl.dl;
      if (dl.dl === 'shp') courierName = 'ShipRocket';
      else if (dl.dl === 'rkb') courierName = 'RocketBox';
      else if (dl.dl?.startsWith('dl')) courierName = 'Delhivery';

      awbData.push({
        id: dl.id,
        awb: awb,
        dl: dl.dl,
        courierName: courierName,
        coid: dl.coid,
        tch: dl.tch || 0,
        och: dl.och || 0,
        otherCharges: 0,
        st: dl.st,
        buyer: buyer,
        mobile: mobile,
        status: dl.st === 0 ? 'Booked' : 'Saved',
        trackUrl: '',
        bookDate: dl.book?.order_date || '',
        cancelled: false,
        _raw: dl
      });
    }

    // Set tracking URLs
    awbData.forEach(d => {
      if (d.dl === 'shp' && d.awb) {
        d.trackUrl = 'https://www.shiprocket.in/shipment-tracking/' + d.awb;
      } else if (d.dl?.startsWith('dl') && d.awb) {
        d.trackUrl = 'https://www.delhivery.com/track/package/' + d.awb;
      } else if (d.dl === 'rkb' && d.awb) {
        d.trackUrl = d.awb; // label URL is the tracking link
      }
    });

    awbRender(awbCurrentTab);

    // Fetch live tracking for ShipRocket in background
    awbFetchShipRocketTracking();
  } catch (e) {
    console.log('AWB load error:', e);
    document.getElementById('awbTableBody').innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px!important;color:red;">Error loading data</td></tr>';
  }
}

async function awbFetchShipRocketTracking() {
  if (!shipr1) return;
  const shpRecords = awbData.filter(d => d.dl === 'shp' && d.awb);
  if (!shpRecords.length) return;

  const headers = { 'Content-Type': 'application/json', 'Authorization': shipr1 };

  // Fetch tracking for each ShipRocket AWB
  const promises = shpRecords.map(async (rec) => {
    try {
      // Try tracking by AWB
      let awbId = rec.awb;
      // If awb is an object, extract the AWB code
      if (typeof awbId === 'object') {
        awbId = awbId.awb_code || awbId.order_id || '';
      }
      if (!awbId || awbId === '{}') return;

      const url = 'https://apiv2.shiprocket.in/v1/external/courier/track/awb/' + awbId;
      const res = await fetch(url, { method: 'GET', headers });
      const data = await res.json();

      if (data.tracking_data) {
        let td = data.tracking_data;
        rec.status = td.shipment_status_id ? awbMapShpStatus(td.shipment_status_id) : (td.shipment_track?.[0]?.current_status || rec.status);
        rec.trackUrl = td.track_url || rec.trackUrl;

        // Extract AWB if we got a better one
        if (td.shipment_track?.[0]?.awb_code) {
          rec.awb = td.shipment_track[0].awb_code;
        }
      }

      // Also fetch order details for charges
      try {
        const orderUrl = 'https://apiv2.shiprocket.in/v1/external/orders/show/' + rec.id;
        const ores = await fetch(orderUrl, { method: 'GET', headers });
        const odata = await ores.json();
        if (odata.data) {
          let od = odata.data;
          // Get charges breakdown from ShipRocket
          if (od.shipments?.[0]) {
            let shp = od.shipments[0];
            rec.tch = shp.freight_charge || rec.tch;
            rec.otherCharges = (shp.weight_charges || 0) + (shp.cod_charges || 0) + (shp.rto_charges || 0);
            if (shp.awb) rec.awb = shp.awb;
          }
        }
      } catch (e) { }

    } catch (e) {
      console.log('ShipRocket tracking error for', rec.id, e);
    }
  });

  await Promise.allSettled(promises);
  awbRender(awbCurrentTab);
}

function awbMapShpStatus(statusId) {
  // ShipRocket status IDs mapping
  const map = {
    1: 'Pickup Scheduled', 2: 'Pickup Scheduled', 3: 'Pickup Scheduled',
    4: 'Pickup Scheduled', 5: 'Pickup Scheduled',
    6: 'In Transit', 7: 'Delivered', 8: 'Not Picked',
    9: 'RTO', 10: 'RTO', 17: 'Out for Delivery',
    18: 'In Transit', 19: 'Out for Delivery', 20: 'In Transit',
    38: 'Pickup Scheduled', 39: 'Pickup Scheduled', 40: 'Pickup Scheduled',
    41: 'In Transit', 42: 'Cancelled'
  };
  return map[statusId] || 'Unknown';
}

function awbSwitchTab(tab, btn) {
  awbCurrentTab = tab;
  document.querySelectorAll('.awb-tab').forEach(b => b.classList.remove('awb-tab-active'));
  btn.classList.add('awb-tab-active');
  awbRender(tab);
}

function awbRender(tab) {
  let filtered = awbData;
  if (tab === 'scheduled') {
    filtered = awbData.filter(d => ['Booked', 'Saved', 'Pickup Scheduled', 'Ready to Ship', 'Not Picked'].includes(d.status));
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
      let trackLink = d.trackUrl ? `<a href="${d.trackUrl}" target="_blank" class="awb-track-link">${d.courierName}</a>` : d.courierName;
      let awbDisplay = d.awb || '—';
      if (typeof awbDisplay === 'object') awbDisplay = JSON.stringify(awbDisplay);
      if (awbDisplay.length > 20) awbDisplay = awbDisplay.slice(0, 20) + '...';
      let cancelBtn = d.cancelled ? '<span style="color:#999">Cancelled</span>' : `<button class="w3-button w3-tiny w3-red w3-round" onclick="awbCancel(${d.id},'${d.dl}')">Cancel</button>`;
      let statusBadge = `<span class="awb-status awb-st-${awbStatusClass(d.status)}">${d.status}</span>`;

      html += `<tr data-status="${d.status}">
        <td style="white-space:nowrap">${trackLink}</td>
        <td title="${d.awb || ''}">${awbDisplay}</td>
        <td>${d.mobile || '—'}</td>
        <td>${d.buyer || '—'}</td>
        <td>${cancelBtn}</td>
        <td>${d.id} ${statusBadge}</td>
        <td>${d.tch}₹</td>
        <td>${d.och}₹</td>
        <td>${d.otherCharges}₹</td>
        <td>—</td>
      </tr>`;
    });
  }

  document.getElementById('awbTableBody').innerHTML = html;
  awbCalcSummary(filtered);
}

function awbStatusClass(status) {
  if (['Delivered'].includes(status)) return 'green';
  if (['In Transit', 'Out for Delivery'].includes(status)) return 'blue';
  if (['Not Picked', 'RTO', 'Cancelled'].includes(status)) return 'red';
  return 'yellow';
}

function awbCalcSummary(data) {
  // 3-day old not picked
  let threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  let now = Date.now();
  let notPicked = data.filter(d => {
    let isScheduled = ['Booked', 'Saved', 'Pickup Scheduled', 'Ready to Ship', 'Not Picked'].includes(d.status);
    if (!isScheduled) return false;
    // Try to parse booking date
    let bookTime = 0;
    if (d.bookDate) {
      bookTime = new Date(d.bookDate).getTime();
    }
    // If no booking date, use order ID to estimate (YYMM format in first 4 digits)
    if (!bookTime && d.id) {
      let idStr = String(d.id);
      if (idStr.length >= 6) {
        let yy = idStr.slice(0, 2), mm = idStr.slice(2, 4);
        bookTime = new Date('20' + yy, Number(mm) - 1).getTime();
      }
    }
    return bookTime && (now - bookTime > threeDaysMs);
  }).length;

  // Total deducted shipping cost
  let totalDeducted = data.reduce((sum, d) => sum + (d.tch || 0) + (d.och || 0) + (d.otherCharges || 0), 0);

  document.getElementById('awbNotPicked').textContent = notPicked;
  document.getElementById('awbTotalDeducted').textContent = totalDeducted.toLocaleString('en-IN') + '₹';
}

async function awbCancel(orderId, courierType) {
  let rec = awbData.find(d => d.id === orderId);
  if (!rec) return;

  let msg = `Cancel shipment?\nOrder: ${orderId}\nCourier: ${rec.courierName}\nAWB: ${rec.awb || 'N/A'}`;
  if (!confirm(msg)) return;

  try {
    if (courierType === 'shp') {
      // ShipRocket cancel
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
    } else if (courierType.startsWith('dl')) {
      // Delhivery cancel via Lambda
      try {
        let lambdaUrl = 'https://bldn7ye7cv2pbdmdmgn4dhibi40fviwc.lambda-url.ap-south-1.on.aws/del/cancel';
        let res = await fetch(lambdaUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ waybill: rec.awb, order_id: orderId })
        });
        let data = await res.json();
        if (data.status || res.ok) {
          rec.status = 'Cancelled';
          rec.cancelled = true;
          snackbar('Delhivery order cancelled', 1500);
        } else {
          alert('Cancel failed: ' + (data.message || data.error || JSON.stringify(data)));
          return;
        }
      } catch (e) {
        alert('Delhivery cancel not available yet. Lambda needs /del/cancel endpoint.');
        return;
      }
    } else if (courierType === 'rkb') {
      // RocketBox cancel via Google Sheets macro
      try {
        let rkbUrl = 'https://script.google.com/macros/s/AKfycbxV9vG5zPSAu2xFAZjXpEVfvyMlJOOZgbxvGafsz609QmUnHal2HWNCc9TToXO17xpzwg/exec';
        let formData = new FormData();
        formData.append('t', 'cancel');
        formData.append('order_id', orderId);
        let res = await fetch(rkbUrl, { method: 'POST', body: formData });
        let data = await res.json();
        if (data.status === 'success' || res.ok) {
          rec.status = 'Cancelled';
          rec.cancelled = true;
          snackbar('RocketBox order cancelled', 1500);
        } else {
          alert('Cancel failed: ' + (data.message || JSON.stringify(data)));
          return;
        }
      } catch (e) {
        alert('RocketBox cancel error: ' + e.message);
        return;
      }
    }

    // Update local DB
    let dlRec = await dldb.dl.get(orderId);
    if (dlRec) {
      dlRec.st = 2; // 2 = cancelled
      await dldb.dl.put(dlRec, orderId);
      fbPutDelivery(dlRec);
    }

    awbRender(awbCurrentTab);
  } catch (e) {
    console.log('Cancel error:', e);
    alert('Cancel failed: ' + e.message);
  }
}

function awbRefresh() {
  snackbar('Refreshing...', 800);
  awbLoadData();
}
