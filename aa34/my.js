var doc = document, zzz = (s, o = doc) => o.querySelectorAll(s), zz = (s, o = doc) => o.querySelector(s), zc = console.log.bind(doc);

function loadScript(url) {
  const sc = document.createElement('script');
  sc.src = url; sc.async = true;
  return new Promise((res, rej) => {
    sc.onload = () => res(sc);
    sc.onerror = () => { sc.remove(); rej(new Error(`Failed to load: ${url}`)); };
    document.head.appendChild(sc);
  });
}
// loadScript('https://example.com/script.js')
// .then(script => console.log('Loaded:', script)).catch(error => console.error(error));

async function getods(gd) {
  try {
    selgo(gd); let lv = JSON.parse(localStorage.getItem('trp'));
    let j = JSON.parse(pinloc); let vb = '';
    let hmtl0 = '';
    for (let k in j) {
      let pf = k.slice(2, 9); let id = Number(k.slice(3));
      // console.log(pf,k);
      let book = await dldb.dl.get(id).then(i => {
        if (i == undefined) {
          return ["", ""]
        } else if (i.st) {
          return ["class='light'", "<button onclick='book()' class='w3-display-middle'>Book</button>"]
        } else {
          return ["class='light-max'", ""]
        }
      });
      if (vb != pf) { vb = pf; await mthdb(pf); }
      await oddb.od.get(id).then(i => {
        let ifz = '';
        if (!(i.tot)) { ifz = "class='delt'" };
        let duev1 = i.inv[1] - Number(lv[i.id]?.[1] || 0);
        let due = `<span tabindex='${duev1}'>${duev1}</span>`;//style='padding: 0 1.55em'
        let inp = "<input onclick='selod(this)' id='ods" + i.id + "' class='w3-check' type='checkbox'>";
        let vtag = "<span id='vtag' ><span name=" + 'ods' + i.id + ">" + "</span></span>" + book[1];
        let nub = i.id.toString();
        nub = nub.slice(4, 6) + Number(nub.slice(-7));
        hmtl0 = "<li " + book[0] + " id=s" + i.id + " " + "tabindex=" + i.pt + " " + ifz + ">" + inp + ' ' + "<b onclick='goadd(" + i.pt + ',' + i.id + ")'>" + nub + '. ' + i.cn + '</b>' + vtag + "<span onclick='opodli(this)'>" + i.tot + ' ' + due + ' ' + i.dt.slice(0, 6) + "</span></li>" + hmtl0;
      });
    }
    document.getElementById('oderli').innerHTML = hmtl0;
    dismth();
  }
  catch (error) {
    console.log('error in getods() fn-', error);
    alert('error in getods() fn-', error);
  }
}
async function appdli(v, s) {
  let hmtl0 = '';
  for await (const i of v) {
    // console.log(i)
    let ifz = '';
    if (!(i.tot)) { ifz = "class='delt'" };
    let gstr = "<span style='padding: 0 1.55em'></span>";
    let inp = "<input onclick='selod(this)' id='ods" + i.id + "' class='w3-check' type='checkbox'>";
    let vtag = "<span id='vtag' ><span name=" + 'ods' + i.id + ">" + "</span></span>";
    hmtl0 = "<li id=s" + i.id + " " + "tabindex=" + i.pt + " " + ifz + ">" + inp + ' ' + "<b onclick='goadd(" + i.pt + ',' + i.id + ")'>" + i.id + '. ' + i.cn + '</b>' + vtag + "<span onclick='opodli(this)'>" + i.tot + ' ' + gstr + ' ' + i.dt.slice(0, 6) + "</span></li>" + hmtl0;
  }
  document.querySelector('#' + s).innerHTML += hmtl0;
}
async function getinst() {
  newc2();
  w3_close();
  let pkj = document.getElementById('gstall');
  pkj.style.display = '';
  pkj.innerHTML = "<div id='tre6'><br><ul id='oderli' class='w3-ul w3-hoverable w3-border'></ul><br></div>";
  document.getElementById('bnm7').style.display = 'none';
  document.getElementById('p78').style.display = 'none';
  selg = 'inst';
  let allod = await instdb.inst.toArray((v) => {
    return v.sort((a, b) => {
      return a.id - b.id;
    });
  });
  let hmtl0 = '';
  for await (const i of allod) {
    // console.log(i)
    let gstr = "<span style='padding: 0 1.55em'></span>";
    let lid = 'data-gd=' + i.cn; let exio = 'Export CSV'; let funex = "onclick='expt(this)'";
    vtag = "<span id='vtag' " + funex + "><span name=" + 'od' + i.id + ">" + exio + "</span></span>";
    hmtl0 = "<li id=s" + i.id + " " + lid + " >" + ' ' + "<b>" + i.id + '. ' + i.cn + '</b>' + vtag + "<span onclick='opodli(this)'>" + i.tot + ' ' + gstr + ' ' + i.dt.slice(0, 6) + "</span></li>" + hmtl0;
  }
  document.getElementById('oderli').innerHTML = hmtl0;
}
let db = new Dexie("party"); db.version(2).stores({ pt: "id,cn,mn1,mn2,*ods" });
let erdb = new Dexie("erro"); erdb.version(1).stores({ err: "id" });
let instdb = new Dexie("inst"); instdb.version(1).stores({ inst: "++id" });
// let bulkdb = new Dexie("bulk"); bulkdb.version(1).stores({ bk: "id" });
let dldb = new Dexie("dldb"); dldb.version(1).stores({ dl: "id,st" });
var selod5 = {}; var zsr = {}; let selg; let odimgbob;
//var om=document.getElementById("tb").innerHTML;
var od = {};
// var zxc = 0;
// if (localStorage.clickcount) { zxc = localStorage.clickcount; };

