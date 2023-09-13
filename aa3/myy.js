//alert('hi')
function resetd() {
  let from = Number(localStorage.fromod); let crrodno = Number(zxc);
  let odcount = 1 + crrodno - from; let oldm1 = localStorage.lastreset.split(','); // '304,34' 
  let oldmc = '';
  if (oldm1[0] != date1) { oldmc = '\nAnd old month(' + oldm1[0] + ') from ' + oldm1[1]; }
  if (odcount) {
    let per1 = prompt("Please enter 'ok' to download\nthis month from " + from + " to " + zxc + oldmc);
    if (per1 === "ok") {
      // {p:0,g:'odt',od:{}};
      let lastr = date1 + ',' + (1 + crrodno);
      const shod2 = { "p": "2", "g": selg, "od": { 'Stock Not Updated from Order No': lastr } };
      couttot(from, selg).then(async () => {
        await sendd(urli, shod2, 'reset');
      }).then(() => {
        setTimeout(function () {
          tabletcsv('testTable', odcount + '(' + from + '-' + zxc + ')');
          localStorage.setItem('fromod', 1 + crrodno);
          localStorage.setItem('lastreset', lastr);
          //document.getElementById('tre6').innerHTML='';
          //document.getElementById('p781').click();
          //stockm();
        }, 1000)
      })
    }
  } else { alert("No data to download ") }
}

async function delod() {
  let an5 = {}; let shod11 = {}; let ptc;
  let latsel = Object.keys(selod5);
  if (latsel.length) {
    let r = latsel.pop();
    let odno = r.slice(3);
    let text = document.querySelector('#oderli ' + '#' + r).nextElementSibling.innerText + "\nWant to delete?";
    console.log('hdhjd', selg);
    if (confirm(text) == true) {
      await mthdb(selg.slice(-1) + odno.slice(0, 3));
      await oddb.od.get(Number(odno)).then((doc) => {
        // od=doc.it;//let odno=selg.slice(-1)+doc.id;
        an5 = doc; an5.tot = 0; an5.it = {}; an5.tch = 0; an5.och = 0; an5.dis = 0; an5.c = []; an5.pc = {}; an5.inv = [], an5.bulk = 0;
        shod11 = { "p": "1", "g": selg, "od": { ...an5 } };
        sendd(urli, shod11, 'del order');
        // console.log(an5);
      }).then(async () => {
        //console.log('hhhhh',shod11.od)
        await db.pt.get(shod11.od.pt).then((v) => {
          let yu = v.ods.indexOf(selg.slice(-1) + odno);
          if (yu > (-1)) { v.ods.splice(yu, 1); }
          ptc = v;
          console.log(ptc, yu);
        })
        await db.pt.put(ptc, Number(shod11.od.pt));
        await bulkdb.bk.delete(shod11.od.id);
        await oddb.od.put(shod11.od, Number(odno)).then(response => {
          selod5 = {};
          document.querySelector('[name=' + selg + ']').click();
        })
          .catch(error => {
            alert('error in del update fn-', error);
            console.log('error in del update fn-', error);
          });
      })
    } else { for (let u in selod5) { document.getElementById(u).checked = false; } selod5 = {}; }
  } else { alert('Bhaii, Pahle order select ker le !!') }
}

var pk8; var oldod;
var instg = { Delhi: 'ods', Tiruppur: 'odt', Kolkata: 'odk', PD: 'odpd' };

async function editod(tp) {
  let nm = {
    Bio: ['Biowash R-neck, 36"-42"', 'Biowash R-neck, 44"-46"'],
    NBio: ['Cotton R-neck, 36"-42"', 'Cotton R-neck, 44"-46"', 'Cotton R-neck White, 36"-42"', 'Cotton R-neck White, 44"-46"'],
    Hood: ['Non Zipper Hoodie, S-XL', 'Non Zipper Hoodie, XXL'],
    OverS: ['O/S Drop-shoulder R-neck, S-XXL'],
    Polo: ['Polo neck, XS-XL', 'Polo neck, XXL'],
    Sweat: ['Sweatshirt, S-XL', 'Sweatshirt, XXL'],
    Kids: ['Kids R-neck, 20"-34"']
  };
  document.getElementById('cor1').setAttribute("onclick", "getcor('u')");
  pk8 = Number(tp.id.slice(1));// order id b34
  let cnv = document.getElementById('s' + pk8).tabIndex;

  await db.pt.get(cnv).then((v) => { ptd = v });
  console.log(ptd, pk8, cnv);
  // db.pt.where('cn').equals(cnv).each((v)=>{ptd=v});
  // let st = new Localbase('st');
  // st.collection(selg).doc('od'+pk8).get().then(doc => {
  await mthdb(selg.slice(-1) + String(pk8).slice(0, 3));
  await oddb.od.get(pk8).then((doc) => {
    let ht = doc.cn;
    oldod = doc;
    oldod.tch && (document.getElementById('tch').value = oldod.tch || '');
    oldod.och && (document.getElementById('och').value = oldod.och || '');
    oldod.dis && (document.getElementById('dis').value = oldod.dis || '');
    if (oldod.c) {
      oldod.c.forEach((v) => {
        // addtbl(v,pc,qt,d);
        let p9 = v[0].slice(1).slice(0, -1);
        if (Number(v[0][0])) {
          addtbl(nm[p9][Number(v[0].slice(-1))], v[1], v[2], v[0]);
        } else {
          addtbl(p9, v[1], v[2], v[0]);
        }
      })
    }

    document.getElementById('frt').innerHTML = "<strong>" + ht + "</strong>";
    // if(doc.bulk){document.getElementById('bulkc').checked=true;bulks();}else{document.getElementById('bulkc').checked=false;bulks();}
    if (doc.bulk) { document.getElementById('bulkc').checked = true; } else { document.getElementById('bulkc').checked = false; }
    if (selg == 'inst') {
      document.getElementById("gsel").value = instg[ht.trim()];
    } else {
      document.getElementById("gsel").value = selg;
    }
    if (doc.pc) {
      let obj1 = JSON.parse(localStorage.pc);
      let obj2 = doc.pc;
      prc = { ...obj1, pc: { ...obj1.pc, ...obj2 } };
    }
    //console.log(prc);
    // console.log(doc.it)
  })

  document.querySelectorAll('#id01 #tblom1 tbody').forEach(kjhu)
  // for edit order
  function kjhu(v) {//alert(v.id);document.getElementById('frt').innerText=.innerText.split('\n')[0].split(' ')[2];
    let qs1 = v.innerText.split('\n');
    for (let u = 0; u < qs1.length; u++) {
      var wer5;
      if (u === 0) {
        wer5 = qs1[u].split('\t')[0];
      } else {
        let jk = qs1[u].split('\t');
        for (let i = 0; i < jk.length; i++) {
          var wer6;
          if (i === 0) { wer6 = jk[i] } else if (jk[i]) {
            // console.log(wer5,wer6,jk[i],i); // t,c,value,index
            let ty6 = document.querySelector('#' + wer5 + ' #' + wer6.replace(/\s+/, "") + ' td:nth-child(' + (i + 1) + ') input');
            ty6.value = jk[i]; triggerInput(ty6);
          }
        }
      }
    }
  }

  document.getElementById('id01').style.display = '';
  document.querySelector("div.bar button.tablink[onclick]").click();
  document.getElementById('btn_convert').style.display = 'none';
  document.getElementById('upd5').style.display = '';
  function triggerInput(v) {
    let event = new Event('input', { 'bubbles': true, 'cancelable': true });
    v.dispatchEvent(event);
  }
}

