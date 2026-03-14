function sendd(urld, d9, b, q) {
  return new Promise(async (rez) => {
    let da = { "id": 0, "type": b, "p": d9.p, "data": d9 };
    switch (d9.p) {
      case '0':
      case '1':
        da.id = d9.od.id;
        break;

      case '2':
      case '4':
      case '5':
        da.id = (new Date().getTime());
        break;

      case '3':
        da.id = 111;
        break;

      case '10':
        da.id = d9.ptd.id;
        break;

      default:
        break;
    }

    if (d9?.od?.cn?.slice(0, 7) === "instock") { return rez(); }
    let fmd = new FormData(); fmd.append("myd", JSON.stringify(d9)); console.log(fmd);
    await fetch(urld, { method: 'POST', body: fmd }).then(async (res) => {
      const data = await res.json();
      console.log(b + ' data send successfully ', d9);
      rez(data); // Return the parsed JSON data
    })
      .catch(async (error) => {
        if (q !== 'z') {
          await erdb.err.put(da);
        } else {
          console.log(da.id);
          // cuuid[0].push(da);
        }
        console.log(b + ' sendd failed ' + error);
        console.log(d9);
        rez();
        // alert(b+' sendd failed '+JSON.stringify(d9)); 
      });
  })
}

async function expStock() {
  let allod = []; let sss = Object.keys(selod5);
  let csv = [];
  if (sss.length) {
    for (const [i, v] of sss.entries()) {
      console.log(v, i); // ods2526043158848
      csv.push(v);
      await mthdb(selg.slice(-1) + v.slice(3, 9));
      allod[i] = await oddb.od.get(Number(v.slice(3)));
    }
  }
  // console.log(allod);
  let all = {};
  allod.forEach(v => {
    let kk = v.od;
    Object.keys(kk).forEach(t => {
      all[t] = all[t] || {};
      Object.keys(kk[t]).forEach(c => {
        all[t][c] = all[t][c] || {};
        Object.keys(kk[t][c]).forEach(s => {
          all[t][c][s] = all[t][c][s] ? all[t][c][s] + kk[t][c][s] : kk[t][c][s];
        });
      });
    });
  });
  // console.log(all);
  Object.keys(all).forEach(t => {
    Object.keys(all[t]).forEach(c => {
      Object.keys(all[t][c]).forEach((s, i) => {
        csv.push(`${t},${c},${s},${all[t][c][s]}`);
      });
    });
  });
  // console.log(csv);
  let csvString = ' ,\r\n' + csv.join('\r\n');
  let blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  let t = new Date().toLocaleTimeString('en', { day: '2-digit', month: 'short', year: 'numeric', hour: "2-digit", minute: "2-digit", hour12: true });
  a.download = 'export' + t.replaceAll(', ', '') + '.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  await newc1()
}

// Auto-fill export input with last exported order number on load
setTimeout(function() {
  let el = document.getElementById('exportFromOd');
  if (el) el.value = localStorage.getItem('lastExportedOdNum') || '';
}, 500);

async function exportSold() {
  let inpFrom = document.getElementById('exportFromOd');
  let inpTo = document.getElementById('exportToOd');
  let fromNum = Number(inpFrom.value) || 0;
  let toNum = Number(inpTo.value) || Infinity;

  if (!fromNum) { alert('Enter From order number'); return; }
  if (toNum < fromNum) { alert('To must be >= From'); return; }

  // 1. Open the month DB and query orders directly from IndexedDB (includes unpinned/done orders)
  let fromStr = String(fromNum);
  let monthCode = 's' + fromStr.slice(0, 6);
  await mthdb(monthCode);

  let actualTo = toNum === Infinity ? fromNum + 9999999 : toNum;
  let allOrders = await oddb.od.where('id').between(fromNum, actualTo, true, true).toArray();

  if (!allOrders.length) {
    alert('No new orders to export');
    return;
  }

  // 2. Aggregate by product/color/size
  let all = {};
  let maxId = fromNum;
  let orderCount = 0;
  for (let o of allOrders) {
    let kk = o.od;
    for (let t in kk) {
      all[t] = all[t] || {};
      for (let c in kk[t]) {
        all[t][c] = all[t][c] || {};
        for (let s in kk[t][c]) {
          all[t][c][s] = (all[t][c][s] || 0) + kk[t][c][s];
        }
      }
    }
    if (o.id > maxId) maxId = o.id;
    orderCount++;
  }

  if (!orderCount) {
    alert('No new orders to export');
    return;
  }

  // 3. Build CSV rows: Product Name, Color, Size, Quantity
  let csv = [];
  let grandTotal = 0;
  for (let t in all) {
    for (let c in all[t]) {
      for (let s in all[t][c]) {
        let qty = all[t][c][s];
        csv.push(`${t},${c},${s},${qty}`);
        grandTotal += qty;
      }
    }
  }
  csv.push(`startxrow,${grandTotal},,`);

  // 4. Download CSV file
  let csvString = csv.join('\r\n');
  let blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  let ts = new Date().toLocaleTimeString('en', { day: '2-digit', month: 'short', year: 'numeric', hour: "2-digit", minute: "2-digit", hour12: true });
  a.download = 'soldstock_' + ts.replaceAll(', ', '') + '.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // 5. Auto-fill From input with maxId for next export
  inpFrom.value = maxId;
  localStorage.setItem('lastExportedOdNum', String(maxId));
  alert('Exported ' + orderCount + ' orders (' + grandTotal + ' total qty)');
}