// shp
if (((Date.now() > (Number(localStorage.shpdt) + 40000000)) || (!localStorage.shpdt))) {
  fetch('https://dsfdyyhqqgvk6duva445txkioq0jzoqe.lambda-url.ap-south-1.on.aws').then((v) => v.json())
    .then((v) => {
      localStorage.shipr1 = '{"a":"Bearer ' + v[0] + '"}';
      localStorage.setItem('shpdt', Date.now());
    })
}

// date today
var date; let date1;
function todaydate() {
  let d = new Date();
  date = d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  date1 = d.toLocaleDateString('LT', {
    month: '2-digit',
    year: '2-digit'
  }).split('-').join('').slice(-3);
  // if (localStorage.m != (d.getMonth() + 1)) {
  //   localStorage.clickcount = 0; localStorage.m = (d.getMonth() + 1);
  //   // localStorage.fromod = 0; zxc = 0;
  // }
}
todaydate();

let oddb;
async function mthdb(m) {
  oddb = new Dexie(m);
  oddb.version(1).stores({ od: "id,dt,bulk" });
}

var urli = localStorage.gr5;
let gststate = { "01": "Jammu And Kashmir", "02": "Himachal Pradesh", "03": "Punjab", "04": "Chandigarh", "05": "Uttarakhand", "06": "Haryana", "07": "Delhi", "08": "Rajasthan", "09": "Uttar Pradesh", "10": "Bihar", "11": "Sikkim", "12": "Arunachal Pradesh", "13": "Nagaland", "14": "Manipur", "15": "Mizoram", "16": "Tripura", "17": "Meghalaya", "18": "Assam", "19": "West Bengal", "20": "Jharkhand", "21": "Odisha", "22": "Chattisgarh", "23": "Madhya Pradesh", "24": "Gujarat", "26": "Dadra And Nagar Haveli And Daman And Diu", "27": "Maharashtra", "28": "Andhra Pradesh(old)", "29": "Karnataka", "30": "Goa", "31": "Lakshadweep", "32": "Kerala", "33": "Tamil Nadu", "34": "Puducherry", "35": "Andaman And Nicobar Islands", "36": "Telangana", "37": "Andhra Pradesh", "38": "Ladakh", "97": "Other Territory", "99": "Centre Jurisdiction" };
let intp = (navigator.platform === 'iPhone') ? "pattern='[0-9]*' type='text'" : "type='number'";
let intp2 = "type='button'";
let intp4 = "onclick='unavail()'";

let pc = {};
function gentbl(f) {
  let m = '';
  let tbldiv = document.getElementById('tbldiv');
  let navbar = document.getElementById('pdbtn');

  Object.keys(f).forEach((t, i) => { // Type loop
    pc[t] = pc[t] || {};
    m += `<button id='bt${i}' title='${t}' class="w3-button tablink">${t}</button>`;
    tbldiv.innerHTML += `<div id="t${i}" class="city dn"></div>`;

    let type = `<table id='tbl0${i}' title='${t}' class='w3-table-all pky w3-centered'><thead>`;
    let color = '';
    let size = `<tr class="w3-red"><th class="w3-blue">${tbl[1][t][0]}</th>`;

    Object.keys(f[t]).forEach((c, i1) => { // Color loop
      let unx = tbl[10]?.[t]?.[c]?.split(',') || [];
      color += `<tr title='${c}' class='oj'><th>${c}</th>`;

      Object.keys(f[t][c]).forEach((s) => { // Size loop
        if (i1 === 0) {
          size += `<th>${s}</th>`;
          let p = f[t][c][s];
          (pc[t][p]) ? pc[t][p].push(s) : pc[t][p] = [s];
        }

        let unx1 = unx.includes(s);
        color += `<td><input class='w3-input' name='${s}' ${unx1 ? intp4 : ''} ${unx1 ? intp2 : intp}></td>`;
      });

      color += `</tr>`;
    });

    type += `${size}</tr></thead><tbody>${color}</tbody></table>`;
    document.getElementById(`t${i}`).innerHTML = type;
  });

  navbar.innerHTML = m;
  document.querySelector("div.bar button.tablink").click();
  // opentbl('t0'); // Open default table (e.g., Biowash)
}

(async () => {
  await loadScript('https://d2fzc2z1ecgedb.cloudfront.net/pc.js?t=' + Date.now());
  gentbl(tbl[0]);
})()