async function creatod() {
  return new Promise(async (rez) => {
    let gd = document.getElementById("gsel").value;
    await viewtotal();
    let ctcn = (Number(zxc) + 1);
    let odid = Number(date1 + ctcn);
    let instgh = document.getElementById('instock');
    if (instgh.checked) {
      await saveinst(1); instgh.click(); instgh.checked = 0;
    } else {
      // let ptd={id:'a',cn:'',mn1:'',mn2:'',gst:'',add:'',ods:['as102','as33','ak508']};
      // zc(ptd,'hiii76868iiii');
      zsr.id = odid;
      zsr.cn = document.getElementById('u13').innerText;
      zsr.tot = Number(total);
      zsr.bulk = Number(document.getElementById('bulkc').checked);
      zsr.dt = date.split(' ').join('/');
      zsr.it = od;
      zsr.inv = billinv;
      zsr.tch = othch[0];
      zsr.och = othch[1];
      zsr.dis = othch[2];

      let jkl = document.querySelectorAll('#ctm9 tr');
      if (jkl.length) {
        let cods = [];
        jkl.forEach((v) => {
          let pi = (v.innerText).split('\t'); let pz1 = Number(pi[1].trim()); let pz2 = Number(pi[2].trim());
          if (pz2) {
            cods.push([v.dataset.p, pz1, pz2]);
            zsr.inv[0] += (pz1 * pz2);
            zsr.inv[1] += (pz1 * pz2) + ((pz1 * pz2) * 0.05); zsr.tot += pz2;
            zsr.bulk = 1; document.getElementById('bulkc').checked = 1;
          }
          v.remove();
        });
        zsr.c = cods;
        console.log(cods);
      }
      let shod0 = {};
      let oldid = ptd.id;
      let odno = gd.slice(-1) + odid; // s30424
      ptd.id = ptd.id || genid(ptcounter(), 1);
      //genlink(genid(ptd.id,3),ptd.cn);
      if (document.getElementById('bulkc').checked) {
        ptd.ods.push(odno);
        await bulkdb.bk.add({ ...zsr, "pt": ptd });
      }
      console.log(ptd);
      if (!oldid) {
        // save party details
        await db.pt.add(ptd);
      } else {
        //  in case key is not found, put() would create a new object while update() wont change anything.
        //  The returned Promise will NOT fail if key was not found but resolve with value 0 instead of 1.
        // update party details
        await db.pt.update(oldid, ptd);
      }
      zsr.pt = ptd.id;
      shod0 = { "p": "0", "g": gd, "od": { ...zsr, "pc": { ...odprice } }, ptd };

      await mthdb(gd.slice(-1) + date1);
      await oddb.od.add(shod0.od, ctcn).then((res) => {
        console.log(res, 'added');
        selgo(gd);//  pinloc
        let paz = JSON.parse(pinloc);
        paz['ods' + shod0.od.id] = 'Pending';
        selpin(gd);//pinz
        localStorage.setItem(pinz, JSON.stringify(paz));
      }).catch((error) => {
        console.log('error add order fn-', error);
        alert('error in add order fn-', error);
      });

      let html33 = document.getElementById("html33");
      html33.style.width = '455px';
      await html2canvas(html33,
        {
          allowTaint: true,
          useCORS: true
        }).then(async (canvas) => {
          shod0.pcwt = pcwt;
          let txtcn = shod0.od.id + ' ' + shod0.od.cn; let imgcn = canvas.toDataURL();
          let imglastod = {}; imglastod['cn'] = txtcn; imglastod['im5'] = imgcn;
          document.getElementById('lastodimg').src = imgcn;
          document.getElementById('lastodcn').innerHTML = txtcn;
          tt5 = imglastod;
          localStorage.setItem('imglastod', JSON.stringify(imglastod));
          newc(); html33.style.width = '';
          localStorage.clickcount = ctcn; zxc = ctcn;
          await sendd(urli, shod0, 'new order');
          rez(shod0);
        });
    }
  })
}

async function updateod(myz) {
  return new Promise(async (rez) => {
    await viewtotal();
    zsr.id = pk8;
    zsr.cn = document.getElementById('u13').innerText.replace(/\s+/g, ' ').trim();
    zsr.tot = Number(total);
    zsr.bulk = Number(document.getElementById('bulkc').checked);
    zsr.dt = oldod.dt;
    zsr.it = od;
    zsr.inv = billinv;
    zsr.tch = othch[0];
    zsr.och = othch[1];
    zsr.dis = othch[2];
    let jkl = document.querySelectorAll('#ctm9 tr');
    if (jkl.length) {
      let cods = [];
      jkl.forEach((v) => {
        let pi = (v.innerText).split('\t');
        let pz1 = Number(pi[1].trim()); let pz2 = Number(pi[2].trim());
        if (pz2) {
          cods.push([v.dataset.p, pz1, pz2]);
          zsr.inv[0] += (pz1 * pz2);
          zsr.inv[1] += (pz1 * pz2) + ((pz1 * pz2) * 0.05); zsr.tot += pz2;
          zsr.bulk = 1; document.getElementById('bulkc').checked = 1;
        }
        v.remove();
      });
      zsr.c = cods;
      console.log(cods);
    }
    zsr.pt = ptd.id; console.log(ptd.id);
    let yu = ptd.ods.indexOf(selg.slice(-1) + pk8);
    if (document.getElementById('bulkc').checked) {
      ptd.ods.push(selg.slice(-1) + pk8);
      let uniq = [...new Set(ptd.ods)];
      ptd.ods = uniq;
      await bulkdb.bk.put({ ...zsr, "pt": ptd }, zsr.id);
    } else {
      // let yu=ptd.ods.indexOf(selg.slice(-1)+id55);
      if (yu > (-1)) {
        ptd.ods.splice(yu, 1);
        await bulkdb.bk.put({ ...zsr, "pt": ptd }, zsr.id);
      }
    }
    await db.pt.update(ptd.id, ptd);
    const gsel = document.getElementById("gsel").value;
    let shod1 = {};
    if (!(selg == gsel)) {
      for (let u in selod5) { document.getElementById(u).checked = false; };
      selod5 = {}; selod5[pk8] = pk8; unpin(1); selod5 = {}; // order id pk8=od34
      //document.querySelector("#oderli #"+pk8).parentElement.remove();
      shod1 = { "p": "4", "g": selg, "gl": gsel, "od": { ...zsr, "pc": { ...odprice } } };
      await moveod(selg, gsel, 'ods' + pk8);
    }
    // alert('g normal')
    shod1 = { "p": "1", "g": gsel, "od": { ...zsr, "pc": { ...odprice } }, ptd };
    // let st = new Localbase('st');
    // st.collection(selg).doc('od'+pk8).set(shod1.od)
    await mthdb(selg.slice(-1) + String(pk8).slice(0, 3));
    await oddb.od.put(shod1.od, pk8)
      .then(() => {
        shod1.pcwt = pcwt;
        console.log(pctt);
        let html33 = document.getElementById("html33");
        html33.style.width = '455px';
        html2canvas(html33,
          {
            allowTaint: true,
            useCORS: true
          }).then(function (canvas) {
            //console.log('zsr',zsr,'sho',shod1);
            let imglastod = {};
            let txtcn = shod1.od.id + ' ' + shod1.od.cn; let imgcn = canvas.toDataURL();
            imglastod['cn'] = txtcn; imglastod['im5'] = imgcn;
            document.getElementById('lastodimg').src = imgcn;
            document.getElementById('lastodcn').innerHTML = txtcn;
            tt5 = imglastod;
            localStorage.setItem('imglastod', JSON.stringify(imglastod));
          });
        html33.style.width = '';
        newc();
        document.getElementById('btn_convert').style.display = '';
        document.getElementById('upd5').style.display = 'none';
      }).then(async (v) => {
        if (myz != 'u') {
          document.getElementById("p781").click();
        }
        await sendd(urli, shod1, 'update order');
        rez(shod1);
      })
      .catch(error => {
        console.log('error in update od1 fn- ', error); rez(shod1);
        alert('error in update od1 fn- ', error);
      })
  });
}

//{p:4,g:'odt',gl:'odk',od:{id:34,first:"Jake",phone:"312-000-1212", last:"Newperson"}}; // move order from odt to odk
//moveod('odk','odpd','od82');
// add pin details(unpin and pin)
async function moveod(gf, gt, idf) {
  // let st = new Localbase('st');
  let idfs = String(idf).slice(0, 3)
  await mthdb(gf.slice(-1) + idfs);
  let docft = {};
  //  await st.collection(gf).doc(idf).get().then(doc => {docft=doc;});
  await oddb.od.get().then((v) => docft = v);
  //  await st.collection(gf).doc(idf).delete();
  await oddb.od.delete(Number(idf));
  // await st.collection(gt).doc(idf).set(docft);
  await mthdb(gt.slice(-1) + idfs);
  await oddb.od.put(docft, idf);
}

// document.getElementById('alltab').onclick=function() {
//   html2canvas(document.querySelector("#html33")).then(canvas => canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})])))
// };

document.getElementById("seldt").valueAsDate = new Date();
document.getElementById("instock").onclick = () => {
  // .classList.toggle("mystyle"); this.parentElement.style.display='none'
  document.getElementById("seldt").parentElement.classList.toggle("hide");
  document.getElementById('ptd').classList.toggle("w3-hide");
  document.getElementById('cnm').classList.toggle("w3-show");
}
// in stock order 
async function saveinst(v) {
  let pkx = {};
  // pkx.id = (Number(zxc)+1);
  //pkx.cn = document.getElementById('gsel').options[document.getElementById('gsel').selectedIndex].innerText;
  // pkx.cn = document.querySelector('#gsel').selectedOptions[0].innerText;
  let my = document.getElementById("incn");
  pkx.cn = my.value.replace(/\s+/g, ' ').trim(); my.value = '';

  pkx.tot = Number(total);
  pkx.dt = date.split(' ').join('/');
  pkx.it = od;
  if (v === 0) {
    pkx.id = oldod.id;
  }
  // else {
  //   // await st.collection('inst').get().then((e) => e.length)
  //   // await indb.inst.get().then((v)=>{console.log(v);});
  //   // .then((id) => pkx.id=Number(date1+(id+1)));
  //  }
  //  console.log('incv',v);
  await instdb.inst.put(pkx);
  await sendd(urli, { "p": "5", "g": "inst", "od": { ...pkx } }, 'in stock');
  newc();
  if (v === 0) {
    document.getElementById('btn_convert').style.display = '';
    document.getElementById('upd5').style.display = 'none';
  }
}


