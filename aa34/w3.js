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

async function exportSold(debug) {
  let inpFrom = document.getElementById('exportFromOd');
  let inpTo = document.getElementById('exportToOd');
  let fromNum = Number(inpFrom.value) || 0;
  let toNum = Number(inpTo.value) || Infinity;

  if (!fromNum) { alert('Enter From order number'); return; }
  if (toNum < fromNum) { alert('To must be >= From'); return; }

  let log = [];
  if (debug) {
    log.push('=== EXPORT DEBUG ===');
    log.push('From input: "' + inpFrom.value + '" → fromNum: ' + fromNum);
    log.push('To input: "' + inpTo.value + '" → toNum: ' + toNum);
    log.push('');
  }

  // 1. Collect all order IDs from Delhi godown (between from and to inclusive)
  let godowns = [
    { key: 'pin', prefix: 'ods' }
  ];
  let allOrderKeys = [];
  for (let g of godowns) {
    let data = JSON.parse(localStorage.getItem(g.key) || '{}');
    let keys = Object.keys(data);
    if (debug) log.push('Godown "' + g.key + '" (' + g.prefix + '): ' + keys.length + ' total keys');
    for (let k of keys) {
      let idNum = Number(k.slice(g.prefix.length));
      let pass = idNum >= fromNum && idNum <= toNum;
      if (debug) {
        log.push('  ' + k + ' → id=' + idNum + (pass ? ' ✓ INCLUDED' : ' ✗ skipped (out of range)'));
      }
      if (pass) allOrderKeys.push({ key: k, prefix: g.prefix, id: idNum, godown: g.key });
    }
  }

  if (debug) {
    log.push('');
    log.push('Total matched order keys: ' + allOrderKeys.length);
    log.push('');
  }

  if (!allOrderKeys.length) {
    if (debug) { log.push('NO ORDERS FOUND — stopping.'); showDebugLog(log); }
    else alert('No new orders to export');
    return;
  }

  // 2. Load orders and aggregate by product/color/size
  let all = {};
  let maxId = fromNum;
  let orderCount = 0;
  let lastDb = '';
  if (debug) log.push('--- Loading orders from IndexedDB ---');
  for (let o of allOrderKeys) {
    let dbPrefix = o.prefix.slice(-1);
    let idStr = o.key.slice(o.prefix.length);
    let monthCode = dbPrefix + idStr.slice(0, 6);

    if (lastDb !== monthCode) { await mthdb(monthCode); lastDb = monthCode; }
    if (debug) log.push('DB: "' + monthCode + '" → oddb.od.get(' + o.id + ')');
    let order = await oddb.od.get(o.id);

    if (!order) { if (debug) log.push('  Result: null/undefined — SKIPPED'); continue; }
    if (debug) log.push('  Result: tot=' + order.tot + ', keys in od=' + (order.od ? Object.keys(order.od).join(', ') : 'NONE'));
    if (!order.tot) { if (debug) log.push('  tot is 0/falsy — SKIPPED'); continue; }

    let kk = order.od;
    for (let t in kk) {
      all[t] = all[t] || {};
      for (let c in kk[t]) {
        all[t][c] = all[t][c] || {};
        for (let s in kk[t][c]) {
          all[t][c][s] = (all[t][c][s] || 0) + kk[t][c][s];
          if (debug) log.push('    + ' + t + ' | ' + c + ' | ' + s + ' | qty=' + kk[t][c][s]);
        }
      }
    }
    if (o.id > maxId) maxId = o.id;
    orderCount++;
  }

  if (debug) {
    log.push('');
    log.push('Orders with data: ' + orderCount);
    log.push('maxId: ' + maxId);
    log.push('');
  }

  if (!orderCount) {
    if (debug) { log.push('NO ORDERS WITH DATA — stopping.'); showDebugLog(log); }
    else alert('No new orders to export');
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

  if (debug) {
    log.push('--- CSV Output (' + csv.length + ' rows) ---');
    for (let row of csv) log.push(row);
    log.push('');
    log.push('Grand Total Qty: ' + grandTotal);
    log.push('Will auto-fill input with: ' + maxId);
    showDebugLog(log);
    return; // Debug mode: show log only, don't download or update input
  }

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

function showDebugLog(log) {
  let div = document.createElement('div');
  div.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:99999;overflow:auto;padding:10px;';
  let pre = document.createElement('pre');
  pre.style.cssText = 'color:#0f0;font-size:12px;white-space:pre-wrap;word-break:break-all;margin:0;';
  pre.textContent = log.join('\n');
  let btn = document.createElement('button');
  btn.textContent = 'CLOSE';
  btn.style.cssText = 'position:fixed;top:10px;right:10px;padding:10px 20px;font-size:16px;background:#f44;color:#fff;border:none;border-radius:5px;z-index:100000;';
  btn.onclick = function() { document.body.removeChild(div); };
  div.appendChild(btn);
  div.appendChild(pre);
  document.body.appendChild(div);
}