document.getElementById('pdbtn').addEventListener('click', function (evt) {
  let tg = evt.target;
  if (tg.classList.contains('tablink')) {
    tg.parentElement.childNodes.forEach(btn => btn.classList.remove("w3-red"));
    tg.classList.add("w3-red");
    // openCity(evt);
    document.querySelectorAll(".city").forEach(city => city.classList.add("dn"));
    document.getElementById(tg.id.slice(1)).classList.remove("dn");

    document.getElementById('alltab').style.display = '';
    document.getElementById('cor1').style.display = 'none';
    document.querySelectorAll("tr.oj.dn").forEach(row => row.classList.remove("dn"));
    document.getElementById('tot').style.display = 'none';
  }
});

//  toggle in sample/bulk oder
let totqt = [];
function bulks() {
  let hj = document.querySelectorAll("#pdbtn button").length + 2;
  totqt[hj] = (document.getElementById('bulkc').checked) ? tbl[3].moq : -110;
  console.log(totqt, 'hiiiiiii');
}

// display all tab 
// let bulk;
// let prc = {};
function viewtotal() {
  return new Promise(async (rez) => {
    let sum = totqt.reduce((p, a) => p + a, 0);
    console.log(sum);
    let check = document.getElementById('bulkc');
    if (check.checked) {
      // check.checked = 1;
    } else if ((sum > tbl[3].moq)) {
      check.checked = 1;
    } else {
      check.checked = 0;
    }

    document.querySelector(".tablink.w3-red")?.classList.remove("w3-red");
    document.querySelectorAll(".city tr.oj").forEach(row => {
      const inputs = row.querySelectorAll('input');
      const hasValue = Array.from(inputs).some(input => input.value !== "");
      if (hasValue) {
        row.classList.remove("dn");
      } else {
        row.classList.add("dn");
      }
    });
    document.querySelectorAll(".city").forEach(city => {
      const inputs = city.querySelectorAll('input');
      const allEmpty = Array.from(inputs).every(input => !input.value);
      if (allEmpty) {
        city.classList.add("dn");
      } else {
        city.classList.remove("dn");
      }
    });
    await tot(); rez();
  })
}

function unavail() { if (!insxx.length) { alert('Stock Refilling Soon!!') } }
// var pctt; var pcwt; let total; var odprice;

let odtot, odwt, odqt, odpc, odpcf, oddata, billinv = [], othch;
function tot() {
  return new Promise(rez => {
    let tchx = document.getElementById('tch').valueAsNumber || 0;
    let ochx = document.getElementById('och').valueAsNumber || 0;
    let disx = document.getElementById('dis').valueAsNumber || 0;
    othch = [tchx, ochx, disx];
    document.getElementById('u13').innerText = document.getElementById('frt').innerText;
    let dtt = date.slice(0, 6) + ', ' + new Date().toLocaleTimeString('en', { hour: "2-digit", minute: "2-digit", hour12: true }).replace(' ', '');;

    document.getElementById('tot').style.display = '';
    odtot = {}, odwt = 0, odqt = 0, odpc = 0, odpcf = 0, oddata = {};// type:{pc:qty,pc:qty},type:type:{pc:qty,pc:qty} // type qty*pc+qty*pc=odpc
    let sum = totqt.reduce((p, a) => p + a, 0);

    let odt = (sum > tbl[3].moq);
    if (document.getElementById('bulkc').checked) { odt = true; }
    Object.keys(od).forEach((t) => { //  type loop
      odtot[t] = {};
      Object.keys(od[t]).forEach((c) => {// color loop
        // console.log(t,c,od[t][c]); // Bio White {38: 7}
        Object.keys(od[t][c]).forEach((s) => { // size loop
          let v = od[t][c][s];
          // console.log(t, c, s, v); // Bio Black 40 8
          let pc = odt ? tbl[0][t][c][s] : tbl[2][t]; // sample/bulk
          (odtot[t][pc]) ? odtot[t][pc] += v : odtot[t][pc] = v;
          odwt += tbl[4][t] * v;
        });

      });
    });
    // console.log(odtot, odwt); 
    let ht = '';
    for (const t in odtot) {
      let cal = ''; let qtt = 0; let tpc = 0;
      for (const p in odtot[t]) {
        let qt = odtot[t][p];
        qtt += qt; tpc += qt * Number(p);
        let plus = cal ? ' + ' : '';
        cal += `${plus}${qt}×${p}`;
        // console.log(t, p, qt);
      }

      ht += `<tr><td><b class='fw'>${qtt} ${t}</b><b class='sa2'>${cal} = </b></td><td>${tpc.toLocaleString('en-IN')}₹</td></tr>`;
      odqt += qtt;
      odpc += tpc;
      console.log(odwt);
    }
    let tch = tchx ? `<tr><td><b class='sa2'>Transport Charge -</b></td><td>${tchx}₹</td></tr>` : '';
    let och = ochx ? `<tr><td><b class='sa2'>Other Charges -</b></td><td>${ochx}₹</td></tr>` : '';
    let dis = disx ? `<tr><td><b class='sa2'>Discount -</b></td><td>${disx}₹</td></tr>` : '';
    odwt = dec2(odwt);
    odpc = dec2(odpc + tchx + ochx - disx);
    let t = tbl[6].gst;
    let tm = dec2(odpc * (t / 100));
    let tax = `<tr><td><b class='sa2'>${t}% GST -</b></td><td>${tm}₹</td></tr>`;
    ht += `${tch + och + dis}<tr><td><b class='sa2'>Taxable Value - </b></td><td>${(odpc.toLocaleString('en-IN'))}₹</td></tr>`;
    odpcf = dec2(odpc + tm);
    billinv = [odpc, odpcf];
    ht += `${tax}<tr><td><b class='sc1'>${odqt} PCS Total</b><b class='sc1' style='margin-left: 2px;background: #2e2effd6'>${Math.ceil(odwt)}kg</b><b class='sa2 fw'>Total Amount -</b></td><td id='ttpc'><b class='sc1'>${Math.ceil(odpcf).toLocaleString('en-IN')}₹</b></td></tr>`;
    // document.getElementById('odhh').innerHTML = `<input class="my-check" type="checkbox" ${odt ? '' : 'checked="checked"'}><label>Sample Order(<${tbl[3].moq}pcs)</label>, <input class="my-check" type="checkbox" ${odt ? 'checked="checked"' : ''}><label>Bulk Order(>${tbl[3].moq}pcs)</label>`;
    document.querySelector('#tot table tbody').innerHTML = ht;

    rez();
  })
}