function expt(v) {
  // console.log(Number(v.parentElement.innerText.split('.')[0]))
  console.log(v.parentElement.innerText.split('.')[0]);
  couttotinst(Number(v.parentElement.innerText.split('.')[0]), selg);
  setTimeout(() => {
    tabletcsv('testTable', new Date().toLocaleString("en-GB"));
  }, 3000)
}
// price calculator
function pc(v, vx, a, b, c, d, e) { // v(type) a(36-42), b(44), c(46), d(32), e(34)
  //odprice
  let svc = '', sva = '', svbc = '', svab = '', svpls1 = '', svpls2 = '';
  svbc = ((b + c) != 0) ? svbc = (b + c) + '×' + prc.pc[v][1] : svbc = '';
  svab = ((a + b) != 0) ? svab = (a + b) + '×' + prc.pc[v][0] : svab = '';
  svc = (c != 0) ? svc = c + '×' + prc.pc[v][1] : svc = '';
  sva = (a != 0) ? sva = a + '×' + prc.pc[v][0] : sva = '';

  svpls1 = ((a != 0) && ((b + c) != 0)) ? svpls1 = '+' : svpls1 = '';
  svpls2 = ((c != 0) && ((a + b) != 0)) ? svpls2 = '+' : svpls2 = '';
  // console.log('whawhb',vx);
  let pj1 = 0;
  if ((v == 'Bio')) { //console.log('BN')
    let pj1 = (a * prc.pc[v][0] + (b + c) * prc.pc[v][1]); odprice[v] = prc.pc[v];
    pctt += pj1; pcwt += (a + b + c) * Number(prc.wt[v]);
    return "<td colspan='2'><b>" + (a + b + c) + ' ' + vx + "</b><b class='sa2'>" + sva + svpls1 + svbc + " = </b></td><td class='sb3'><b>" + pj1 + '₹</b></td>'
  } else if ((v == 'NBio')) {
    if (document.querySelector('#NBio #White.oj')) {
      let wh11 = document.querySelectorAll('#NBio #White.oj td input');
      let wha = 0, whb = 0;
      for (let h = 0; h < wh11.length; h++) {
        let njh = Number(wh11[h].value);
        if (h <= 3) {
          wha += njh;
        } else {
          whb += njh;
        }
        // console.log('whawhb',vx);
      }
      let whpc = prc.pc[v][2]; let whva = '', whvpls1 = '', whvbc = '';
      let pj10 = (wha * (prc.pc[v][0] + whpc) + (whb) * (prc.pc[v][1] + whpc)); odprice[v] = prc.pc[v];
      pctt += pj10; pcwt += (wha + whb) * Number(prc.wt[v]);
      whva = (wha != 0) ? whva = wha + '×' + (prc.pc[v][0] + whpc) : whva = '';
      whvpls1 = ((wha != 0) && ((whb) != 0)) ? whvpls1 = '+' : whvpls1 = '';
      whvbc = ((whb) != 0) ? whvbc = (whb) + '×' + (prc.pc[v][1] + whpc) : whvbc = '';

      let pj1 = ((a - wha) * prc.pc[v][0] + (b + c - whb) * prc.pc[v][1]);
      pctt += pj1; pcwt += (a + b + c - wha - whb) * Number(prc.wt[v]);

      let wht0 = "<td colspan='2'><b>" + (wha + whb) + ' ' + vx + ' White' + "</b><b class='sa2'>" + whva + whvpls1 + whvbc + " = </b></td><td class='sb3'><b>" + pj10 + '₹</b></td>';
      let wht1 = "<td colspan='2'><b>" + (a + b + c - wha - whb) + ' ' + vx + "</b><b class='sa2'>" + (((a - wha) != 0) ? sva = (a - wha) + '×' + prc.pc[v][0] : sva = '') + ((((a - wha) != 0) && ((b + c - whb) != 0)) ? svpls1 = '+' : svpls1 = '') + (((b + c - whb) != 0) ? svbc = (b + c - whb) + '×' + prc.pc[v][1] : svbc = '') + " = </b></td><td class='sb3'><b>" + pj1 + '₹</b></td>'
      return (((a + b + c - wha - whb) || '') && ('<tr>' + wht1 + '<tr/><tr>')) + (((wha + whb) || '') && ('<tr>' + wht0 + '<tr/>'))
    } else { }
  } else if (v == 'OverS' || v == 'Kids') { //console.log('O')
    pj1 = ((a + b + c + d + e) * prc.pc[v][0]); odprice[v] = prc.pc[v];
    pctt += pj1; pcwt += (a + b + c + d + e) * Number(prc.wt[v]);
    return "<td colspan='2'><b>" + (a + b + c + d + e) + ' ' + vx + "</b><b class='sa2'>" + (a + b + c + d + e) + '×' + prc.pc[v][0] + " = </b></td><td class='sb3'><b>" + pj1 + '₹</b></td>'
  } else if ((v == 'Polo') || (v == 'Hood') || (v == 'Sweat')) { //console.log('PHS')
    pj1 = ((a + b) * prc.pc[v][0] + c * prc.pc[v][1]); odprice[v] = prc.pc[v];
    pctt += pj1; pcwt += (a + b + c) * Number(prc.wt[v]);
    return "<td colspan='2'><b>" + (a + b + c) + ' ' + vx + "</b><b class='sa2'>" + svab + svpls2 + svc + " = </b></td><td class='sb3'><b>" + pj1 + '₹</b></td>'
  } else { }
}


// favicon set emoji
if (localStorage.gr5) {
  let cfa = document.createElement("canvas");
  cfa.height = 64; cfa.width = 64;
  let ctx = cfa.getContext("2d");
  ctx.font = "64px serif";
  //ctx.fillText("👕", 0, 64); 
  ctx.fillText("🇮🇳", 0, 64);
  //ctx.fillText("❤️", 0, 64);
  //document.querySelector('link[rel="icon"]').href= cfa.toDataURL();
  document.querySelector('link[rel="shortcut icon"]').href = cfa.toDataURL();
}

// on paste mobile no.
document.getElementById('ptm').addEventListener('paste', (v) => { pastemn(v) })
document.getElementById('ptm1').addEventListener('paste', (v) => { pastemn(v); })

function pastemn(v) {
  setTimeout(() => {
    // console.log('jkjkj',v);
    let vv = v.target.value;
    if ((vv.includes('+91')) || (vv.includes(' '))) {
      let nm = vv.replace(/ /g, '');
      if ((nm.length == 13) || nm.includes('+91')) {
        v.target.value = nm.split('+91')[1];
      } else {
        v.target.value = nm.slice(-10);
      }
    }
    v.target.dispatchEvent(new Event('input'));
    //document.getElementById('ptmn').innerHTML='- - -';
    console.log('onpaste');
  }, 10);
}


// oniput search from mobile no.
function inmn(v) {
  //console.log(vv)
  let p1 = document.getElementById('m1list');
  p1.classList.add("w3-show");
  (async () => {
    let lihtml = "";
    await db.pt.where('mn1').startsWith(v).limit(10).each(pv => {
      console.log('n', pv);
      lihtml += "<li id='" + pv.id + "'>" + pv.cn + ', ' + pv.mn1 + ', ' + pv.mn2 + "</li>";
    });
    p1.innerHTML = lihtml;
    console.log('End');
  })();
  console.log('oninput');
  mnvalid(v);
}

function mnvalid(v) {
  let p = v.length;
  if (v == ' ') {
    document.getElementById('ptmn').innerHTML = " ";
  } else if (p == 0) {
    document.getElementById('ptmn').innerHTML = " ";
  } else if (p < 10) {
    document.getElementById('ptmn').innerHTML = "<b style='color:blue'>" + p + " Digits only!</b>";
  } else if (p == 10) {
    document.getElementById('ptmn').innerHTML = "<b id='p001' style='color:red'>10 Digits <b></b></b>";
  } else if (p > 10) {
    document.getElementById('ptmn').innerHTML = "<b style='color:blue'>" + p + " Digits!</b>";
  }
}