// ===== Live Sheet Auto-Sync =====

let _liveSyncTimer = null;

// Initialize live sheet UI on page load — fetch starting order from Google Sheet
setTimeout(async function() {
  let el = document.getElementById('liveStartOd');
  if (!el) return;

  // First show localStorage value (instant)
  el.value = localStorage.getItem('liveSheetStartOd') || '';
  if (localStorage.getItem('liveSheetLocked') === '1') {
    el.disabled = true;
    el.style.background = '#eee';
    let btn = document.getElementById('liveLockBtn');
    btn.textContent = 'Locked';
    btn.style.background = '#c0392b';
    btn.style.color = '#fff';
  }

  // Then fetch from Google Sheet (source of truth)
  fetchLiveStartOdFromSheet();
}, 500);

async function fetchLiveStartOdFromSheet() {
  let scriptUrl = localStorage.getItem('liveSheetScriptUrl');
  if (!scriptUrl) return;
  try {
    let res = await fetch(scriptUrl, { redirect: 'follow' });
    let txt = await res.text();
    console.log('Live sheet GET response:', txt);
    let json = JSON.parse(txt);
    if (json.startOd) {
      let el = document.getElementById('liveStartOd');
      el.value = json.startOd;
      localStorage.setItem('liveSheetStartOd', String(json.startOd));
      // Auto-lock since it came from the sheet
      el.disabled = true;
      el.style.background = '#eee';
      let btn = document.getElementById('liveLockBtn');
      btn.textContent = 'Locked';
      btn.style.background = '#c0392b';
      btn.style.color = '#fff';
      localStorage.setItem('liveSheetLocked', '1');
    }
  } catch (err) {
    console.log('Could not fetch start order from sheet:', err);
  }
}

function setLiveStartOd() {
  let val = document.getElementById('liveStartOd').value.trim();
  if (val) {
    localStorage.setItem('liveSheetStartOd', val);
    syncLiveSheet();
  } else {
    localStorage.removeItem('liveSheetStartOd');
  }
}

function toggleLiveLock() {
  let inp = document.getElementById('liveStartOd');
  let btn = document.getElementById('liveLockBtn');
  if (inp.disabled) {
    // Unlock
    inp.disabled = false;
    inp.style.background = '#fff';
    btn.textContent = 'Unlocked';
    btn.style.background = '#ffc107';
    btn.style.color = '#000';
    localStorage.setItem('liveSheetLocked', '0');
  } else {
    // Lock
    if (!inp.value.trim()) { alert('Enter a starting order number first'); return; }
    inp.disabled = true;
    inp.style.background = '#eee';
    btn.textContent = 'Locked';
    btn.style.background = '#c0392b';
    btn.style.color = '#fff';
    localStorage.setItem('liveSheetLocked', '1');
    localStorage.setItem('liveSheetStartOd', inp.value.trim());
  }
}

// Debounced sync — called from order create/update/delete hooks
function debounceSyncLiveSheet() {
  if (_liveSyncTimer) clearTimeout(_liveSyncTimer);
  _liveSyncTimer = setTimeout(syncLiveSheet, 500);
}

async function syncLiveSheet() {
  let startOd = localStorage.getItem('liveSheetStartOd');
  if (!startOd) return;
  let fromNum = Number(startOd);
  if (!fromNum) return;

  let scriptUrl = localStorage.getItem('liveSheetScriptUrl');
  if (!scriptUrl) {
    console.log('Live sheet: no script URL set in localStorage.liveSheetScriptUrl');
    return;
  }

  let statusEl = document.getElementById('liveSyncStatus');
  if (statusEl) statusEl.textContent = 'Syncing...';

  try {
    // Open month DB and query orders
    let fromStr = String(fromNum);
    let monthCode = 's' + fromStr.slice(0, 6);
    await mthdb(monthCode);

    let actualTo = fromNum + 9999999;
    let allOrders = await oddb.od.where('id').between(fromNum, actualTo, true, true).toArray();

    // Aggregate by product/color/size
    let all = {};
    let orderCount = 0;
    for (let o of allOrders) {
      let kk = o.od;
      if (!kk || typeof kk !== 'object') continue;
      for (let t in kk) {
        all[t] = all[t] || {};
        for (let c in kk[t]) {
          all[t][c] = all[t][c] || {};
          for (let s in kk[t][c]) {
            all[t][c][s] = (all[t][c][s] || 0) + kk[t][c][s];
          }
        }
      }
      orderCount++;
    }

    // Build data rows
    let data = [];
    let grandTotal = 0;
    for (let t in all) {
      for (let c in all[t]) {
        for (let s in all[t][c]) {
          let qty = all[t][c][s];
          data.push([t, c, s, qty]);
          grandTotal += qty;
        }
      }
    }

    // Send to Google Apps Script
    let payload = JSON.stringify({
      startOd: fromNum,
      data: data,
      totalQty: grandTotal,
      orderCount: orderCount,
      timestamp: new Date().toISOString()
    });

    await fetch(scriptUrl, {
      method: 'POST',
      body: payload,
      mode: 'no-cors'
    });
    console.log('Live sheet POST sent (no-cors)');

    let syncTime = new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true });
    if (statusEl) statusEl.textContent = 'Sync ' + syncTime;
    console.log('Live sheet synced:', orderCount, 'orders,', grandTotal, 'qty');
  } catch (err) {
    console.log('Live sheet sync error:', err);
    if (statusEl) statusEl.textContent = 'Sync failed';
  }
}