function dec2(v) { return Number((v).toFixed(2)); }
// store in od var 
function stork(t, c, s, v) { // type color size value
  //console.log(v);
  if (v != 0) {
    if (t in od) {//alert('type available') // check type available
      if (c in od[t]) {//alert('color available') // check color available
        od[t][c][s] = v; // add or update value
      }
      else { //alert('color not available') // if color not available
        od[t][c] = {}; // add color
        od[t][c][s] = v; // add value
      }
    } else { //alert('type not available') // if type not available
      od[t] = {}; /// add type
      od[t][c] = {};
      od[t][c][s] = v; // add value
    }
  } else {
    // remove zero value and empty color
    //console.log(od[t][c][s],v);
    delete od[t][c][s]
    //console.log((Object.keys(od[t][c]).length === 0))
    if (Object.keys(od[t][c]).length === 0) { delete od[t][c] }
    if (Object.keys(od[t]).length === 0) { delete od[t] }
  }
}
// end stork

// create new, clear old input 
async function newc() {
  document.getElementById('bulkc').checked = 0;
  let hjk = document.querySelectorAll('.city table td input');
  for await (let t of hjk) {
    if (t.value) { t.value = '' }
  }
  // document.querySelectorAll('.city table td input').forEach(t => t.value = '');

  // let ty1 = document.querySelectorAll(".city thead > tr.w3-blue-grey>th"); let ty11 = ty1.length;
  // for (let q = 1; q < ty11; q++) {
  //   let av = ty1[q];
  //   if (av.innerText != 'Total') { av.innerText = ''; }
  // }
  await newc2();
  document.querySelector("body > div.bar > div.w3-bar.w3-purple > button:nth-child(1)").click();
  document.getElementById('id01').style.display = 'block';
  document.getElementById('incn').value = '';
  document.getElementById('tch').value = '';
  document.getElementById('och').value = '';
  document.getElementById('dis').value = '';
  selg = '';
}

async function newc2() {
  // document.querySelector('#gall input').checked;
  let ty3 = document.querySelectorAll("#ptd input");
  for (let t of ty3) {
    if (t.value) { t.value = '' }
  }
  let ty4 = document.querySelectorAll("#ptd .w3-padding");
  for (let t of ty4) {
    t.innerHTML = '';
  }
  document.getElementById('pta').value = '';
  await newc1();
}

async function newc1() {
  for (let u in selod5) { let mx = document.getElementById(u); if (mx) { mx.checked = false; } }
  totqt = []; od = {}; zsr = {};
  ptd = {}; pk8 = 0; ptods = []; ptid = 0; selod5 = {};
}

// onload model get Customer Name and gst

function gonext() {
  if (!ptid && (ptid.length != 10)) {
    return alert('Enter Mobile No.')
  }
  console.log(ptid);
  // alert(document.getElementById('instock').checked);
  // if (document.getElementById('instock').checked) {
  //   let mypnm = document.getElementById('pnm');
  //   document.getElementById("incn").value = mypnm.value.replace(/\s+/g, ' ').trim(); mypnm.value = ""; // document.querySelector('#gall input[type="radio"]:checked').labels[0].innerText;
  // }
  let ur = document.getElementById("incn").value.replace(/\s+/g, ' ').trim();
  if (ur) {
    document.getElementById('u13').innerHTML = ur;
    document.getElementById('frt').innerHTML = '<strong>' + ur + '</strong>';
    // if (document.getElementById('q000')) {
    //   document.getElementById('gst').checked=true;
    // }
    let val5 = document.querySelector('#gall input[type="radio"]:checked').value;
    document.getElementById("gsel").options[val5].selected = true;
    document.getElementById('id01').style.display = 'none';
    // let ge5 = document.getElementById("gsel");
    // let ovalue=ge5.options[ge5.selectedIndex].value;
    //e.options[2].selected=true
  } else { alert('Customer Name Koun Likhega?'); }
}