// pincode check
function pincode(v) {
  if (v.value.trim().length == 6) {
    fetch('https://api.postalpincode.in/pincode/' + v.value.trim())
      .then((response) => response.json())
      .then((data) => {
        if (data[0].Message != "No records found") {
          // console.log(data[0]);
          let p = data[0].PostOffice[0];
          let t = `${p.State}, ${p.District}`; //${p.Region}${p.Division}, 
          document.getElementById('ptplace').innerHTML = "<b style='color:blue'>" + t + "</b>";
        } else {
          document.getElementById('ptplace').innerHTML = "<b style='color:red'>" + data[0].Message + "</b>";
        }
      });
  }
}

// start GST state code and Verify
function gststc(v) { //let text = "07BBNPG0866";g.match(/^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/g)
  let g = v.value.replace(/ /g, '').trim().toUpperCase();
  // console.log(`hi ${g}`);
  if ((g.length == 15) && (checksum(g))) {
    document.getElementById('ptst').innerHTML = "<b id='q000' style='color:#008001'>" + g.substr(0, 2) + '-' + gststate[Number(g.substr(0, 2))] + " <b></b>" + "</b>";
    // fetch('https://services.gst.gov.in/services/api/search/goodservice?gstin='+g)
    // .then((r) => r.json())
    // .then((data) => {
    // if(data['bzgddtls']){document.getElementById('ptst').innerHTML="Ok"}
    // if(data['errorCode']){document.getElementById('ptst').innerHTML="<b style='color:red'>Error!</b>";}
    // })
  } else if ((g.length == 2)) {
    document.getElementById('ptst').innerHTML = "<b style='color:blue'>" + gststate[Number(g.substr(0, 2))] + "</b>";
  } else if ((g.length < 15)) {
    document.getElementById('ptst').innerHTML = "<b style='color:blue'>Error! less than 15 character</b>";
  } else if ((g.length > 15)) {
    document.getElementById('ptst').innerHTML = "<b style='color:blue'>Error! more than 15 character</b>";
  } else {
    document.getElementById('ptst').innerHTML = "<b style='color:blue'>Ohhh! Something Wrong</b>";
  }
}

function checksum(gstn) {
  if (!/^(0[1-9]|[1-2][0-9]|3[0-7])[A-Z]{3}([ABCFGHLJPT])[A-Z][0-9]{4}[A-Z][1-9][Z][0-9A-Z]$/g.test(gstn))
    return false;

  //Calculate 15th digit checksum from 14 digits and compare it
  let gstnCodepointChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let factor = 2, sum = 0, checkCodePoint = 0;
  let mod = gstnCodepointChars.length;
  for (let i = gstn.length - 2; i >= 0; i--) {
    let codePoint = gstnCodepointChars.indexOf(gstn.charAt(i));
    let digit = factor * codePoint;
    factor = factor == 2 ? 1 : 2;
    digit = (digit / mod) + (digit % mod);
    sum += Math.floor(digit);
  }
  checkCodePoint = (mod - (sum % mod)) % mod;
  let checksumCharacter = gstnCodepointChars.charAt(checkCodePoint);
  return gstn.substring(14, 15) == checksumCharacter;
}

// address
function address(v) {
  //   let p1=document.getElementById('ptp');
  //   p1.value=v.value.match(/(\d{6})/g);
  //  // p1.value=v.value.match(/\D[1-9][0-9]{5}\s|\s[1-9][0-9]{5}\s|\S[1-9][0-9]{5}$|[1-9][0-9]{5}$/g)[0].match(/\d+/g);
  //   p1.dispatchEvent(new Event('input'));
}

// search party
function searchp(vv) {
  let p = document.getElementById('plist');
  p.classList.add("w3-show");
  //((vv=='')) ? p.classList.toggle("w3-show") :  ' ';
  // genrate party search list in id-plist.  <li id="212">czxcjk fd 9554255495</li>
  (async () => { // save party details
    let reg = new RegExp(vv, 'i'); let lihtml = "";
    await db.pt.filter(pk => reg.test(pk.cn)).limit(10).each(pv => { //console.log('n',pv);
      lihtml += "<li id='" + pv.id + "'>" + pv.cn + ', ' + pv.mn1 + ', ' + pv.mn2 + "</li>";
    });
    p.innerHTML = lihtml;
    console.log('End');
    // .toArray(); 
    // match.forEach((cv,ci) => {console.log('n',cv,ci);
    //   lihtml+="<li id='"+cv.id+"'>"+cv.cn+' '+cv.mn1+"</li>";
    //   p.innerHTML=lihtml;
    // });

    // .each(pv => { console.log('n',pv);
    //   lihtml+="<li id='"+pv.id+"'>"+pv.cn+' '+pv.mn1+"</li>";
    //   p.innerHTML=lihtml;
    // }); 
    //console.log('jjjj',lihtml);
  })();

  //  if(!match) {p.innerHTML=""}; // if (!match) {p.innerHTML="";}else{return match}
}
// onclick // get party details by id from indexed db for name  
document.getElementById('plist').addEventListener('click', (e) => {
  getptd(e);
})

// onclick // get party details by id from indexed db for mobile no. 
document.getElementById('m1list').addEventListener('click', (e) => {
  getptd(e);
  document.getElementById('ptmn').innerHTML = '';
})

// not match in list, #ptd click remove list for name and mobile no. 
document.querySelector('#ptd').addEventListener('click', () => {
  document.getElementById('plist').innerHTML = '';
  document.getElementById('m1list').innerHTML = '';
})

// sptd()&&svptd()
//get party details from selected in list // fill all detail in inputs
let ptods = []; let ptid = 0; // transfer value from db to new order 
function getptd(e) {
  ptods = []; ptid = 0;
  let pid = Number(e.target.id);//console.log(pid);
  (async () => {
    await db.pt.get(pid).then((v) => {
      console.log(v);
      let cop = document.getElementById('cnm5');
      if (v.ods.length) {
        cop.style.display = '';
      } else {
        cop.style.display = 'none';
        document.getElementById('cnm4').style.display = 'none';
      }

      document.getElementById('incn').value = v.cn.replace(/\s+/g, ' ').trim();
      document.getElementById('ptm').value = v.mn1;

      document.getElementById('ptm1').value = v.mn2 ?? '';

      let k1 = document.getElementById('ptg');
      k1.value = v.gst.trim() ?? '';
      (k1.value) ? k1.dispatchEvent(new Event('input')) : document.getElementById('ptst').innerText = 'State 07BBNPG0866M2Z7';

      let k2 = document.getElementById('ptp');
      k2.value = v.pin ?? '';
      (k2.value) ? k2.dispatchEvent(new Event('input')) : document.getElementById('ptplace').innerText = 'State, District';

      document.getElementById('pta').value = v.add ?? '';
      ptods = v.ods; ptid = v.id;

    });
  })();
  //  e.path[0].parentElement.classList.toggle('w3-show'); 
  e.target.parentElement.innerHTML = '';
}

// make party details obj
// let ptd={id:'',cn:'',mn1:'',mn2:'',gst:'',pin:'',add:'',ods:['as102','as33','ak508']};
var ptd = {}; let cid = '';
function sptd(v) {
  // prc=JSON.parse(localStorage.pc);
  ptd = { id: ptid, cn: '', mn1: '', gst: '', add: '', ods: ptods };
  let cn = document.getElementById('incn').value;
  let mn1 = document.getElementById('ptm').value;
  let mn2 = document.getElementById('ptm1').value;
  let pinc = document.getElementById('ptp').value;
  let pta = document.getElementById('pta').value;
  let ptg = document.getElementById('ptg').value;
  ptd.cn = cn.replace(/\s+/g, ' ').trim();
  ptd.mn1 = mn1;
  ptd.mn2 = mn2;
  ptd.gst = ptg.replace(/\s+/g, ' ').trim().toUpperCase();
  ptd.pin = pinc;
  ptd.add = pta;
  if (v != 2) {
    if (ptd.add && cid && (v != 1)) { document.getElementById('ods' + cid).parentNode.style.color = ''; }
    else if (cid && (v != 1)) { document.getElementById('ods' + cid).parentNode.style.color = '#00f'; }
    let vn = (ptg) ? (true && document.getElementById('q000')) : true;

    if ((cn && vn) || (ptg.length == 2)) {
      console.log(ptd);
      const ptdJSON = JSON.stringify(ptd.pin);
       localStorage.setItem('client_data', ptdJSON);
      if (v == 1) { gonext(); } // save and next 
      return true
    } else { console.log(cn, ptg); alert('⚠️Something wroug! Check all details.'); return false }
  } else {
    return true
  }

}

// save party details and gen. id
async function svptd() {
  let oldid = ptd.id;
  ptd.id = ptid || genid(ptcounter(), 1); console.log('save party details', ptd);
  if (!oldid) {
    // save party details
    await db.pt.add(ptd);
  } else {
    // update party details
    await db.pt.update(oldid, ptd);
  }
  console.log(ptd, 'hiiiiiii');
  await sendd(urli, { "p": "10", "g": 'ptds', "od": {}, ptd }, 'Party Details ');
  selg || newocb(); selg && gr();
  for (let u in selod5) { document.getElementById(u).checked = false; }
  newc2();
}

