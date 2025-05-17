async function sendd(urld, d9, b, q) {
  await new Promise(async (rez) => {
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

    let fmd = new FormData(); fmd.append("myd", JSON.stringify(d9)); console.log(fmd);
    await fetch(urld, { method: 'POST', body: fmd }).then((res) => {
      console.log(b + ' data send successfully ', d9);
      rez(res.json());//cuuid[1].push(da);
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