async function omprint() {
  if (Object.keys(selod5).length) {
    let myW = window.open("", "_blank"); let winbody = myW.document.body;
    winbody.setAttribute('onclick', 'print()');
    let pd = "<style>body{margin: 5px 5px 0 5px}div.bd {padding: 10px 10px 0 10px;margin-bottom: 4px;overflow: auto;font-size: 18px;font-family: sans-serif;font-weight: 600;border-style: dashed;border-width: 0.5px;}table, th, td {border: 1px solid black;border-collapse: collapse;text-align: center;font-weight: 600;}#tblom1 {width: 100%;border: none;margin: 10px 0;}#tblom1  tbody tr:first-child{color:blue;background: #ffdfdd;}</style><div id='my56'></div>";
    winbody.addEventListener("click", () => myW.close());

    for (const p in selod5) {
      console.log(p)
      // let d=ods[p]; //;

      let d = await oddb.od.get(Number(p.slice(3)));
      let detailx = `<div><span style='float: left'>Bill To: ${d.cn}<br/>Total: ${d.tot + ', Offline'}</span><span style='float: right'>Invoice No.: ${d.id}<br/>Date: ${d.dt}</span></div><div style='break-after:page;'><table><tbody></tbody></table>`;
      pd += '<div class="bd">' + detailx + gentblhtml(d.od) + '</div></div>';
      document.querySelector('#' + p).checked = false;
      delete selod5[p];
    }
    selod5 = {}; secid = '';
    winbody.innerHTML = '<div>' + pd + '</div>';

  }
}

function gentblhtml(f) {
  let x;
  let type = `<table id='tblom1'>`;
  Object.keys(f).forEach(t => { // type loop
    let size = `<tbody><tr><th>${t}</th>`;
    let color = ''; let sizes = [];
    let cv = Object.keys(f[t]); cv = Object.keys(f[t][cv[0]])[0];
    // console.log(cv);
    if (x1.hasOwnProperty(cv)) { x = x1; sizes = x10; }
    else if (x2.hasOwnProperty(cv)) { x = x2; sizes = x20; }
    else if (x3.hasOwnProperty(cv)) { x = x3; sizes = x30; }

    sizes.forEach(s => size += `<th>${s}</th>`);
    size += `</tr>`;

    Object.keys(f[t]).forEach(c => { // color loop
      let indx = [];
      sizes.forEach(s => { // size loop
        indx[x[s]] = `<td>${f[t][c][s] || ''}</td>`;
      });
      color += `<tr><th>${c}</th>${indx.join('')}</tr>`;
    });

    type += `${size}${color}</tbody><tbody><tr><td style="border: none; background: white"><br></td></tr></tbody>`;
    // m += type;
  });
  return type + `</table>`;
}

// onclick New
function newocb() {
  document.getElementById('bnm7').style.display = 'block';
  document.getElementById('p78').style.display = 'none';
  document.getElementById('gstall').innerHTML = '';
  newc();
  document.getElementById('in1').checked = true;
  // new date today
  todaydate();
}

document.getElementById('tbldiv').addEventListener('input', function (event) {
  let tg = event.target;
  if (tg.tagName !== 'INPUT' || tg.type !== 'number') return;
  const v = tg.valueAsNumber || 0;
  const s = tg.name;
  const c = tg.closest('tr').getAttribute('title');
  const t = tg.closest('table').getAttribute('title');
  // console.log(t, c, s, v);
  stork(t, c, s, v);
  let tot = 0;
  if (od[t]) {
    Object.values(od[t]).forEach(i => Object.values(i).forEach(v => tot += v));
  }
  const tblno = tg.closest('table').id.split('tbl')[1];
  totqt[Number(tblno)] = tot;
  console.log(totqt, tot)
});

async function stockm() {
  document.getElementById('p78').style.display = 'block'
  document.getElementById('bnm7').style.display = 'none';
  newc2();
  await indb({ "name": "ods" });
  setTimeout(() => {
    document.getElementById('i88').innerHTML = "<style>#ghy99,#p781{color: #fff!important; background-color: #000!important;}</style>";
  }, 10);
  //  setTimeout(function () {document.getElementById('p781').click()}, 100);
  //document.getElementById('p781').click()
}