// party counter
function ptcounter() {
  if (localStorage.ptcount && (localStorage.today == new Date().toLocaleDateString())) {
    localStorage.ptcount = Number(localStorage.ptcount) + 1;
  } else {
    localStorage.ptcount = 1;
    localStorage.today = new Date().toLocaleDateString();
  }
  return localStorage.ptcount;
}

function genid(v, i, b = 'a') {
  let id2; let id1;
  if (i == 1) {
    id1 = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).split('/').reverse().join('');
    id2 = Number(id1 + v.padStart(3, '0'));
  } else {
    id2 = Number(v);
  }
  let id3 = id2.toString(32).padStart(6, '0'); // base 32
  let s = 0; while (id2) { s += id2 % 10; id2 = Math.floor(id2 / 10); }
  let p5 = (i == 1) ? Number(id1 + v.padStart(3, '0')) :
    (i == 2) ? b + id3 + s :
      (i == 3) ? [...btoa(btoa(b + id3 + s))].reverse().join('') : '';
  return p5
}

function copylink() {
  let cn = document.getElementById('incn').value;
  let link = 'https://www.ownknitted.com/bill#' + genid(ptid, 3);
  let url1 = cn + ', save this link and download all your bills here👇\n\n' + link;
  let cnb = document.getElementById('cnm4');
  if (cn) {
    cnb.href = link;
    cnb.innerText = cn.slice(0, 6) + '...';
    cnb.style.display = '';
    navigator.clipboard.writeText(url1);
  } else {
    cn = 'No data';
  }
  snackbar(cn + ' copied', 500);
  newc2();
}

function copylink1(v) {
  let p = document.getElementById(v);
  let p1 = p.tabIndex;
  let cn = p.querySelector('b').innerText.match(/[^\d+.].+/g)[0].trim();
  // console.log(p1,cn);
  let link = 'https://www.ownknitted.com/bill#' + genid(p1, 3);
  let url1 = cn + ', save this link and download all your bills here👇\n\n' + link;
  navigator.clipboard.writeText(url1);
  snackbar(cn + ' copied', 500);
}

// print address
function printadd() {
  if (Object.keys(selod5).length) {
    let htmladd = '<style>a{text-decoration: none;color: black;}body{margin: 0; padding: 0;color: #000; background: #fff;}@media print {#pbr{page-break-after: always;display: block;}}.p2 span {font-weight: 400;}.p1{font-size: 32px!important;font-weight: initial;}.p2{font-size: 22px!important;}.p2 div{font-weight:bold}</style>';
    Object.keys(selod5).forEach(function (v, i) {
      (async () => { // get party address
        // let od=selg.slice(-1)+v.slice(2);//'as63'
        let cadd, radd;
        let cnv = document.getElementById(v).parentElement.tabIndex; console.log(cnv);
        // db.pt.where('cn').equals(b).each((v)=>{
        // await db.pt.where('cn').equals(cnv).toArray((v)=>{
        await db.pt.get(cnv).then((v) => {
          console.log(v);
          cadd = '<h1 class="p1"><b>To </b>- ' + v.cn + ', ' + v.mn1 + ', ' + v.mn2 + '<br>' + v.add + ', ' + v.pin + '</span></h1>';
          radd = '<h1><span class="p2"><div><b>Return address if not delivered</b><br></div><span>Own Knitted, 9336695049</span><br><span>F-120, Shutter wali gali, near Gujjar chowk, Khanpur Delhi, 110062</span></span></h1>';
        });
        let om = '<hr style="border-top: 2px dashed #000;padding: 0;margin: 0;">';
        if (!((i + 1) % 3)) {
          om = '<span id="pbr"></span>';
        }
        htmladd += cadd + radd + om;
      })();
      document.querySelector('#' + secid + ' #' + v).checked = false;
    })
    selod5 = {};
    setTimeout(() => {
      let myWindow = window.open("", "_blank"); let body1 = myWindow.document.body;
      body1.setAttribute('onclick', 'print()');
      body1.innerHTML += htmladd;//body.setAttribute('onclick','print()');
      myWindow.print();
      // myWindow.close();
    }, 150);
  } else {
    document.getElementById('id01').scrollTop = 0;
    // document.getElementById('id01').scrollTo({top: 0, behavior: 'smooth'});
  }
}

function download(link, name) {
  let iframe = document.createElement('iframe');
  document.head.appendChild(iframe);
  let docx = iframe.contentWindow.document;
  docx.write("<a id='link55' target='_blank' href='" + link + "' download='" + name + "'>Download</a>");
  docx.getElementById('link55').click();
  setTimeout(() => iframe.remove(), 1000);
}

// close button add detail 
function gr() {
  document.getElementById('bnm7').classList.toggle("w3-show");  //display block
  document.getElementById('ptd').classList.toggle("w3-modal");
  document.getElementById('ptd').classList.toggle("ptds");
  document.getElementById('instaa').classList.toggle("hide");
  document.getElementById('gall').classList.toggle("hide");
  // document.getElementById('tre6').classList.toggle("hide");//display none
  document.getElementById('cnm3').classList.toggle("hide");
  document.getElementById('cnm1').classList.toggle("hide");
  document.querySelector("#gstall > div.w3-blue-gray").style.display = 'flex';
}
//
async function goadd(b, z, m) { //b(ptid),z(odid),m(ptd)object
  b = Number(b);
  ptid = 0, ptods = {};
  console.log(b, z);
  let myfn = (v) => {
    gr(); document.getElementById('id01').scrollTop = 0;
    document.querySelector("#gstall > div.w3-blue-gray").style.display = 'none';
    document.getElementById('incn').value = v.cn;
    document.getElementById('ptm').value = v.mn1;
    document.getElementById('ptm1').value = v.mn2 ?? '';
    let k1 = document.getElementById('ptg');
    k1.value = v.gst ?? '';
    (k1.value) ? k1.dispatchEvent(new Event('input')) : document.getElementById('ptst').innerText = 'State 07BBNPG0866M2Z7';
    let k2 = document.getElementById('ptp');
    k2.value = v.pin ?? '';
    (k2.value) ? k2.dispatchEvent(new Event('input')) : document.getElementById('ptplace').innerText = 'State, District';
    document.getElementById('pta').value = v.add ?? '';
    ptods = v.ods; ptid = v.id; cid = z;
  }
  if (!m) {
    await db.pt.get(b).then((v) => {
      if (v) {
        myfn(v);
        console.log(v, 'b');
      } else {
        alert('Party details not found');
      }
    });
  } else {
    myfn(m);
  }
}

function addtbl(v, pc, qt, d) {
  document.getElementById('ctm9').innerHTML += `<tr data-p="${d}"><td>${v}</td><th>${pc}</th><th>${qt}</th>
  <td style="width: 10px;" onclick="this.parentElement.remove()"><b class="w3-block w3-button w3-ripple w3-teal">Del</b></td></tr>`;
}
document.querySelector('#addtbl0').addEventListener('click', (e) => {
  //console.log(e.currentTarget,e.target);
  let t = e.target;
  if (t.matches('li')) {
    document.querySelector('#addtbl').classList.toggle('w3-show');
    addtbl(t.innerText, 0, 0, t.dataset.p);
  }
  if (t.id === 'addtbl1') {
    document.querySelector('#addtbl').classList.toggle('w3-show');
    let pol = document.querySelector('#addtbl li:last-child input');
    let p0 = pol.value;
    if (p0) {
      addtbl(p0, 0, 0, ('0' + '' + p0 + '' + '0'));
      pol.value = '';
    }
  }
  // e.classList.toggle('w3-show');
})

