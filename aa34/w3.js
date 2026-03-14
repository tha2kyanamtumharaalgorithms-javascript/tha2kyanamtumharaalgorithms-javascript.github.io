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

async function exportSold() {
  // 1. Collect all order IDs from all godowns
  let godowns = [
    { key: 'pin', prefix: 'ods' },
    { key: 'pint', prefix: 'odt' },
    { key: 'pink', prefix: 'odk' },
    { key: 'pinpd', prefix: 'odpd' }
  ];
  let allOrderKeys = [];
  for (let g of godowns) {
    let data = JSON.parse(localStorage.getItem(g.key) || '{}');
    for (let k in data) {
      allOrderKeys.push({ key: k, prefix: g.prefix });
    }
  }

  // 2. Filter out already exported
  let exported = JSON.parse(localStorage.getItem('exportedIds') || '[]');
  let exportedSet = new Set(exported);
  let newKeys = allOrderKeys.filter(o => !exportedSet.has(o.key));

  if (!newKeys.length) { alert('No new orders to export'); return; }

  // 3. Load orders and aggregate by product/color/size
  let all = {};
  let exportedNow = [];
  let lastDb = '';
  for (let o of newKeys) {
    let k = o.key;
    let prefixLen = o.prefix.length; // 3 for ods/odt/odk, 4 for odpd
    let dbPrefix = o.prefix.slice(-1); // s, t, k, d
    let idStr = k.slice(prefixLen);
    let monthCode = dbPrefix + idStr.slice(0, 6);
    let orderId = Number(idStr);

    if (lastDb !== monthCode) { await mthdb(monthCode); lastDb = monthCode; }
    let order = await oddb.od.get(orderId);
    if (!order || !order.tot) continue; // skip deleted orders

    let kk = order.od;
    for (let t in kk) {
      all[t] = all[t] || {};
      for (let c in kk[t]) {
        all[t][c] = all[t][c] || {};
        for (let s in kk[t][c]) {
          all[t][c][s] = (all[t][c][s] || 0) + kk[t][c][s];
        }
      }
    }
    exportedNow.push(k);
  }

  if (!exportedNow.length) { alert('No new orders to export'); return; }

  // 4. Build CSV rows: Product Name, Color, Size, Quantity
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

  // 5. Download CSV file
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

  // 6. Save exported IDs to localStorage
  let allExported = [...exported, ...exportedNow];
  localStorage.setItem('exportedIds', JSON.stringify(allExported));
  alert('Exported ' + exportedNow.length + ' orders (' + grandTotal + ' total qty)');
}