async function indb(d) {
  newc2();
  selg = d.name;
  document.getElementById('gstall').style.display = 'block';
  // selgo(selg);
  document.getElementById('gstall').innerHTML = "<div class='w3-blue-gray' style='display:flex;position: sticky;top: -50px;z-index: 6;'><div class='w3-bar-item w3-button w3-border-right' onclick='delod()'>Del</div><button class='w3-button w3-bar-item w3-border-right' onclick='omprint()'>Print</button>" + "<div id='st91' class='w3-dropdown-hover'> <button class='w3-button w3-border-right'>Status</button><div id='st92' class='w3-hide w3-bar-block w3-border'><a href='#' onclick='unpingen()' class='w3-bar-item w3-button'>NoneGenerate</a> <a href='#' onclick='unpin()' class='w3-bar-item w3-button'>None</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Payment Pending</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Under Production</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Printing</a><a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Part Quantity</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Pending</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>In Transit</a><a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>COD</a> <input onchange='chnot(1,this)' id='inp5' name='od84' class='w3-border w3-bar-item' type='text' style='padding:5px;display:none' placeholder='Write other...'></div></div>" + "<button onclick='printadd()' class='w3-button'>DTDC</button>" + "</div>" + "<div id='tre6'><ul id='oderli' class='w3-ul'></ul></div>";

  // status toggle
  document.getElementById('st91').addEventListener('click', (v) => {
    document.getElementById('st92').classList.toggle('w3-show');
  })
  // count total
  // document.getElementById('cout6').addEventListener("click", function () {
  //   let fromod1 = Number(localStorage.fromod);
  //   if (1 + Number(zxc) - Number(localStorage.fromod)) { couttot(fromod1, selg) }
  //   else { alert("No data to count total ") }
  // })
  console.log(selg)
  await getods(selg).then(() => {
    // selod5=JSON.parse(pinloc);//console.log(selg,pinloc)
    setTimeout(() => { pint(); }, 30);
  })

}

async function opodli(b) {
  let qwe5 = b.parentElement.id.slice(1);
  console.log(b.parentElement.tabIndex, qwe5);
  if (selg != 'inst') {
    // console.log(selg.slice(-1)+qwe5.slice(0,3));
    await mthdb(selg.slice(-1) + qwe5.slice(0, 6));
    await oddb.od.get(Number(qwe5)).then((doc) => { clickonod(b, qwe5, doc); });
  } else {
    await instdb.inst.get(Number(qwe5)).then((doc) => { clickonod(b, qwe5, doc); });
  }
}

function clickonod(b, qwe5, doc) {
  let isOpen = b.parentElement.nextSibling?.id == 'gentblx';
  document.getElementById('gentblx')?.remove();
  if (!isOpen) {
    b.parentElement.insertAdjacentHTML('afterend', "<div id='gentblx'><div style='font-weight: 600;display: flex;'><div class='w3-small w3-button w3-border-right w3-dark-grey' id='b" + qwe5 + "' onclick='editod(this)'>Edit</div><div onclick='copylink1(" + `"s${qwe5}"` + ")' class='w3-small w3-button w3-border-right w3-dark-grey'>Link</div><input id='trid' oninput='pmtdf(0)' type='text' placeholder='Transaction ID' style='width: 140px;'><input id='tram' oninput='pmtdf(1)' type='text' placeholder='Amount' style='width: 60px;'></div><div id='my55'>Sample Div</div></div>")
    odtbl(doc.od, 'tblom1', 'my55');
    let lv = JSON.parse(localStorage.getItem('trp'));
    document.getElementById('trid').value = lv[qwe5][0] || '';
    document.getElementById('tram').value = lv[qwe5][1] || '';
  }
}

(() => {
  if (localStorage.trp) {
    let lv = JSON.parse(localStorage.getItem('trp'));
    let k = Object.entries(lv);
    let pin = {};
    if (k.length > 200) {
      Object.keys(JSON.parse(localStorage.pin)).forEach((v) => {
        if (lv[v]) { pin[v] = lv[v] }
      })
      k = k.slice(-200);
      localStorage.setItem('trp', JSON.stringify({ ...Object.fromEntries(k), ...pin }));
    }
  } else { localStorage.setItem('trp', '{}'); }
})();

function pmtdf(d) {
  let lv = JSON.parse(localStorage.getItem('trp'));
  let id = document.getElementById('gentblx').previousSibling.id.slice(1);
  let in1 = document.getElementById('trid').value;
  let in2 = document.getElementById('tram').value;
  lv[id] = [in1, in2];
  console.log(lv);
  localStorage.setItem('trp', JSON.stringify({ ...lv }));
}

let x1 = { 'XS': 0, 'S': 1, 'M': 2, 'L': 3, 'XL': 4, 'XXL': 5 };
let x2 = { '36': 0, '38': 1, '40': 2, '42': 3, '44': 4, '46': 5 };
let x3 = { '20': 0, '22': 1, '24': 2, '26': 3, '28': 4, '30': 5, '32': 6, '34': 7 };
let x10 = Object.keys(x1), x20 = Object.keys(x2), x30 = Object.keys(x3);
function odtbl(f, b, c2) {
  let x;
  let type = `<table id='tblom1'>`;
  Object.keys(f).forEach(t => { // type loop
    let size = `<tbody><tr><th>${tbl[1]?.[t]?.[0] || t}</th>`;
    let color = ''; let sizes = [];
    let cv = Object.keys(f[t]); cv = Object.keys(f[t][cv[0]])[0];
    console.log(cv);
    if (x1.hasOwnProperty(cv)) { x = x1; sizes = x10; }
    else if (x2.hasOwnProperty(cv)) { x = x2; sizes = x20; }
    else if (x3.hasOwnProperty(cv)) { x = x3; sizes = x30; }

    sizes.forEach(s => size += `<th>${s}</th>`);
    size += `</tr>`;

    Object.keys(f[t]).forEach(c => { // color loop
      let indx = [];
      sizes.forEach(s => { // size loop
        indx[x[s]] = `<td>${f[t][c][s] || ''}</td>`;
      });
      color += `<tr><th>${c}</th>${indx.join('')}</tr>`;
    });

    type += `${size}${color}</tbody>`;
    // m += type;
  });
  document.getElementById(c2).innerHTML = type + `</table>`;
}