async function syncdata() {
  newc2();
  w3_close();
  let pkj = document.getElementById('gstall');
  pkj.style.display = '';
  document.getElementById('bnm7').style.display = 'none';
  document.getElementById('p78').style.display = 'none';
  let li = '';

  await erdb.err.each(async (v) => {
    let cn = '';
    if ((v.p == '0') || (v.p == '1')) {
      cn = '<div class="w3-bar-item" style="color:blue">' + v.data.od.cn + '</div>';
    } else if (v.p == '10') {
      cn = '<div class="w3-bar-item" style="color:blue">' + v.data.ptd.cn + '</div>';
    }
    li += `<li id="z${v.id}"><div class="w3-bar w3-border w3-light-grey">
    <div class="w3-bar-item w3-green w3-left">${v.id}</div>
    ${cn}
    <div class="w3-bar-item w3-right">${v.type}</div>
    </div></li>`;
    // console.log(v.id,v.type,v.data.od.cn);
  });
  pkj.innerHTML = "<div id='tre6'><br><a onclick='syncdata1()' class='w3-button w3-red' style='display: block;'>Sync</a><br><ul id='sync' class='w3-ul w3-hoverable'>" + li + "</ul><br></div>";
}
let errid = 0; let cuuid = [];
async function syncdata1() {
  errid = 0; cuuid = [[], []];
  new Promise(async (resolve, reject) => {
    await erdb.err.each(async (v) => {
      switch (v.p) {
        case '0':
        case '1':
          errid = v.id;
          await sendd(urli, v.data, v.type, 'z');
          console.log('1', cuuid);
          resolve(cuuid);
          // document.getElementById('z'+v.id).remove();
          break;

        case '2':
        case '4':
        case '5':
          errid = v.id;
          await sendd(urli, v.data, v.type, 'z');
          console.log(cuuid);
          // document.getElementById('z'+v.id).remove();
          break;

        case '3': // take current pin data
          errid = v.id;
          selgo(v.data.g);
          v.data.od = JSON.parse(pinloc);
          await sendd(urli, v.data, v.type, 'z');
          console.log(cuuid);
          // document.getElementById('z'+v.id).remove();
          break;

        case '10': // take current ptd data
          // await db.pt.get(v.id).then(async(doc)=>{
          //   v.data.ptd=doc;
          //   errid=v.id;
          //   await sendd(urli,v.data,v.type);
          // document.getElementById('z'+v.id).remove();
          // })

          break;

        default:

          break;
      }
    });
  }).then((d) => {
    console.log('2', v);
    d[0].forEach(async (v) => { // for failed
      await erdb.err.put(v);
      console.log('again failed');
      document.getElementById('z' + v.id).remove();
    });

    d[1].forEach(async (v) => { // for succes
      await erdb.err.delete(v.id);
      console.log('now succes');
      document.getElementById('z' + v.id).remove();
    });
  })
}

// scroll
function dismth() {
  window.indexedDB.databases().then((e) => {
    let b = [];
    e.forEach((v, i) => {
      if (String(v.name).match(/\w\d{3}/g)) {
        let x = (2 + v.name.slice(1)); let moth = Number(x[2] + x[3]) - 1;
        let mth = new Date('20' + x[0] + x[1], moth).toLocaleDateString('en-GB', {
          month: 'short',
          year: 'numeric'
        });
        b[i] = `<ul id="${v.name}" class="w3-border w3-ul"><li onclick="getmth('${v.name}','${mth}')" class="w3-block w3-blue-gray w3-button">${mth}</li></ul>`;
      }
    });
    // console.log(b);
    document.getElementById('oderli').innerHTML += b.join('');
  });
}

async function getmth(b, m) {
  let po0 = document.querySelector('#' + b + ' li').nextSibling;
  for (let u in selod5) { document.getElementById(u).checked = false; } selod5 = {};

  if (!po0) {
    // console.log('0',po0);
    await mthdb(b);
    let z = await oddb.od.toArray();
    await appdli(z, b);
  } else {
    document.getElementById(b).innerHTML = `<li onclick="getmth('${b}','${m}')" class="w3-block w3-blue-gray w3-button">${m}</li>`;
    // console.log('1',po0);
  }
}

if (localStorage.gr5 == '555') {
  document.getElementById('cnm5').style.display = 'none';
}


function clearch() {
  caches.delete('v1').then((v) => { console.log(v) });
}

async function addch() {
  let p = location.pathname;
  if (p.match(/\/dd\/index.html/)) {
    p = '/dd/';
  } else if (p.match(/\/aa\/index.html/)) {
    p = '/aa/';
  } else if (p.match(/\/index.html/)) {
    p = '/';
  }
  let d = [p + "index.html",
  p + "rop.html",
  p + "pc.html",
  p + "exgst.html",
  p + "allcache.html",
  p + "my.js",
  p + "myy.js",
  p + "om.js",
  p + "w3.js",
  p + "dexie.min.js",
  p + "exgst.js",
  p + "vue.js",
  p + "sw.js",
  p + "my.css",
  p + "om.css",
    p];

  await caches.open('v1').then((cache) => {
    cache.addAll(d);
  })
}

document.getElementById('alltab').onclick = function () {
  viewtotal();
  document.getElementById('alltab').style.display = 'none';
  document.getElementById('cor1').style.display = '';
};

let shipr1 = JSON.parse(localStorage.shipr1).a;
let dlid; // {"id":3065,"coid":55,"ch":286.7,"st":0};
async function getcor(k) {
  console.log('HI');
  let pinl = ptd.pin.length; dlid = {};
  let pk = (pinl != 6) && pinl > 0;
  if ((pinl == 0) || pk) {
    let pin = prompt(pk ? 'Enter pincode (' + ptd.pin + ')incorrect' : 'Enter pincode');
    ptd.pin = pin.trim();
  }
  let urlx = 'https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=' + ptd.pin;
  let optx = { method: 'GET', redirect: 'follow', headers: { 'Content-Type': 'application/json', 'Authorization': shipr1 } };
  let urlx1 = 'https://bldn7ye7cv2pbdmdmgn4dhibi40fviwc.lambda-url.ap-south-1.on.aws/pin/' + ptd.pin;

  Promise.all[fetch(urlx, optx).then((v) => v.json()).then((v) => { dlid.c = v.postcode_details.city; dlid.s = v.postcode_details.state; }),
    fetch(urlx1).then((v) => v.json()).then((v) => {
      if (v.location.length) {
        dlid.c1 = v.location[0]; dlid.s1 = v.location[1];
      } else {
        setTimeout(() => { dlid.c1 = dlid.c; dlid.s1 = dlid.s; }, 300);
      }
    })];
  document.getElementById('alltab').style.display = '';
  document.getElementById('cor1').style.display = 'none';
  document.getElementById('id01').style.display = 'block';
  getcor1(); console.log(dlid);
}

function getcor1(v) {
  let pkj = document.getElementById('gstall');
  pkj.style.display = '';
  document.getElementById('bnm7').style.display = 'none';
  document.getElementById('p78').style.display = 'none';
  let dlpc = new Delhivery();
  let dlsh1 = new shrkt("Surface");
  let dlsh2 = new shrkt("Air");
  pkj.innerHTML = `<div id="tre6" class="w3-container">
  <p onclick="document.getElementById('id01').style.display=''" class="w3-button w3-pale-red">❮ Back</p>
  <b id="dlcn" class="w3-button w3-border"></b>
                <p id="pinclick" class="w3-code"><input checked class="w3-radio" type="radio" name="from" value="110062"><b> 110062</b>
                <input class="w3-radio" type="radio" name="from" value="641607"><b> 641607</b>
                <b class="w3-code w3-large"> To: ${ptd.pin}</b>
                </p>
                <p class="w3-code"><b>weight: ${pcwt.toFixed(2)}kg</b></p>
                <div id="allcor" style="display: grid;"><p class="loading">.</p></div>
                </div><div class="w3-blue-gray"></p></div><br><br><br><br>`;
  document.getElementById('dlcn').innerText = ((pk8) ? pk8 : (date1 + (Number(localStorage.clickcount) + 1))) + ". " + document.getElementById('u13').innerText;
  document.querySelector('.w3-bar.w3-panel').style.display = "none";
  document.getElementById('pinclick').onclick = () => {
    console.log('hi'); controller.abort();
    let cv = Number(document.querySelector('#pinclick input[type="radio"]:checked').value);
    dlpc.o_pin = cv; dlsh1.pickup_postcode = cv; dlsh2.pickup_postcode = cv;
    console.log(cv, dlpc);
    document.getElementById('allcor').innerHTML = '<p class="loading"></p>';
    gosh(dlpc, dlsh1, dlsh2);
  };
  gosh(dlpc, dlsh1, dlsh2);
}
let dlurl;
let controller;