let secid = '';
function selod(h) {
  let crrid = h.parentElement.parentElement.id;
  if ((secid != '') && (secid != crrid)) {
    document.querySelectorAll('#' + secid + '> li input').forEach((v) => {
      if (v.checked) {
        v.click();
      }
    });
  }

  let er5 = h.id;
  if (h.checked) {
    selod5[er5] = er5;
    secid = crrid;
  } else {
    delete selod5[er5];
    !Object.keys(selod5).length && (secid = '');
  }
  console.log(selod5, secid);
}

let pd2;
let dfg6 = 0;
let tyg = document.querySelectorAll('#id01 .w3-modal-content button');
tyg.forEach(omak)
function omak(n, i, a) {
  n.addEventListener("click", function () {
    let idrr = '';
    if (n.id === 'ghy99' || n.id === 'p781' || n.id === 'p782' || n.id === 'p783' || n.id === 'p784') { idrr = '#' + n.id + ',' + '#ghy99,' }
    if (n.id) {
      if (n.id != 'lastimgc') {
        document.getElementById('i88').innerHTML = "<style>" + idrr + "#" + n.id + "{color: #fff!important; background-color: #000!important;}</style>";
      }
    } else {
      dfg6++;
      n.setAttribute('id', 'ghy' + dfg6)
      document.getElementById('i88').innerHTML = "<style>#ghy" + dfg6 + "{color: #fff!important; background-color: #000!important;}</style>";
    }
  })
}

// export tabletocsv
function tabletcsv(table_id, oderno, separator = ',') {
  // Select rows from table_id
  let rows = document.querySelectorAll('table#' + table_id + ' tr'); let rows1 = rows.length;
  // Construct csv
  let csv = [];
  for (let i = 0; i < rows1; i++) {
    let row = [], cols = rows[i].querySelectorAll('td, th'); let cols1 = cols.length;
    for (let j = 0; j < cols1; j++) {
      // Clean innertext to remove multiple spaces and jumpline (break csv)
      let data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
      data = data.replace(/"/g, '""');
      // Push escaped string
      row.push('"' + data + '"');
    }
    csv.push(row.join(separator));
  }
  let csv_string = csv.join('\n');
  let filename = oderno + '.csv';
  let link9 = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string);
  // Download it
  download(link9, filename);
  let acsv = document.getElementById('acsv'); acsv.style = 'color:blue';
  acsv.innerText = 'Download'; acsv.setAttribute('target', '_blank');
  acsv.href = link9; acsv.setAttribute('download', filename);
}

// pin status
async function chnot(b, v) {
  let dq = document.querySelector('#' + secid);
  let sel = Object.keys(selod5);
  // let cd='';
  if (sel.length) {
    //   sel.forEach((fv,i)=>{
    //     cd+=(i+1)+'- '+dq.querySelector('#'+fv).nextElementSibling.innerText+'\n';
    //   });

    selgo(selg);//pint(1);
    let op5 = JSON.parse(pinloc);
    sel.forEach((fv, i) => {
      console.log(fv, b, v);
      if (!secid.match(/\w\d{3}/g)) {
        if (b === 1) {
          op5[fv] = v.value;
          dq.querySelector('#vtag [name=' + fv + ']').innerHTML = v.value;
          v.value = '';
        } else {
          op5[fv] = v.innerText;
          dq.querySelector('#vtag [name=' + fv + ']').innerText = v.innerText;
        }
      } else {
        op5[fv] = v.innerText;
      }
      dq.querySelector('#' + fv).checked = false;
    });
    selpin(selg);
    localStorage.setItem(pinz, JSON.stringify(op5));
    let vkz5 = { p: "3", "g": selg, od: { ...op5 } };
    if (secid.match(/\w\d{3}/g)) {
      await indb({ name: selg }).then(() => document.getElementById('st92').classList.toggle('w3-show'));
    }
    selod5 = {}; secid = '';
    await sendd(urli, vkz5, 'pin');
    snackbar('Status changed to ' + v.innerText, 500);
  } else { alert('Select order first.') }
}

// pin onload
async function pint(v) {
  selgo(selg);//let aul=document.getElementById('oderli');
  let j = JSON.parse(pinloc);
  for (const t in j) {
    let pxn = document.getElementById(t).parentNode;
    pxn.querySelector('#vtag [name=' + t + ']').innerText = j[t];
    // console.log(t,pj);
    let pj = Number(pxn.getAttribute("tabindex"));
    if (pj > 0) {
      await db.pt.get(pj).then((v) => {
        if (v) {
          !!(v.add) || (pxn.style.color = 'blue'); // if add=='' txt color blue
          // if (v.gst) {
          //   let zw = pxn.querySelector('span[onclick] span');
          //   zw.innerText = 'GST';
          //   zw.style.padding = '';
          // }
        } else {
          (pxn.style.color = 'red'); // if no party found txt color red
        }
      });
    }
  }
  for (let u in selod5) { document.getElementById(u).checked = false; } selod5 = {};
}

function unpin() {
  let sel = Object.keys(selod5);
  // let cd='';
  // sel.forEach((fv,i)=>{
  //   cd+=(i+1)+'- '+document.querySelector('#oderli '+'#'+fv).nextElementSibling.innerText+'\n';
  // });
  if (sel.length) {
    selgo(selg);
    let mk5 = JSON.parse(pinloc);
    for (const t in selod5) {
      let px1 = document.getElementById(t);
      let p = px1.parentNode; px1.checked = false;
      if (p.querySelector('span+span span').tabIndex != 0) {
        snackbar(px1.nextElementSibling.innerText + ' Payment Pending', 1000)
        continue;
      }
      p.style.background = '#fff';
      document.querySelector('#vtag [name=' + t + ']').innerText = '';
      delete mk5[t];
    }
    selpin(selg);
    localStorage.setItem(pinz, JSON.stringify(mk5));
    selod5 = {};
    let vkz6 = { p: "3", "g": selg, od: { ...mk5 } };
    snackbar('Unpined', 500);
    sendd(urli, vkz6, 'unpin');
  } else { alert('Select order first.') }
}

const getnmm = () => {
  return new Promise(async (rez, rej) => {
    try {
      let p = await fetch('https://e8xi8frl24.execute-api.ap-south-1.amazonaws.com/v1/nos/?zxc=' + localStorage.gre)
      p = await p.json();
      rez(Number(p.v));
    } catch (error) {
      alert('Error in ghd() fn-');
      rej("no data");
    }
  })
}

function unpingen() {
  new Promise(async (rez, rej) => {
    let sel = Object.keys(selod5);
    if (sel.length) {
      selgo(selg);
      let mk5 = JSON.parse(pinloc);
      let t = sel.pop();
      let px1 = document.getElementById(t);
      let p = px1.parentNode; px1.checked = false;
      if (p.querySelector('span+span span').tabIndex != 0) { rez(snackbar('Payment Pending', 1000)); return }
      p.style.background = 'purple!important'; //px1.checked = false;
      document.querySelector('#vtag [name=' + t + ']').innerText = '';
      delete mk5[t];
      selpin(selg);
      localStorage.setItem(pinz, JSON.stringify(mk5));
      for (let u in selod5) { document.getElementById(u).checked = false; } selod5 = {};
      let d = t.slice(3);
      await mthdb(selg.slice(-1) + d.slice(0, 6));
      let ord = await oddb.od.get(Number(d)); let pt = await db.pt.get(ord.pt);
      if (ord.tot && !ord?.eid) {
        if (localStorage.gre === '555') { } else {
          let m = await getnmm();
          ord.eid = String(m); await oddb.od.put(ord, ord.id);
        }
      }
      let vkz6 = { p: "31", "g": selg, "od": ord, "pt": pt, pin: { ...mk5 } };
      let res = await sendd(urli, vkz6, 'unpin');
      if (res && res?.pdf) {
        ord.pdf = res.pdf;
        await oddb.od.put(ord, ord.id); //(Number(d));
      }
      snackbar('Unpined and E-invoice Generated', 1300);
      rez();
    } else { alert('Select order first.') }
  })
}

var pinloc = '{}';
function selgo(g) {
  switch (g) {
    case 'ods':
      pinloc = localStorage.pin;
      break;
    case 'odt':
      pinloc = localStorage.pint;
      break;
    case 'odk':
      pinloc = localStorage.pink;
      break;
    case 'odpd':
      pinloc = localStorage.pinpd;
      break;
    case 'inst':
      pinloc = localStorage.inst;
      break;
  }
}
var pinz = '';
function selpin(g) {
  switch (g) {
    case 'ods':
      pinz = 'pin'
      break;

    case 'odt':
      pinz = 'pint'
      break;

    case 'odk':
      pinz = 'pink'
      break;

    case 'odpd':
      pinz = 'pinpd'
      break;

    case 'inst':
      pinz = 'inst'
      break;
    default:
      break;
  }
}

// onload set last image
let tt5 = JSON.parse(localStorage.imglastod);
document.getElementById('lastodimg').src = tt5.im5;
document.getElementById('lastodcn').innerHTML = tt5.cn;

document.getElementById('lastimgc').addEventListener('click', async (v) => {
  let blobx = await makeblob(tt5.im5);
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blobx }),]);
  await snackbar(tt5.cn.match(/[^\d+\s].+/g)[0] + " copied", 500);
});

///base64 to blob
async function makeblob(dataURL) {
  const BASE64_MARKER = ';base64,';
  const parts = dataURL.split(BASE64_MARKER);
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

async function snackbar(txt, time) {
  let x = document.getElementById("snackbar");
  x.style.display = ''; x.innerHTML = txt;
  setTimeout(() => { x.style.display = 'none'; }, time);
}

window.addEventListener('online', () => {
  document.body.classList.remove("w3-grayscale-min");
  snackbar("Online", 500);
});

window.addEventListener('offline', () => {
  document.body.classList.add('w3-grayscale-min');
  snackbar("Offline", 500);
});

window.navigator.onLine || document.body.classList.add('w3-grayscale-min');