async function gosh(obj1, obj2, obj3) {
  controller = new AbortController();
  const signal = controller.signal;
  await Promise.all([
    new Promise((rez) => {
      if (pcwt < 5) {
        let list = ""; let url = "https://apiv2.shiprocket.in/v1/external/courier/serviceability/?";
        fetch(url + new URLSearchParams(obj3), { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': shipr1 } })
          .then(res => res.json())
          .then((v) => {
            if (v.status == 200) {
              let d = v.data.available_courier_companies;
              console.log(d);
              d.forEach((v) => {
                let cor = String(v.courier_name);
                // console.log(cor)
                if (cor.includes("Blue Dart") || cor.includes("Delhivery") || cor.includes("Amazon") || cor.includes("DTDC")) {
                  list += `<div id="shp" tabindex="${v.courier_company_id}" class="w3-padding w3-khaki"><div><b>${v.courier_name}</b><b class="w3-right">${v.freight_charge}₹</b></div><a href="#" onclick="dlfn(this,'shp')" class="w3-hover-red">Save</a><i> ETD: ${v.etd} </i><a href="#" onclick="dlfn(this,'shp')" class="w3-hover-red">Book</a><i class="w3-right">${v.is_surface ? 'Surface' : 'Air'}</i></div>`;
                }
              })
              document.getElementById('allcor').innerHTML = list + document.getElementById('allcor').innerHTML;
            }
          }).catch((v) => { console.log(v); alert(v) });
      }; rez();
    }),
    new Promise(rez => {
      let list = ""; let url = "https://apiv2.shiprocket.in/v1/external/courier/serviceability/?";
      fetch(url + new URLSearchParams(obj2), { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': shipr1 } })
        .then(res => res.json())
        .then((v) => {
          if (v.status == 200) {
            let d = v.data.available_courier_companies;
            console.log(d);
            d.forEach((v) => {
              let cor = String(v.courier_name);
              // console.log(cor)
              if (cor.includes("Blue Dart") || cor.includes("Delhivery") || cor.includes("Amazon") || cor.includes("DTDC")) {
                list += `<div id="shp" tabindex="${v.courier_company_id}" class="w3-padding w3-khaki"><div><b>${v.courier_name}</b><b class="w3-right">${v.freight_charge}₹</b></div><a href="#" onclick="dlfn(this,'shp')" class="w3-hover-red">Save</a><i> ETD: ${v.etd} </i><a href="#" onclick="dlfn(this,'shp')" class="w3-hover-red">Book</a><i class="w3-right">${v.is_surface ? 'Surface' : 'Air'}</i></div>`;
              }
            })
            document.getElementById('allcor').innerHTML = list + document.getElementById('allcor').innerHTML;
          }; rez();
        }).catch((v) => { console.log(v); alert(v) });
    }),
    new Promise(rez => {
      let list = "";
      dlurl = 'https://bldn7ye7cv2pbdmdmgn4dhibi40fviwc.lambda-url.ap-south-1.on.aws';//.join('');
      fetch(dlurl + "?" + new URLSearchParams(obj1), { method: 'GET', signal })
        .then(res => res.json())
        .then((v) => {
          console.log(v[0][0], v[1][0], v[2][0], v[3]);
          list += `<div id="dl0" tabindex="0" class="w3-padding w3-light-blue"><div><b>DUSHIRTS01 SURFACE</b><b class="w3-right">${v[0][0].total_amount}₹</b></div><a href="#" onclick="dlfn(this,'dl0')" class="w3-hover-red">Save</a><i> ... </i><a href="#" onclick="dlfn(this,'dl0')" class="w3-hover-red">Book</a><i class="w3-right">Surface</i></div>`;
          list += `<div id="dl1" tabindex="1" class="w3-padding w3-light-blue"><div><b>DUSHIRTSEXPRESS</b><b class="w3-right">${v[1][0].total_amount}₹</b></div><a href="#" onclick="dlfn(this,'dl1')" class="w3-hover-red">Save</a><i> ... </i><a href="#" onclick="dlfn(this,'dl1')" class="w3-hover-red">Book</a><i class="w3-right">Air</i></div>`;
          list += `<div id="dl2" tabindex="2" class="w3-padding w3-light-blue"><div><b>10KG DUSURFACE</b><b class="w3-right">${v[2][0].total_amount}₹</b></div><a href="#" onclick="dlfn(this,'dl2')" class="w3-hover-red">Save</a><i> ... </i><a href="#" onclick="dlfn(this,'dl2')" class="w3-hover-red">Book</a><i class="w3-right">Surface</i></div>`;
          for (let i in v[3]) {
            // console.log(i,v[3][i])
            if (String(i).includes("Delhivery") || String(i).includes("Gati")) {
              list += `<div id="rkb" title="${v[3][i].mode_id},${v[3][i].id}" class="w3-padding w3-lime"><div><b>${i}</b><b class="w3-right">${v[3][i]["rates"]}₹</b></div><a href="#" onclick="dlfn(this,'rkb')" class="w3-hover-red">Save</a><i> ETD: ${v[3][i]["tat"] + ' / ' + v[3][i]["avg_delivery_days"]}</i><a href="#" onclick="dlfn(this,'rkb')" class="w3-hover-red">Book</a><i class="w3-right">${v[3][i]["mode_name"]}</i></div>`;
            }
          }
          document.getElementById('allcor').innerHTML += list; rez();
        }).catch((v) => { console.log(v); });
    })
  ]);
  document.querySelector("#allcor .loading").remove();
}


function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

class shbook {
  constructor(id, c, s, u, pc, wt, cn, add, pin, mn1, mn2) {
    this.order_id = id;
    this.order_date = formatDate(new Date());
    let cv = document.querySelector('#pinclick input[type="radio"]:checked').value;
    this.pickup_location = (cv == '110062') ? "ownknitted.com" : "T ownknitted.com";
    this.billing_customer_name = cn;
    this.billing_last_name = "";
    this.billing_address = add;
    this.billing_pincode = pin;
    this.billing_city = c;
    this.billing_state = s;
    this.billing_country = "India";
    this.billing_email = "sales.dushirts@gmail.com";
    this.billing_phone = mn1;
    mn2 && (this.billing_alternate_phone = mn2);
    this.shipping_is_billing = true;
    this.order_items = [{
      "name": "Clothes",
      "sku": "OwnKnitted.com",
      "units": u,
      "selling_price": (pc / u).toFixed(2)
    }];
    this.payment_method = "Prepaid";
    this.sub_total = pc;
    this.length = 1;
    this.breadth = 2;
    this.height = 3;
    this.weight = Number((wt * 0.8).toFixed(2))
  }
}


class rkbs {
  constructor(pt, c, s, spdoc, wt) {
    let nop = ((wt > 30) ? Number(prompt("Enter no. of packages", 1)) : 1);
    let appwt = ((wt * 0.8).toFixed(2));
    this.no_of_packages = nop;
    this.approx_weight = appwt;
    let cv = (document.querySelector('#pinclick input[type="radio"]:checked').value == '110062');
    this.source_warehouse_name = (cv ? "ownknitteddotcom" : "townknitteddotcom");
    this.source_address_line1 = (cv ? "F120, own knitted, khanpur" : "26/14 bridge way colony, 1st street");
    this.source_address_line2 = (cv ? "Near shutter wali gali, gujjar chowk" : "lakshmi nagar east, tiruppur, tamilnadu");
    this.source_pincode = (cv ? "110062" : "641607");
    this.source_city = (cv ? "New Delhi" : "Tiruppur");
    this.source_state = (cv ? "Delhi" : "Tamil Nadu");
    this.sender_contact_person_name = "ownknitted.com";
    this.sender_contact_person_email = "sales.dushirts@gmail.com";
    this.sender_contact_person_contact_no = (cv ? "9336695049" : "9500725678");

    this.destination_warehouse_name = pt.cn;
    let add = pt.add.match(/\w+/g); let addn = Math.floor(add.length / 2);
    this.destination_address_line1 = add.slice(0, addn).join(' ');
    this.destination_address_line2 = add.slice(addn).join(' ');
    this.destination_pincode = pt.pin;
    this.destination_city = c;
    this.destination_state = s;
    this.recipient_contact_person_name = pt.cn;
    this.recipient_contact_person_email = "ketu.okbw@gmail.com";
    this.recipient_contact_person_contact_no = pt.mn1;
    this.client_id = 3410;
    let dat = [{ "units": 1, "weight": Number(Number(appwt) / nop), "length": 1, "height": 3, "width": 2, "display_in": "cm" }];
    if (nop > 1) {
      for (let i = 1; i < nop; i++) {
        dat.push(dat[0]);
      }
    }
    this.packaging_unit_details = dat;
    this.supporting_docs = [spdoc];
    this.shipment_type = "forward";
    this.mode_name = "surface";
    this.source = "API";
  }
}

class rkbf {
  constructor(inn, inv, mid, pid, docid) {
    let mydt = formatDate(new Date(new Date().getTime() + (1000 * 60 * 3)));
    this.client_id = "3410";
    this.order_id = 22222;
    this.remarks = "Handle With Care";
    this.mode_id = mid;
    this.delivery_partner_id = pid;
    this.pickup_date_time = mydt;
    this.invoice_value = inv;
    this.invoice_number = inn;
    this.invoice_date = mydt.slice(0, 10);
    this.source = "API";
    this.supporting_docs = [docid];
  }
}

class shrkt {
  constructor(d) {
    this.pickup_postcode = 110062;
    this.delivery_postcode = Number(ptd.pin);
    this.cod = 0;
    this.weight = Number(pcwt.toFixed(2)); // kg
    this.mode = d; // Surface or Air
  }
}
class Delhivery {
  constructor(d) {
    this.o_pin = 110062;
    this.d_pin = Number(ptd.pin);
    // this.md = d; // "S"/"E"
    this.cgm = Number((pcwt * 1000).toFixed()); // gram
    // this.ss = 'Delivered';
  }
}

async function sptcor(id) {
  let a = document.getElementById('pta').value;
  let m = document.getElementById('ptm').value;
  if (a && m) {
    sptd(2) && gr();
    let myb = document.getElementById('cnm0');
    myb.style.display = 'none';
    document.getElementById('cnm2').style.display = '';
    document.getElementById('cnm3').style.display = '';
    // await db.pt.update(ptid, ptd);
    console.log(ptd, 'hiiiiiii');
    document.getElementById(myb.name).click();
  } else {
    alert("Check!! Mobile no. & Address")
  }
}

async function uplodimg(odn, v, url) {
  let myfrom = `<tr><td colspan="4"><div id="u13" style="display:none"></div><b>Bill No. - ${odn}</b><span></span></td></tr><tr><td colspan="4"><b>From - </b><i>Own Knitted Blank Wears F-120, Near Gujjar Chowk, Shutter wali gali, Khanpur, Nearby Saket Metro, Delhi-110062<br>Phone No. - +91-9336695049<br>GSTIN - 07BBNPG0866M2Z7</i></td></tr>`;
  let myto = `<tr><td colspan="4"><b>To - </b><i>${v.cn + ' '}${v.add + '<br>'}${v.mn1 + '<br>'}${v.gst && ('GSTIN - ' + v.gst)}</i></td></tr><tr><td colspan="4"><b>HSN Code - </b><i>6109(For All Products)</i></td></tr>`;

  let mdiv = document.querySelector("#tot thead");
  let fdiv = mdiv.innerHTML;
  mdiv.innerHTML = myfrom + myto;
  let html33 = document.getElementById("tot");
  html33.style.width = '455px';
  await html2canvas(html33, { allowTaint: true, useCORS: true }).then((canvas) => {
    canvas.toBlob((blob) => {
      mdiv.innerHTML = fdiv; html33.style.width = '';
      fetch(url, { body: blob, headers: { 'Content-Type': 'image/png' }, method: 'PUT' })
        .then((res) => {
          console.log('Image uploaded successfully')
        })
        .catch((er) => { alert('Error uploading Rocketbox order image:', JSON.stringify(er)); });
    });
  })
}

async function dlfn(v, id) {
  let v9 = (pk8) ? pk8 : Number((date1 + (Number(localStorage.clickcount) + 1)));
  let mhj = "woxdk-4" + v9 + "0-k" + Math.random().toString(36).slice(6) + "d";
  let pe = v.parentElement;
  let my0 = pe.querySelector('div b.w3-right').innerText.slice(0, -1); console.log(my0);
  let intt = v.innerText; v.id = intt;
  dlid = { "id": v9, "coid": pe.tabIndex, "dl": id, "tch": Math.ceil(my0), ...dlid };

  if (((ptd.add == '') || (ptd.mn1 == '')) && (intt != 'Save')) {
    console.log('hi');
    goadd(0, v9, ptd); // goadd(3123131,3065);
    document.getElementById('cnm0').style.display = '';
    document.getElementById('cnm0').name = intt;
    document.getElementById('cnm2').style.display = 'none';
    document.getElementById('cnm3').style.display = 'none';
  } else {
    // let mytt; 
    document.getElementById('allcor').innerHTML = '<p class="loading"></p>';
    if (intt == 'Save') {
      // mytt = 'Order Saved';
      dlid.st = 1;
    } else {// { "p": "0", "g": gd, "od": { ...zsr, "pc":{...odprice}},ptd,total,pcwt,pctt };
      // mytt = 'Order Booked';
      dlid.st = 0;
    }
    if (!document.getElementById('dl0')) {
      controller.abort();
    }
    let och;
    if (pcwt < 2) {
      och = 20;
    } else if (pcwt > 2) {
      och = 50 * Math.ceil(pcwt / 25);
    }
    dlid.och = och;
    document.getElementById('tch').value = dlid.tch + och;

    if (id == 'rkb') {
      let myl = "https://kcqawrffldi2xw.s3.ap-south-1.amazonaws.com/zcoyad/files/" + mhj + ".png"; dlid.durl = myl;
      // if (!dlid.st) {
      await uplodimg(v9, ptd, myl); // upload always so book later
      // }
    }

    let x;
    if (pk8) {
      x = await updateod('u');
    } else {
      x = await creatod();
    }
    console.log(x);
    let myd;
    if (id == 'shp') {
      dlid.book = new shbook(x.od.id, dlid.c, dlid.s, x.od.tot, x.od.inv[1], x.pcwt, x.ptd.cn, x.ptd.add.replace(/\s+/g, ' ').trim(), x.ptd.pin, x.ptd.mn1, x.ptd.mn2);
      dlurl += '/shp/' + dlid.coid;
      myd = JSON.stringify(dlid.book);
      console.log(dlurl);
    } else if (id == 'rkb') {
      // let myl = "https://kcqawrffldi2xw.s3.ap-south-1.amazonaws.com/zcoyad/files/" + mhj + ".png"; dlid.durl = myl;
      // // if (!dlid.st) {
      // await uplodimg(v9, ptd, myl); // upload always so book later
      // // }
      let pid = pe.title.split(',');
      dlid.book = [new rkbs(x.ptd, dlid.c1, dlid.s1, dlid.durl, x.pcwt), new rkbf(x.od.id, x.od.inv[1], Number(pid[0]), Number(pid[1]), dlid.durl)];
      dlurl = "https://script.google.com/macros/s/AKfycbxV9vG5zPSAu2xFAZjXpEVfvyMlJOOZgbxvGafsz609QmUnHal2HWNCc9TToXO17xpzwg/exec";
      myd = '';
    } else if ((id == 'dl0') || (id == 'dl1') || (id == 'dl2')) {
      dlid.book = new Dl0(x);
      dlurl = "https://bldn7ye7cv2pbdmdmgn4dhibi40fviwc.lambda-url.ap-south-1.on.aws/del/" + id;
      myd = 'format=json&data=' + JSON.stringify(dlid.book);
    }
    dlid.url = dlurl;
    document.querySelector('.w3-bar.w3-panel').style.display = "";
    if (!dlid.st) {
      console.log(dlid.dl, myd, dlurl);
      worker.postMessage([dlid, { method: 'POST', body: myd, headers: { 'Content-Type': 'application/json' } }]);
      // document.querySelector("#allcor .loading").remove();
    }
  }
  new Promise(async (rez) => {
    await dldb.dl.put(dlid, dlid.id);
    await stockm();
    await snackbar("Booking your order", 1000);
    setTimeout(rez(), 300);
  });
}

// background worker
const worker = new Worker('sw.js');
worker.addEventListener('message', event => {
  const alldata = event.data;
  const data = alldata[1];
  let dlid = alldata[0];
  let id = dlid.dl;
  let mysms = dlid.id + ' Booked';
  dlid.st = 0;
  if (data.error) {
    mysms = 'Error: ' + data.error;
    dlid.st = 1;
    console.log(data);
    alert('Error: ', JSON.stringify(data));
  } else if (id == 'shp') {
    console.log('Data shp:', data);
    dlid.order = data;
  } else if (id == 'rkb') {
    console.log('Data rkb:', data);
    dlid.order = [data.label_url];
  } else if ((id == 'dl0') || (id == 'dl1') || (id == 'dl2')) {
    let dt = data.packages[0];
    console.log('Data dl:', data);
    if (dt.status == 'Fail') {
      mysms = dlid.id + ' Failed To Book';
      dlid.st = 1;
      alert(mysms + '\n' + dt.remarks[0]);
    } else {
      dlid.order = [dt.waybill];
    }
  }
  new Promise(async (rez) => {
    await snackbar(mysms, 1000);
    await dldb.dl.put(dlid, dlid.id);
    setTimeout(rez(), 100);
  })
});

// worker.postMessage(['',{}]); // [0]url,[1]data

class Dl0 {
  constructor(d) {
    this.shipments = [{
      add: d.ptd.add.replace(/\s+/g, ' ').trim(),
      phone: d.ptd.mn1,
      name: d.ptd.cn,
      pin: Number(d.ptd.pin),
      order: String(d.od.id),
      weight: (d.pcwt * 0.8 * 1000).toFixed(),   //  pcwt in gm
      total_amount: d.od.inv[1],
      quantity: String(d.od.tot),
      payment_mode: 'Prepaid',
      seller_name: 'OwnKnitted.com',
      category_of_goods: 'Clothes',
      shipment_length: 1,
      shipment_width: 2,
      shipment_height: 3,
    }];
    let cv = document.querySelector('#pinclick input[type="radio"]:checked').value;
    this.pickup_location = { name: (cv == '110062') ? 'ownknitted.com' : 'T ownknitted.com' };
  }
}

function book() {
  alert("Gandu!! Abhi Nhi");
}
