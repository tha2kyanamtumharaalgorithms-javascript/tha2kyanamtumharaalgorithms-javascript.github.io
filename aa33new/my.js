
var doc = document, zzz = (s, o = doc) => o.querySelectorAll(s), zz = (s, o = doc) => o.querySelector(s), zc = console.log.bind(doc);
// get all ods list
// let tbl = [{ "Oversize 210gsm": { "Black": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "White": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "Lavender": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "Beige": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "Red": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "Sage Green": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "Brown": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "Off-white": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "Orange": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 }, "Navy": { "S": 185, "M": 185, "L": 185, "XL": 185, "XXL": 185 } }, "Oversize 240gsm": { "Black": { "S": 195, "M": 195, "L": 195, "XL": 195, "XXL": 195 }, "White": { "S": 195, "M": 195, "L": 195, "XL": 195, "XXL": 195 }, "Maroon": { "S": 195, "M": 195, "L": 195, "XL": 195, "XXL": 195 } }, "Kids Rneck": { "Black": { "20": 110, "22": 110, "24": 110, "26": 110, "28": 120, "30": 120, "32": 120, "34": 120 }, "White": { "20": 110, "22": 110, "24": 110, "26": 110, "28": 120, "30": 120, "32": 120, "34": 120 }, "Red": { "20": 110, "22": 110, "24": 110, "26": 110, "28": 120, "30": 120, "32": 120, "34": 120 }, "Baby Pink": { "20": 110, "22": 110, "24": 110, "26": 110, "28": 120, "30": 120, "32": 120, "34": 120 } }, "Biowash Rneck": { "Black": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "White": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Maroon": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Navy": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Mustard Yellow": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Red": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Bottle Green": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Beige": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Royal Blue": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Lavender": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Sky": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Grey": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Bhagwa": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 }, "Army Green": { "36": 145, "38": 145, "40": 145, "42": 145, "44": 150, "46": 150 } }, "Sublimation tshirt": { "White": { "36": 115, "38": 115, "40": 115, "42": 115, "44": 120, "46": 120 } }, "Gym vest": { "Black": { "36": 125, "38": 125, "40": 125, "42": 125, "44": 130, "46": 130 }, "White": { "36": 125, "38": 125, "40": 125, "42": 125, "44": 130, "46": 130 }, "Navy": { "36": 125, "38": 125, "40": 125, "42": 125, "44": 130, "46": 130 }, "Yellow": { "36": 125, "38": 125, "40": 125, "42": 125, "44": 130, "46": 130 } }, "Oversize 180gsm": { "Black": { "S": 175, "M": 175, "L": 175, "XL": 175, "XXL": 175 }, "White": { "S": 175, "M": 175, "L": 175, "XL": 175, "XXL": 175 }, "Lavender": { "S": 175, "M": 175, "L": 175, "XL": 175, "XXL": 175 }, "Red": { "S": 175, "M": 175, "L": 175, "XL": 175, "XXL": 175 } }, "Cotton Polo": { "Black": { "36": 180, "38": 180, "40": 180, "42": 180, "44": 180, "46": 185 }, "White": { "36": 180, "38": 180, "40": 180, "42": 180, "44": 180, "46": 185 }, "Navy": { "36": 180, "38": 180, "40": 180, "42": 180, "44": 180, "46": 185 }, "Grey": { "36": 180, "38": 180, "40": 180, "42": 180, "44": 180, "46": 185 }, "Maroon": { "36": 180, "38": 180, "40": 180, "42": 180, "44": 180, "46": 185 }, "Charcol": { "36": 180, "38": 180, "40": 180, "42": 180, "44": 180, "46": 185 }, "Anthra": { "36": 180, "38": 180, "40": 180, "42": 180, "44": 180, "46": 185 } }, "Non Bio Rneck": { "Black": { "36": 102, "38": 102, "40": 102, "42": 102, "44": 107, "46": 107 } }, "Premium Polo": { "Black": { "36": 225, "38": 225, "40": 225, "42": 225, "44": 225, "46": 230 }, "White": { "36": 225, "38": 225, "40": 225, "42": 225, "44": 225, "46": 230 }, "Navy": { "36": 225, "38": 225, "40": 225, "42": 225, "44": 225, "46": 230 }, "Maroon": { "36": 225, "38": 225, "40": 225, "42": 225, "44": 225, "46": 230 } }, "Hoodie 320gsm-1": { "Black": { "S": 295, "M": 295, "L": 295, "XL": 295, "XXL": 305 }, "White": { "S": 295, "M": 295, "L": 295, "XL": 295, "XXL": 305 }, "Navy": { "S": 295, "M": 295, "L": 295, "XL": 295, "XXL": 305 }, "Grey": { "S": 295, "M": 295, "L": 295, "XL": 295, "XXL": 305 } }, "Hoodie 320gsm-2": { "Baby pink": { "S": 325, "M": 325, "L": 325, "XL": 325, "XXL": 335 }, "Army Green": { "S": 325, "M": 325, "L": 325, "XL": 325, "XXL": 335 }, "Off-white": { "S": 325, "M": 325, "L": 325, "XL": 325, "XXL": 335 }, "Maroon": { "S": 325, "M": 325, "L": 325, "XL": 325, "XXL": 335 } }, "Sweatshirt": { "Black": { "S": 220, "M": 220, "L": 220, "XL": 220, "XXL": 230 }, "White": { "S": 220, "M": 220, "L": 220, "XL": 220, "XXL": 230 }, "Navy": { "S": 220, "M": 220, "L": 220, "XL": 220, "XXL": 230 } }, "Varsity": { "Black": { "XS": 335, "S": 335, "M": 335, "L": 335, "XL": 335, "XXL": 335 } }, "Shorts": { "Black": { "XS": 205, "S": 205, "M": 205, "L": 205, "XL": 205 }, "Off-white": { "XS": 205, "S": 205, "M": 205, "L": 205, "XL": 205 }, "Lavender": { "XS": 205, "S": 205, "M": 205, "L": 205, "XL": 205 }, "Biege": { "XS": 205, "S": 205, "M": 205, "L": 205, "XL": 205 }, "Sage Green": { "XS": 205, "S": 205, "M": 205, "L": 205, "XL": 205 } }, "Pant": { "Black": { "XS": 255, "S": 255, "M": 255, "L": 255, "XL": 255 } }, "Dropsho Hoodie 430gsm": { "Black": { "S": 380, "M": 380, "L": 380, "XL": 380, "XXL": 390 } } }, { "Oversize 210gsm": ["OS210", "Oversized Drop-shoulder, 210gsm, Terry cotton/Loopknit Heavy Gauge, 100% Cotton Supercombed Premium Quality Red Lable Fabric"], "Oversize 240gsm": ["OS240", "Oversized Drop-shoulder, 240gsm, Terry cotton/Loopknit Heavy Gauge, 100% Cotton Supercombed Premium Quality Red Lable Fabric"], "Kids Rneck": ["Kids", "True Biowash Kids Round neck, 180gsm, 100% Cotton Supercombed Premium Quality Red Lable Fabric"], "Biowash Rneck": ["Bio RN", "Regular Fit, True Biowash Round neck, 180gsm, 100% Cotton Supercombed Premium Quality Red Lable Fabric"], "Sublimation tshirt": ["Sublimation", "Regular Fit Round neck, 200gsm, Cotton Feel Polyester Sublimation tshirt, Premium Quality Sarina Knitting Type"], "Gym vest": ["Vest", "Regular Fit True Biowash Tank Top, 180gsm, 100% Cotton Supercombed Premium Quality Red Lable Fabric"], "Oversize 180gsm": ["OS180", "Oversized Drop-shoulder 180gsm, 100% Cotton Supercombed Premium Quality Red Lable Fabric"], "Cotton Polo": ["Polo", "Cotton Matty Polo neck, 220gsm, 88% Cotton, 12% Polyester"], "Non Bio Rneck": ["NBio", "Non Bio Round neck, 180gsm, 88% Cotton, 12% Polyester"], "Premium Polo": ["Bio Polo", "Most Premium Honeycomb Polo, 220gsm, 100% Cotton Supercombed Red Lable Fabric"], "Hoodie 320gsm-1": ["Hood320-1", "Non-zipper Hoodie, 320gsm, Cotton Brushed Loopknit, 88% cotton, 12% polyester"], "Hoodie 320gsm-2": ["Hood320-2", "Non-zipper Hoodie, 320gsm, Cotton Brushed Loopknit, 88% cotton, 12% polyester"], "Sweatshirt": ["Sweatshirt", "Sweatshirt, 320gsm, Cotton Brushed Loopknit, 88% cotton, 12% polyester"], "Varsity": ["Varsity", "Varsity Jacket, 320gsm, Cotton Brushed Loopknit, White Sleeve/Black Body, 88% cotton, 12% polyester"], "Shorts": ["Shorts", "Oversized Drop-shoulder, 210gsm, Terry cotton/Loopknit Heavy Gauge, 100% Cotton Supercombed Premium Quality Red Lable Fabric"], "Pant": ["Pant", "Oversized Drop-shoulder, 210gsm, Terry cotton/Loopknit Heavy Gauge, 100% Cotton Supercombed Premium Quality Red Lable Fabric"], "Dropsho Hoodie 430gsm": ["Hood430", "Most Heavy Non-zipper Hoodie, 430gsm, Cotton Brushed Loopknit, 88% cotton, 12% polyester"] }, { "Oversize 210gsm": 240, "Oversize 240gsm": 250, "Kids Rneck": 140, "Biowash Rneck": 190, "Sublimation tshirt": 135, "Gym vest": 170, "Oversize 180gsm": 200, "Cotton Polo": 215, "Non Bio Rneck": 135, "Premium Polo": 270, "Hoodie 320gsm-1": 330, "Hoodie 320gsm-2": 385, "Sweatshirt": 265, "Varsity": 380, "Shorts": 245, "Pant": 295, "Dropsho Hoodie 430gsm": 430 }, { "moq": 15 }, { "Oversize 210gsm": 0.27, "Oversize 240gsm": 0.27, "Kids Rneck": 0.16, "Biowash Rneck": 0.21, "Sublimation tshirt": 0.21, "Gym vest": 0.18, "Oversize 180gsm": 0.26, "Cotton Polo": 0.26, "Non Bio Rneck": 0.21, "Premium Polo": 0.26, "Hoodie 320gsm-1": 0.56, "Hoodie 320gsm-2": 0.56, "Sweatshirt": 0.46, "Varsity": 0.56, "Shorts": 0.25, "Pant": 0.5, "Dropsho Hoodie 430gsm": 0.75 }, { "Oversize 210gsm": "/d/1-GEQ5CGKgngbeximSerhnkD_2xyOj-FuvyQZhlPG3Dk", "Oversize 240gsm": "/d/e/2PACX-1vTwoQtM14uhd4-3HM7q6lmbFGDD8IJrbxfMSGHAdcT3yR8Yv3XZBBgedc0TKMLaFpQot9kUt8u2KYFB", "Kids Rneck": "/d/1fHmAJuC1mUIVDlJUGfsJATUYrtFFRsZSHuj3qynupmc", "Biowash Rneck": "/d/1MCJxT2_EhphgNGgXjygNS9n58P3tJgavzDzmKfUNQB0", "Sublimation tshirt": "/d/1flL8p0VuI5twjdg7qM54wlJqAJkJzPlNKu1PERSbOtE", "Gym vest": "/d/1UJsS5Hz0oBBW-Xy8K0HeSjcMfPkS1L8zIo4_rQcuXIo", "Oversize 180gsm": "/d/1ZSWvKG4ZbGk2KtTKdunLvVfCDB3l_EwYXDVAZcKKIXs", "Cotton Polo": "/d/1D0FRyvgSLbBOmQLYzQfFxru1ggHtJJnUt6LL9LiTJy0", "Non Bio Rneck": "/d/1ru4nIzCmrIIZInYCBpBasU9wxbF4gPYb89OF_zc89jw", "Premium Polo": "/d/1iTL0Hh77Eo_XlrKsIkPOcM2VpBegXbLpextEKLQhVs4", "Hoodie 320gsm-1": "/d/1S7a3FESEvHue-f9xHGDPMws6fE_JF9e15PtVrMSmG9s", "Hoodie 320gsm-2": "/d/1bZdvS00WpvB-10oAhea451upFGabmEB_n-dZnzENRXI", "Sweatshirt": "/d/1UbsXeU0ykL8SVWzfuMT2-84ZFrizxoUTElEkoZ-g4A4", "Varsity": "/d/1Xn3Eqq1MsfvohHHhzyeGbSDx02WeVh5f0VVk3EXCzW0", "Shorts": "/d/1afUhzGUsjkTeVSoNkWbN4YJIUaoIPNXns18VGp2Lpig", "Pant": "/d/1cg7KRNYqae1w8P8-zOjuNsg2tirt8cW_fy54LtVSuI4", "Dropsho Hoodie 430gsm": "/d/119FQyCCKCqc2Si878vU_poGgxukTEFFUAXz1xU1Jsyo", "Size Chart": "/d/1tGTUjrdKD7RrxB-B2KVAkYKluSxmh3ePTvf0oIXMLT8" }, { "gst": 5 }, { "scrolltxt": "1,98,625 pcs sold in previous month ðŸš€ 1500+ quantity, extra 2rs/pc discount." }, { "pricingheadline": "1500+ quantity, extra 2rs/pc discount." }, [["Online Purchase Discount", 2], ["Bulk Discount", 0]], { "Oversize 180gsm": { "Lavender": "S,M,L,XL", "Red": "S,M,L,XL", "White": "XL,XXL" }, "Cotton Polo": { "Anthra": "36,40,42,46,44" }, "Shorts": { "Sage Green": "XS", "Black": "L,M" }, "Gym vest": { "White": "46,42,38,44,40", "Navy": "42,40,46", "Yellow": "44" }, "Pant": { "Black": "L,M,XL" }, "Hoodie 320gsm-2": { "Off-white": "XXL,S,L" }, "Kids Rneck": { "Red": "34,30,28" }, "Premium Polo": { "Navy": "40,42" }, "Oversize 240gsm": { "Black": "XXL" }, "Biowash Rneck": { "Army Green": "36", "Red": "46" } }]

function loadScript(url) {
    const sc = document.createElement('script');
    sc.src = url;sc.async = true;
    return new Promise((res, rej) => {
        sc.onload = () => res(sc);
        sc.onerror = () => {sc.remove();rej(new Error(`Failed to load: ${url}`));};
        document.head.appendChild(sc);
    });
}
// loadScript('https://example.com/script.js')
//   .then(script => console.log('Loaded:', script))
//     .catch(error => console.error(error));

async function getods(gd) {
  try {
    selgo(gd);
    let j = JSON.parse(pinloc); let vb = '';
    let hmtl0 = '';
    for (let k in j) {
      let pf = k.slice(2, 6); let id = Number(k.slice(3));
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
        let gstr = "<span style='padding: 0 1.55em'></span>";
        let inp = "<input onclick='selod(this)' id='ods" + i.id + "' class='w3-check' type='checkbox'>";
        let vtag = "<span id='vtag' ><span name=" + 'ods' + i.id + ">" + "</span></span>" + book[1];
        hmtl0 = "<li " + book[0] + " id=s" + i.id + " " + "tabindex=" + i.pt + " " + ifz + ">" + inp + ' ' + "<b onclick='goadd(" + i.pt + ',' + i.id + ")'>" + i.id + '. ' + i.cn + '</b>' + vtag + "<span onclick='opodli(this)'>" + i.tot + ' ' + gstr + ' ' + i.dt.slice(0, 6) + "</span></li>" + hmtl0;
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
let bulkdb = new Dexie("bulk"); bulkdb.version(1).stores({ bk: "id" });
let dldb = new Dexie("dldb"); dldb.version(1).stores({ dl: "id,st" });
var selod5 = {}; var zsr = {}; let selg; let odimgbob;
//var om=document.getElementById("tb").innerHTML;
var od = {}; var zxc = 0;
if (localStorage.clickcount) { zxc = localStorage.clickcount; };

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
  if (localStorage.m != (d.getMonth() + 1)) {
    localStorage.clickcount = 0; zxc = 0; localStorage.m = (d.getMonth() + 1);
    localStorage.fromod = 0;
  }
}
todaydate();
let oddb;
async function mthdb(m) {
  oddb = new Dexie(m);
  oddb.version(1).stores({ od: "id,dt,bulk" });
}

var urli = localStorage.gr5;
let gststate = { 01: "JAMMU AND KASHMIR", 02: "HIMACHAL PRADESH", 03: "PUNJAB", 04: "CHANDIGARH", 05: "UTTARAKHAND", 06: "HARYANA", 07: "DELHI", 08: "RAJASTHAN", 09: "UTTAR PRADESH", 10: "BIHAR", 11: "SIKKIM", 12: "ARUNACHAL PRADESH", 13: "NAGALAND", 14: "MANIPUR", 15: "MIZORAM", 16: "TRIPURA", 17: "MEGHALAYA", 18: "ASSAM", 19: "WEST BENGAL", 20: "JHARKHAND", 21: "ODISHA", 22: "CHATTISGARH", 23: "MADHYA PRADESH", 24: "GUJARAT", 26: "DADRA AND NAGAR HAVELI AND DAMAN AND DIU (NEWLY MERGED UT)", 27: "MAHARASHTRA", 28: "ANDHRA PRADESH(BEFORE DIVISION)", 29: "KARNATAKA", 30: "GOA", 31: "LAKSHADWEEP", 32: "KERALA", 33: "TAMIL NADU", 34: "PUDUCHERRY", 35: "ANDAMAN AND NICOBAR ISLANDS", 36: "TELANGANA", 37: "ANDHRA PRADESH", 38: "LADAKH", 97: "OTHER TERRITORY", 99: "CENTRE JURISDICTION" };

// change type name
const typep7 = { "Bio": "RN Bio", "NBio": "RN Non Bio", "Polo": "Polo", "OS210": "Oversize 210", "Varsity": "Varsity", "OS180": "Oversize 180", "Hood": "Hoodie", "Sweat": "Sweatshirt", "Kids": "Kids RN", "Vest": "Vest", "PrePolo": "Premium Polo", "Shorts": "Shorts", "Pant": "Pant", "Hood430": "Hood430", "Hood2": "Hood2", "O240S": "Oversize 240gsm" };

// for image bill
const typep77 = { "Bio": "Bio-RN", "NBio": "Cotton-RN", "Polo": "Polo", "OS210": "Dropshoulder 210gsm", "Varsity": "Varsity Jacket", "OS180": "Dropshoulder 180gsm", "Hood": "Hoodie", "Sweat": "Sweatshirt", "Kids": "Kids-RN", "Vest": "Vest", "PrePolo": "Premium Polo", "Shorts": "Shorts", "Pant": "Pant", "Hood430": "Hood430", "Hood2": "Hood2", "O240S": "Oversize 240gsm" };
// typep7[variable] //console.log(typep7["Bio"]);

// var ods1 = { Bio: { Black: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, White: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Maroon: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Navy: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, "Mustard Yellow": { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Red: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, "Bottle Green": { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Beige: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, "Royal Blue": { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Lavender: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Sky: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Grey: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Bhagwa: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, "Army Green": { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 } }, NBio: { Black: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, White: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Navy: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Grey: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Charcol: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 } }, Polo: { Black: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, White: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Navy: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Grey: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Maroon: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Anthra: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Red: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Charcol: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Royal: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Orange: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, "Sky Blue": { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, "Flag Green": { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, "Reliance Green": { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, "Golden Yellow": { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 } }, "OS210": { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, White: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Lavender: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Beige: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Red: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Sage Green": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Brown: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Off-white": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Orange": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Navy: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } }, Varsity: { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } }, "OS180": { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, White: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Brown: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Sage Green": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Lavender: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Red: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } }, Hood: { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, White: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Navy: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Grey: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } }, Sweat: { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, White: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Navy: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Grey: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } }, Kids: { Black: { 20: 0, 22: 0, 24: 0, 26: 0, 28: 0, 30: 0, 32: 0, 34: 0 }, White: { 20: 0, 22: 0, 24: 0, 26: 0, 28: 0, 30: 0, 32: 0, 34: 0 }, "Baby Pink": { 20: 0, 22: 0, 24: 0, 26: 0, 28: 0, 30: 0, 32: 0, 34: 0 }, Red: { 20: 0, 22: 0, 24: 0, 26: 0, 28: 0, 30: 0, 32: 0, 34: 0 } }, Vest: { Black: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, White: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Navy: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Yellow: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 } }, PrePolo: { Black: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, White: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Navy: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 }, Maroon: { 36: 0, 38: 0, 40: 0, 42: 0, 44: 0, 46: 0 } } };

// ods1.Shorts = { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Off-white": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Lavender: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Biege: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Sage Green": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } };

// ods1.Pant = { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } };

// ods1.Hood430 = { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } };
// //Baby Pink, Army Green, Off-white, Maroon
// ods1.Hood2 = { "Baby Pink": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Army Green": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Off-white": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, "Maroon": { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } };

// ods1.O240S = { Black: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, White: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, Maroon: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 } };

// var pki = {
//   "types": [{ "type": "Bio", "color": ["Black", "White", "Maroon", "Navy", "Mustard Yellow", "Red", "Bottle Green", "Beige", "Royal Blue", "Lavender", "Sky", "Grey", "Bhagwa", "Army Green"], "size": [36, 38, 40, 42, 44, 46], "price": 155 }, { "type": "NBio", "color": ["Black", "White", "Navy", "Grey", "Charcol"], "size": [36, 38, 40, 42, 44, 46], "price": 105 }, { "type": "Polo", "color": ["Black", "White", "Navy", "Grey", "Maroon", "Anthra", "Red", "Charcol", "Royal", "Orange", "Sky Blue", "Flag Green", "Reliance Green", "Golden Yellow"], "size": [36, 38, 40, 42, 44, 46], "price": 190 }, { "type": "OS210", "color": ["Black", "White", "Lavender", "Beige", "Red", "Sage Green", "Brown", "Off-white", "Orange", "Navy"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 }, { "type": "Varsity", "color": ["Black"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 },
//   { "type": "OS180", "color": ["Black", "White", "Brown", "Sage Green", "Lavender", "Red"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 }, { "type": "Hood", "color": ["Black", "White", "Navy", "Grey"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 }, { "type": "Sweat", "color": ["Black", "White", "Navy", "Grey"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 }, { "type": "Kids", "color": ["Black", "White", "Baby Pink", "Red"], "size": ["20", "22", "24", "26", "28", "30", "32", "34"], "price": 190 }, { "type": "Vest", "color": ["Black", "White", "Navy", "Yellow"], "size": [36, 38, 40, 42, 44, 46], "price": 155 }, { "type": "PrePolo", "color": ["Black", "White", "Navy", "Maroon"], "size": [36, 38, 40, 42, 44, 46], "price": 155 }, { "type": "Shorts", "color": ["Black", "Off-white", "Lavender", "Biege", "Sage Green"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 },
//   { "type": "Pant", "color": ["Black"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 }, { "type": "Hood430", "color": ["Black"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 }, { "type": "Hood2", "color": ["Baby Pink", "Army Green", "Off-white", "Maroon"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 }, { "type": "O240S", "color": ["Black", "White", "Maroon"], "size": ["XS", "S", "M", "L", "XL", "XXL"], "price": 190 }]
// };
// console.log(pki.types[0]); console.log(pki.types[0].type); console.log(pki.types[0].color[0]); console.log(pki.types[0].size[0]);
// let intp;
// if ((navigator.platform) === 'iPhone') {
//   intp = "pattern='[0-9]*' type='text'";
// } else { intp = "type='number'"; }
// //console.log('intp:',intp);

//gen. table start // pdbtn // html33
// function gentbl(m) {
//   // console.log(m);
//   let c11 = tbl[1]?.[pki.types[m].type]?.[0];
//   let tb1 = "<table id='tbl" + m + "' class='w3-table-all pky w3-centered'><thead>";

//   let size = "";
//   // let tk = "";
//   for (let i = 0; i < pki.types[m].size.length; i++) {
//     size += "<th>" + pki.types[m].size[i] + "</th>";
//   }

//   let sizel = '';//let unx=tbl[10]?.[t]?.[c]?.split(',')||'';
//   for (let l in pki.types[m].size) {
//     // console.log("" + " " + pki.types[m].size[l]);
//     console.log(m,pki.types[m],pki.types[m].size,l,pki.types[m].size[l])
//     sizel += `<td><input class='w3-input' name='${pki.types[m].size[l]}' ${intp}></td>`;
//   }

//   let colorl = '';
//   for (let i in pki.types[m].color) {
//     colorl += "<tr title='" + pki.types[m].color[i] + "' class='oj'><th>" + pki.types[m].color[i] + "</th>" + sizel + "</tr>";
//   }
//   //console.log(c11);
//   let tblo = tb1 + "<tr id='trth' class='w3-red'></th><th class='w3-blue'>" + c11 + "</th>" + size + "</tr></thead><tbody title='" + pki.types[m].type + "'>" + colorl + "</tbody></table>";
//   //console.log(colorl,"mymymy",tblo);
//   document.getElementById("type" + m).innerHTML = tblo;
//   /// make table contentEditable
//   //  let olo=document.querySelectorAll("#tbl"+m+" td");
//   // for (let i = 0; i < olo.length; i++) {
//   //     olo[i].contentEditable=true;
//   //     } 
// }
// //gen. table End

// let tbl1 = tbl[0];let pc={};
// let pki = {
//   "types": Object.keys(tbl1).map(key => {
//     pc[key] = pc[key] || {};
//     let colors = Object.keys(tbl1[key]);
//     let sizes = Object.keys(tbl1[key][colors[0]]);
//     sizes.forEach(v=>{
//        const p = tbl1[key][colors[0]][v];
//         pc[key][p] = pc[key][p] || [];
//         pc[key][p].push(v);
//     })
//      // let price = tbl1[key][colors[0]][sizes[0]];
//     console.log(sizes,pc)
//     return {
//       "type": key,
//       "color": colors,
//       "size": sizes,
//       // "price": price
//     };
//   })
// };

// // pdbtn
// (function () {
//   let hmtl = ''; let html33 = '';
//   for (let i = 0; i < pki.types.length; i++) {// tbl[1]?.[t]?.[0]
//     hmtl += `<button class='w3-bar-item w3-button tablink ${i ? '' : ' w3-red'}' onclick="openCity(event,'type${i}')">${pki.types[i].type}</button>`;
//     html33 += `<div id='type${i}' class='city' style='display:${i ? 'none' : 'block'}'>${pki.types[i].type}</div>`;
//   }
//   document.getElementById('pdbtn').innerHTML = hmtl;
//   // console.log(html33);
//   document.getElementById('tbldiv').innerHTML = html33;
//   pki.types.forEach((e, i) => gentbl(i + ''));
// })();



//gen. table for Each tab on load
// window.onload = function () {
//   document.querySelectorAll('.bar button').forEach(
//     function (e, i) {
//       gentbl(i);
//     });
// };
let intp=(navigator.platform === 'iPhone') ? "pattern='[0-9]*' type='text'" : "type='number'";
let intp2 = "type='button'";
let intp4 = "onclick='unavail()'";

let pc={};
function gentbl(f) {
  let m = '';
  let tbldiv = document.getElementById('tbldiv'); // Assuming 'html33' is the container for tables
  let navbar = document.getElementById('pdbtn'); // Assuming 'navbar' is the container for buttons

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

(async()=>{
 await loadScript('https://d2fzc2z1ecgedb.cloudfront.net/pc.js?t='+Date.now());
  gentbl(tbl[0]);
})()

document.getElementById('pdbtn').addEventListener('click', function (evt) {
  let tg=evt.target;
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

// /// tab layout
// let curtab = "type0";
// // Attach event listener to the parent container (e.g., navbar)
// document.getElementById('navbar').addEventListener('click', function (evt) {
//   // Check if the clicked element is a button with the class 'tablink'
//   if (evt.target.classList.contains('tablink')) {
//     openCity(evt);
//   }
// });

// function openCity(evt) {
//   // Hide all tables and reset button styles
//   document.getElementById('alltab').style.display = '';
//   document.getElementById('cor1').style.display = 'none';

//   let x = document.querySelectorAll(".city");


//   x.forEach(city => city.style.display = "none");

//   // Remove the 'w3-red' class from all buttons
//   tablinks.forEach(link => link.classList.remove("w3-red"));

//   // Get the target cityName from the clicked button's ID or data attribute
//   let cityName = evt.target.getAttribute('data-city'); // Assuming buttons have a data-city attribute
//   if (!cityName) {
//     cityName = evt.target.id.replace('bt', 't'); // Fallback to ID-based logic
//   }

//   // Show the selected table and highlight the clicked button
//   document.getElementById(cityName).style.display = "block";
//   evt.target.classList.add("w3-red");

//   // Show all rows in the table
//   let lkp1 = document.querySelectorAll("tr.oj");
//   lkp1.forEach(row => row.style.display = "");

//   // Hide the total section
//   document.getElementById('tot').style.display = 'none';
// }
// function openCity(evt, cityName) {
//   // let odert = document.getElementById('odert');
//   document.getElementById('alltab').style.display = '';
//   document.getElementById('cor1').style.display = 'none';
//   // odert.style.display = '';
//   // odert.innerText = "Total";
//   let i, x, tablinks;
//   x = document.querySelectorAll(".city"); let xa = x.length;
//   for (i = 0; i < xa; i++) {
//     x[i].style.display = "none";
//   }
//   tablinks = document.querySelectorAll(".tablink");
//   for (i = 0; i < xa; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
//   }
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.className += " w3-red";
//   // let jk12 = 0;
//   // let jk100 = document.getElementById(cityName).querySelectorAll("thead > tr.w3-blue-grey th"); let jk1001 = jk100.length;
//   // for (let r = 1; r < jk1001; r++) {
//   //   let njh113 = jk100[r].innerText;
//   //   let njh123 = Number(njh113);
//   //   jk12 += njh123;//console.log(r,'lelolelo',jk12,njh113,njh123)
//   // }
//   // odert.innerText = "Total-" + jk12;
//   let lkp1 = document.querySelectorAll("tr.oj"); let lkp11 = lkp1.length;
//   for (let p = 0; p < lkp11; p++) {
//     lkp1[p].style.display = "";
//   }

//   // let uy = document.querySelectorAll('.city thead tr:nth-child(1)'); let uy1 = uy.length;
//   // for (let v = 0; v < uy1; v++) {
//   //   uy[v].style.display = '';
//   // }
//   document.getElementById('tot').style.display = 'none';
// }


//  toggle in sample/bulk oder
let totqt = [];
function bulks() {
  let hj = document.querySelectorAll("#pdbtn button").length + 2;
  totqt[hj] = (document.getElementById('bulkc').checked) ? tbl[3].moq : -110;
  console.log(totqt, 'hiiiiiii');
}

// display all tab 
// let bulk;
// let prc = {}; let bulkpc = JSON.parse(localStorage.pc); let sampc = JSON.parse(localStorage.pcs);
function viewtotal() {
  return new Promise(async (rez) => {
    let sum = totqt.reduce((p, a) => p + a, 0);
    console.log(sum);
    if ((sum > tbl[3].moq)) {
      // prc = bulkpc; 
      document.getElementById('bulkc').checked = 1;
      // zc(sum,bulkpc.sqt,'t0hiiiiiii');
    } else {
      // prc = sampc;
      document.getElementById('bulkc').checked = 0;
      // zc(sum,bulkpc.sqt,'f0hiiiiiii');
    }

    // let x1 = document.querySelectorAll(".city"); let x11 = x1.length;
    // for (i = 0; i < x11; i++) {
    //   x1[i].style.display = "block";
    // }

    document.querySelector(".tablink.w3-red")?.classList.remove("w3-red");

    // remove 0 value table
    //let ytl=document.querySelectorAll(".city td .w3-input");
    // let lkp = document.querySelectorAll(".city tr.oj"); let lkp1 = lkp.length;
    // for (let k = 0; k < lkp1; k++) {
    //   lkp[k].style.display = "none";
    // }
    // for (let i = 0; i < lkp1; i++) {
    //   let pkz = lkp[i].querySelectorAll('td').length;

    //   for (let j = 0; j < pkz; j++) {
    //     let zo = lkp[i].querySelectorAll('tr input')[j].value === "";
    //     //  let jkp=[];
    //     if (!zo) {
    //       //console.log(lkp[i],'y');
    //       lkp[i].style.display = "";
    //     } else { }
    //   }
    // }
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
//// Display Total table
// var pctt; var pcwt; let total; var odprice; let billinv = []; let othch;
// function tot1() {
//   return new Promise(async (rez) => {
//     odprice = {}; billinv = [];
//     let dtt = date.slice(0, 6);
//     othch = [];
//     let tch = document.getElementById('tch').valueAsNumber || 0;
//     let och = document.getElementById('och').valueAsNumber || 0;
//     let dis = document.getElementById('dis').value;
//     let dptch = tch ? '' : 'display:none';
//     let dpoch = och ? '' : 'display:none';
//     othch = [tch, och, Number(dis)];
//     // alert(othch);
//     document.getElementById('u13').innerText = document.getElementById('frt').innerText;
//     let v9 = (pk8) ? pk8 : (date1 + (Number(localStorage.clickcount) + 1));
//     // console.log(pk8,v9);
//     document.querySelector('#tot table thead span').innerText = '#' + v9;

//     let dtt2 = ', ' + new Date().toLocaleTimeString('en', { hour: "2-digit", minute: "2-digit", hour12: true }).replace(' ', '');

//     document.getElementById('tot').style.display = '';
//     document.getElementById('odert').style.display = 'none';
//     total = 0; pctt = 0; pcwt = 0;
//     let uy = document.querySelectorAll('.city thead tr:nth-child(1)'); let uy1 = uy.length;
//     for (let v = 0; v < uy1; v++) {
//       uy[v].style.display = 'none';
//     }
//     let tg = document.querySelectorAll('.city'); let tg1 = tg.length;
//     let sd0 = '';
//     for (let b = 0; b < tg1; b++) {
//       let sd20 = document.querySelectorAll("#trth .w3-blue")[b];
//       let sd2 = sd20.innerText.trim();
//       let sd21 = typep77[sd2];
//       // console.log(sd2,sd21);
//       let cta = 0, ctb = 0, ctc = 0, ctd = 0, cte = 0, sd1 = null, sd11 = 0;
//       sd1 = tg[b].querySelectorAll("thead > tr.w3-blue-grey > th");
//       sd11 = sd1.length;
//       // console.log('gh',sd1,sd11);
//       for (let h = 1; h < sd11; h++) {
//         let njh = sd1[h].innerText;
//         let njh1 = Number(njh);
//         total += njh1;
//         if (h <= 4) {
//           cta += njh1;
//         } else if (h == 5) {
//           ctb = njh1;
//         } else if (h == 6) {
//           ctc = njh1;
//         } else if (h == 7) {
//           ctd = njh1;
//         } else if (h == 8) {
//           cte = njh1;
//         }
//       }
//       let ctt = (cta + ctb + ctc + ctd + cte);
//       if (ctt != 0) {
//         sd0 += "<tr>" + pc(sd2, sd21, cta, ctb, ctc, ctd, cte) + "</tr>";
//       }
//     }//console.log(sd0);
//     let txv = (Number(pctt) - Number(dis) + Number(tch));

//     let vn = (document.getElementById('bulkc').checked) ? (Number(txv) * 0.05) : 0;
//     let vn1 = (document.getElementById('bulkc').checked) ? '' : 'none';
//     // let vn1 = (document.getElementById('bulkc').checked) ?  '+ 5% Tax' : '<span style="padding: 0 2.30em"></span>';
//     let inv = Math.ceil((vn + Number(txv) + Number(och))); billinv = [txv, inv];
//     let pctt0 = dis && ("<tr><td colspan='2'><b class='sa2'>Discount -</b></td><td>" + "<b>" + dis + '₹' + '</b></td></tr>');
//     let pctt1 = "<tr><td colspan='3' style='padding: 1px 4px 1px 2px!important'><div><b class='sc1'>" + total + " PCS Total</b><b class='sc1' style='margin-left: 2px;background: #2e2effd6'>" + Math.ceil(pcwt) + "kg</b><b class='sa2' style='display:" + vn1 + "'>" + txv + '₹ + 5% Tax' + '</b></div></td>' + '</tr>';
//     let pctt2 = "<tr style=" + dptch + "><td colspan='2'><b class='sa2'>Transport Charge -</b></td><td>" + "<b>" + tch + '₹' + '</b></td></tr>';
//     let pctt3 = "<tr style=" + dpoch + "><td colspan='2'><b class='sa2'>Other Charges -</b></td><td>" + "<b>" + och + '₹' + '</b></td></tr>';
//     let pctt4 = "<tr><td colspan='2'><b style='font-size: 12px; font-weight: 500;'>" + dtt + dtt2 + "</b><b class='sa2'>Total Amount -</b></td><td>" + "<b class='sc1'>" + (inv.toLocaleString('en-IN')) + '₹' + '</b></td></tr>';
//     document.querySelector('#tot table tbody').innerHTML = sd0 + pctt0 + pctt2 + pctt1 + pctt3 + pctt4;
//     //document.querySelector('#tot thead tr #u13').contentEditable=true;
//     //document.querySelector('#tot thead tr #u23').innerText='Total-'+tote;
//     rez();
//   })
// }
function unavail() {alert('Stock Refilling Soon!!')}
var pctt; var pcwt; let total; var odprice; let billinv = []; let othch;
let odtot, odwt, odqt, odpc, odpcf, oddata;
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
  let sum = totqt.reduce((p, a) => p + a, 0); let odt = (sum > tbl[3].moq);
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
  ht += `${tax}<tr><td><b class='sc1'>${odqt} PCS Total</b><b class='sc1' style='margin-left: 2px;background: #2e2effd6'>${Math.ceil(odwt)}kg</b><b class='sa2 fw'>Total Amount -</b></td><td id='ttpc'><b class='sc1'>${odpcf.toLocaleString('en-IN')}₹</b></td></tr>`;
  // document.getElementById('odhh').innerHTML = `<input class="my-check" type="checkbox" ${odt ? '' : 'checked="checked"'}><label>Sample Order(<${tbl[3].moq}pcs)</label>, <input class="my-check" type="checkbox" ${odt ? 'checked="checked"' : ''}><label>Bulk Order(>${tbl[3].moq}pcs)</label>`;
  document.querySelector('#tot table tbody').innerHTML = ht;
  
  rez();})
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
  document.querySelector('#gall input').checked;
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
  for (let u in selod5) { document.getElementById(u).checked = false; }
  totqt = []; od = {}; zsr = {};
  ptd = {}; pk8 = 0; ptods = []; ptid = 0; selod5 = {};
}

// onload model get Customer Name and gst
function gonext() {
  // alert(document.getElementById('instock').checked);
  if (document.getElementById('instock').checked) {
    let mypnm = document.getElementById('pnm');
    document.getElementById("incn").value = mypnm.value.replace(/\s+/g, ' ').trim(); mypnm.value = ""; // document.querySelector('#gall input[type="radio"]:checked').labels[0].innerText;
  }
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


// Print
async function omprint() {
  // document.title+=zxc+',';
  // window.print();
  if (Object.keys(selod5).length) {
    ///console.log(selod5);
    let myW; let tyu5;
    document.getElementById('uyt4').innerHTML = '';
    myW = window.open("", "_blank"); let winbody = myW.document.body;
    winbody.setAttribute('onclick', 'print()');
    winbody.innerHTML += "<style>body{margin: 0 8px}table tbody:last-child {display:none}div {padding: 5px;margin: 5px 0;overflow: auto;font-size: 18px;font-family: sans-serif;font-weight: 600;}table, th, td {border: 1px solid black;border-collapse: collapse;text-align: center;font-weight: 600;}#tblom1 {width: 100%;border: none;}#tblom1  tbody tr:first-child{color:blue;background: #ffdfdd;}</style><div id='my56'></div>";
    winbody.addEventListener("click", () => myW.close());
    // winbody.addEventListener("click", () => {setTimeout(() => {
    //   myW.close();
    // }, 500); });
    // let st = new Localbase('st');
    let vb = '';
    for (const p in selod5) {
      let p0 = p.slice(2, 6);
      if (vb != p0) {
        vb = p0;
        await mthdb(p0);
      }

      // st.collection(selg).doc(p).get().then(doc => {
      // console.log(doc);
      await oddb.od.get(Number(p.slice(3))).then((doc) => {
        odtbl2(doc.od, 'tblom1', 'uyt4', p, doc);
        tyu5 = document.getElementById('uyt4').innerHTML;
        winbody.innerHTML += tyu5;
        document.querySelector('#' + secid + ' #' + p).checked = false;
        //my56
      });
    }

    // table gen for oder
    function odtbl2(jk, b, c1, or, doc) {
      document.getElementById(c1).innerHTML = "<div><span style='float: left'>" + "Bill To: " + doc.cn + "<br/>Total: " + doc.tot + "</span><span style='float: right'>" + "Invoice No.: " + doc.id + "<br/>Date: " + doc.dt + "</span></div><div id='" + or + "' style='break-after:page;border-style: dashed;border-width: 0.5px;'><table id='" + b + "'><tbody></tbody></table>";
      var sd1 = document.querySelector('#' + or + ' #' + b);

      Object.keys(jk).forEach(function (t) {
        //  type loop
        if ((t === 'Bio') || (t === 'NBio') || (t === 'Polo') || (t === 'Vest') || (t === 'PrePolo')) {
          sd1.innerHTML += "<tbody id='" + t.replace(/\s+/, "") + "' style=''><tr> <th>" + typep7[t] + "</th> <th>36</th> <th>38</th> <th>40</th> <th>42</th> <th>44</th> <th>46</th> </tr></tbody><table><tr><td style='border: none; background: white'><br></td></tr></table>";
        } else if ((t === 'Kids')) {
          sd1.innerHTML += "<tbody id='" + t.replace(/\s+/, "") + "'><tr> <th>" + typep7[t] + "</th> <th>20</th> <th>22</th> <th>24</th> <th>26</th> <th>28</th> <th>30</th> <th>32</th> <th>34</th> </tr></tbody><table><tr><td style='border: none; background: white'><br></td></tr></table>";
        }
        else {
          sd1.innerHTML += "<tbody id='" + t.replace(/\s+/, "") + "' style=''><tr> <th>" + typep7[t] + "</th> <th>XS</th> <th>S</th> <th>M</th> <th>L</th> <th>XL</th> <th>XXL</th> </tr></tbody><table><tr><td style='border: none; background: white'><br></td></tr></table>";
        }

        Object.keys(jk[t]).forEach(function (c) {
          // color loop
          let td2 = ' ';
          if ((t === 'Kids')) { td2 = "<td></td> <td></td>" }
          sd1.querySelector('#' + t).innerHTML += "<tr id='" + c.replace(/\s+/, "") + "'> <th>" + c + "</th> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>" + td2 + "</tr>";

          Object.keys(jk[t][c]).forEach(function (s) {
            // size loop

            switch (s) {
              case "20":
              case "36":
              case "XS":
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(2)').innerHTML = jk[t][c][s];
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(2)').setAttribute("id", s);
                break;
              case "22":
              case "38":
              case "S":
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(3)').innerHTML = jk[t][c][s];
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(3)').setAttribute("id", s);
                break;
              case "24":
              case "40":
              case "M":
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(4)').innerHTML = jk[t][c][s];
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(4)').setAttribute("id", s);
                break;
              case "26":
              case "42":
              case "L":
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(5)').innerHTML = jk[t][c][s];
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(5)').setAttribute("id", s);
                break;
              case "28":
              case "44":
              case "XL":
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(6)').innerHTML = jk[t][c][s];
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(6)').setAttribute("id", s);
                break;
              case "30":
              case "46":
              case "XXL":
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(7)').innerHTML = jk[t][c][s];
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(7)').setAttribute("id", s);
                break;
              case "32":
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(8)').innerHTML = jk[t][c][s];
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(8)').setAttribute("id", s);
                break;
              case "34":
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(9)').innerHTML = jk[t][c][s];
                sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(9)').setAttribute("id", s);
            }
            //console.log( t,c,s, jk[t][c][s]); 
          });
        });
      });
    }// End table gen for oder

    selod5 = {}; secid = '';
  } else { alert('Select order first') }
}

// go from close model view 
// function pky7() {
//   // document.querySelector('#id01 span').style.display='none';
//     document.getElementById('id01').style.display='none';
//     document.getElementById('gstall').innerHTML='';
//    document.getElementById('bnm7').style.display='block';
// }

// if((date.slice(0,6)=='01 Apr')&&(localStorage.clickcount>800)){
//   localStorage.clickcount=0;
// }

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


///each oninput table cell

// function inclick(zx) {
//   //macin();
//   let qt = Number(zx.value); let ep = zx.parentElement.parentElement;
//   let tbid = ep.parentElement.parentElement.id;
//   // alert('hi')
//   let xn = Array.from(ep.children).indexOf(zx.parentNode);
//   // console.log('cvbnmkkk',tbid,xn);
//   // let pk1 = document.getElementById(tbid).rows; let pk11 = pk1.length;
//   // let jk = 0;
//   // for (let i = 2; i < pk11; i++) {
//   //   jk += Number(pk1[i].cells[xn].querySelector('input').value);
//   // }//console.log(zx,zx.value,'asd');
//   let c = document.querySelectorAll("#" + tbid + " > thead > tr.w3-red > th")[xn].innerText;
//   // let ihj1=zx.parentElement.parentElement;
//   let t = document.querySelectorAll("#" + tbid + " > thead > tr.w3-red > th")[0].innerText;
//   // console.log('kjkj', ihj2, ep.querySelector('th').innerText, ihj, zx.value);
//   stork(t, ep.querySelector('th').innerText, c, qt);
//   // console.log(od);
//   // document.querySelectorAll("#" + tbid + " > thead > tr.w3-blue-grey > th")[xn].innerText = jk;
//   // let uy = document.querySelectorAll("#" + tbid + " > thead > tr.w3-blue-grey > th"); let uy1 = uy.length;
//   // let rt = 0;
//   // for (let u = 1; u < uy1; u++) {
//   //   rt += Number(uy[u].innerText);
//   //   // console.log('gggtttt',rt,yt12);
//   // }// console.log('fghjkk',rt);
//   let tot = 0;
//   if (od[t]) {
//     Object.values(od[t]).forEach(i => Object.values(i).forEach(v => tot += v));
//   }
//   // totqt[parseInt(tbid.slice(-2))] = tot;
//   totqt[tbid.split("tbl")[1]] = tot;
//   console.log(tbid.split("tbl")[1], tbid, totqt, tot);
//   document.getElementById('odert').innerText = "Total-" + tot;
// }

document.getElementById('tbldiv').addEventListener('input', function (event) {
  let tg = event.target;
  if (tg.tagName !== 'INPUT' || tg.type !== 'number') return;
  const v = tg.valueAsNumber||0;
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

  document.getElementById('gstall').innerHTML = "<div class='w3-blue-gray' style='display:flex;position: sticky;top: -50px;z-index: 6;'><div class='w3-bar-item w3-button w3-border-right' onclick='delod()'>Del</div><div id='cout6' class='w3-bar-item w3-button w3-border-right'>Total</div><div onclick='resetd()' class='w3-bar-item w3-button w3-border-right'>Reset</div><button class='w3-button w3-bar-item w3-border-right' onclick='omprint()'>Print</button>" + "<div id='st91' class='w3-dropdown-hover'> <button class='w3-button w3-border-right'>Status</button><div id='st92' class='w3-hide w3-bar-block w3-border'> <a href='#' onclick='unpin()' class='w3-bar-item w3-button'>None</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Payment Pending</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Under Production</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Printing</a><a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Part Quantity</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Pending</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>In Transit</a><a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>COD</a> <input onchange='chnot(1,this)' id='inp5' name='od84' class='w3-border w3-bar-item' type='text' style='padding:5px;display:none' placeholder='Write other...'></div></div>" + "<button onclick='printadd()' class='w3-button'>DTDC</button>" + "</div>" + "<div id='tre6'><ul id='oderli' class='w3-ul'></ul></div>";
  // status toggle
  document.getElementById('st91').addEventListener('click', (v) => {
    document.getElementById('st92').classList.toggle('w3-show');
  })
  // count total
  document.getElementById('cout6').addEventListener("click", function () {
    let fromod1 = Number(localStorage.fromod);
    if (1 + Number(zxc) - Number(localStorage.fromod)) { couttot(fromod1, selg) }
    else { alert("No data to count total ") }
  })
  console.log(selg)
  await getods(selg).then(() => {
    // selod5=JSON.parse(pinloc);//console.log(selg,pinloc)
    setTimeout(() => { pint(); }, 100);
  })

}

// let clickh = 0;
async function opodli(b) {
  let qwe5 = b.parentElement.id.slice(1);
  console.log(b.parentElement.tabIndex, qwe5);
  if (selg != 'inst') {
    // console.log(selg.slice(-1)+qwe5.slice(0,3));
    await mthdb(selg.slice(-1) + qwe5.slice(0, 3));
    await oddb.od.get(Number(qwe5)).then((doc) => { clickonod(b, qwe5, doc); });
  } else {
    await instdb.inst.get(Number(qwe5)).then((doc) => { clickonod(b, qwe5, doc); });
  }

}
function clickonod(b, qwe5, doc) {
  let isOpen = b.parentElement.nextSibling?.id == 'gentblx';
  document.getElementById('gentblx')?.remove();
  if (!isOpen) {
    b.parentElement.insertAdjacentHTML('afterend', "<div id='gentblx'><div style='font-weight: 600;display: flex;'><div class='w3-small w3-button w3-border-right w3-dark-grey' id='b" + qwe5 + "' onclick='editod(this)'>Edit</div><div onclick='copylink1(" + `"s${qwe5}"` + ")' class='w3-small w3-button w3-border-right w3-dark-grey w3-ripple'>Copy Link</div></div><div id='my55'>Sample Div</div></div>")
    odtbl(doc.od, 'tblom1', 'my55');
  }
}

// function clickonod(b, qwe5, doc) {
//   const parent = b.parentElement;
//   const isOpen = parent.dataset.isOpen === 'true';

//   if (isOpen) {
//     // Close it
//     const aa5 = document.getElementById('aa5');
//     const my55 = document.getElementById('my55');
//     if (aa5) aa5.remove();
//     if (my55) my55.remove();
//     parent.dataset.isOpen = 'false';
//   } else {
//     // Open it
//     parent.insertAdjacentHTML('afterend', `
//       <div id='aa5' style='font-weight: 600; display: flex;'>
//         <div class='w3-small w3-button w3-border-right w3-dark-grey' 
//              id='b${qwe5}' 
//              onclick='editod(this)'>Edit</div>
//         <div onclick='copylink1("s${qwe5}")' 
//              class='w3-small w3-button w3-border-right w3-dark-grey w3-ripple'>Copy Link</div>
//       </div>
//       <div id='my55'>Sample Div</div>
//     `);
//     parent.dataset.isOpen = 'true';
//     odtbl(doc.it, 'tblom1', 'my55');
//   }
// }

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



// table gen for oder
// function odtbl(jk, b, c2) {
//   document.getElementById(c2).innerHTML = "<table id='" + b + "'></table>";
//   let sd1 = document.getElementById(b);
//   Object.keys(jk).forEach(function (t) {
//     //  type loop
//     if ((t === 'Bio') || (t === 'NBio')) {
//       sd1.innerHTML += "<tbody id='" + t.replace(/\s+/, "") + "'><tr> <th>" + t + "</th> <th>36</th> <th>38</th> <th>40</th> <th>42</th> <th>44</th> <th>46</th> </tr></tbody>";
//     } else if ((t === 'Kids')) {
//       sd1.innerHTML += "<tbody id='" + t.replace(/\s+/, "") + "'><tr> <th>" + t + "</th> <th>20</th> <th>22</th> <th>24</th> <th>26</th> <th>28</th> <th>30</th> <th>32</th> <th>34</th> </tr></tbody>";
//     }
//     else {
//       sd1.innerHTML += "<tbody id='" + t.replace(/\s+/, "") + "'><tr> <th>" + t + "</th> <th>XS</th> <th>S</th> <th>M</th> <th>L</th> <th>XL</th> <th>XXL</th> </tr></tbody>";
//     }

//     Object.keys(jk[t]).forEach(function (c) {
//       // color loop
//       let td2 = ' ';
//       if ((t === 'Kids')) { td2 = "<td></td> <td></td>" }
//       sd1.querySelector('#' + t).innerHTML += "<tr id='" + c.replace(/\s+/, "") + "'> <th>" + c + "</th> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>" + td2 + "</tr>";
//       Object.keys(jk[t][c]).forEach(function (s) {
//         // size loop

//         switch (s) {
//           case "20":
//           case "36":
//           case "XS":
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(2)').innerHTML = jk[t][c][s];
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(2)').setAttribute("id", s);
//             break;
//           case "22":
//           case "38":
//           case "S":
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(3)').innerHTML = jk[t][c][s];
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(3)').setAttribute("id", s);
//             break;
//           case "24":
//           case "40":
//           case "M":
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(4)').innerHTML = jk[t][c][s];
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(4)').setAttribute("id", s);
//             break;
//           case "26":
//           case "42":
//           case "L":
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(5)').innerHTML = jk[t][c][s];
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(5)').setAttribute("id", s);
//             break;
//           case "28":
//           case "44":
//           case "XL":
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(6)').innerHTML = jk[t][c][s];
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(6)').setAttribute("id", s);
//             break;
//           case "30":
//           case "46":
//           case "XXL":
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(7)').innerHTML = jk[t][c][s];
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(7)').setAttribute("id", s);
//             break;
//           case "32":
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(8)').innerHTML = jk[t][c][s];
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(8)').setAttribute("id", s);
//             break;
//           case "34":
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(9)').innerHTML = jk[t][c][s];
//             sd1.querySelector('#' + t.replace(/\s+/, "") + ' #' + c.replace(/\s+/, "") + ' ' + 'td:nth-child(9)').setAttribute("id", s);
//         }

//         //console.log( t,c,s, jk[t][c][s]); 
//       });
//     });
//   });
// }// End table gen for oder


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
// count total and make table
//alert('',xc)
let pd2;
async function couttot(xc, gd) {
  // let st = new Localbase('st');
  newc2();
  pd2 = structuredClone(ods1);//{...ods1}
  // console.log(pd2);
  let oldm = localStorage.lastreset.split(','); // '304,34' 
  console.log(oldm[0], date1, oldm[1], xc, zxc);
  if (oldm[0] != date1) {
    let lr = Number(oldm[1]); let lr1 = 500;
    await mthdb(gd.slice(-1) + oldm[0]);
    for (let v = lr; v <= (lr + lr1); v++) {
      // st.collection(gd).doc('od'+(oldm[0])+v).get().then(doc => {
      await oddb.od.get(Number(oldm[0] + '' + v)).then((doc) => {
        if (doc) {
          // console.log('1',v);
          lelo(doc.od);
          // }else{console.log('0',v);
        }
      }).catch(err => { console.log(err) });
    }
  }
  await mthdb(gd.slice(-1) + date1);
  for (let v1 = xc; v1 <= Number(zxc); v1++) {
    // st.collection(gd).doc('od'+date1+v1).get().then(doc => {
    await oddb.od.get(Number(date1 + v1)).then((doc) => {
      // console.log(date1+''+v1)
      if (doc) { lelo(doc.od); }
      // else{console.log('0',v1);
    }).catch(err => { console.log(err) });
  }
}

// for instock
async function couttotinst(xc, gd) {
  // let st = new Localbase('st');
  pd2 = structuredClone(ods1);
  // console.log(pd2);
  // st.collection(gd).doc('od'+xc).get().then(doc => {
  await instdb.inst.get(xc).then(doc => {
    lelo(doc.od);
  })
}


function lelo(kk) {
  Object.keys(kk).forEach(function (t) {
    //  type loop
    Object.keys(kk[t]).forEach(function (c) {
      // color loop
      Object.keys(kk[t][c]).forEach(function (s) {
        // size loop
        pd2[t][c][s] += kk[t][c][s];
        //console.log(pd2[t][c][s],kk[t][c][s]);
        // console.log( t,c,s, od[t][c][s]); 
      });
    });
  });
  //<input class='w3-border w3-input' type='text' style='padding: 0' placeholder='Write Notes...'></div>
  let tfv17 = "<div class='w3-panel' style='padding: 0;margin: 0'><table id='testTable' class='w3-table-all w3-bordered w3-centered w3-striped w3-border test' style='color:#000'><tr class='w3-green'><th><a id='acsv' href='#'>Type</a></th><th>Color</th><th>Size</th><th>QT.</th></tr>";
  //document.getElementById('gstall').innerHTML='';
  document.getElementById('id01').style.display = 'block';
  document.getElementById('bnm7').style.display = 'none';
  document.getElementById('gstall').style.display = 'block';
  // document.querySelector('#id01 span').style.display='';
  var tfv27 = ''; var qt5 = 0;// console.log(pd2)
  Object.keys(pd2).forEach(function (t) {
    //  type loop
    Object.keys(pd2[t]).forEach(function (c) {
      // color loop
      Object.keys(pd2[t][c]).forEach(function (s) {
        // size loop
        if (!(pd2[t][c][s] === 0)) {
          qt5 += pd2[t][c][s];
          tfv27 += "<tr><td>" + typep7[t] + "</td><td>" + c + "</td><td>" + s + "</td><td>" + pd2[t][c][s] + "</td></tr>";
        }
        // console.log( t,c,s, od[t][c][s]); 
      });
    });
  });
  document.getElementById('tre6').innerHTML = tfv17 + tfv27 + '</table></div>';
  tfv27 = '';
  document.querySelector('#testTable tr th:last-child').innerHTML = 'Qt. ' + qt5;
}

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
    }
    else {
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


// var moveItem = (from, to) => {
//   const aul=document.getElementById('oderli');
//   const items = [...aul.querySelectorAll('li')];
//   if (to > items.length - 1 || to < 0) return;
//   const item = items[from];
//   if (!item) return;
//   aul.removeChild(item);
//   aul.insertBefore(item, aul.children[to]);
// }

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
    snackbar('Status changed to ' + v.innerText, 500);
    await sendd(urli, vkz5, 'pin');

    selod5 = {}; secid = '';
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
    let pj = pxn.tabIndex;
    if (pj > 0) {
      await db.pt.get(pj).then((v) => {
        if (v) {
          !!(v.add) || (pxn.style.color = 'blue'); // if add=='' txt color blue
          if (v.gst) {
            let zw = pxn.querySelector('span[onclick] span');
            zw.innerText = 'GST';
            zw.style.padding = '';
          }
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
      px1.parentNode.style.background = '#fff';
      document.querySelector('#vtag [name=' + t + ']').innerText = '';
      delete mk5[t];
      px1.checked = false;
    }
    selpin(selg);
    localStorage.setItem(pinz, JSON.stringify(mk5));
    selod5 = {};
    let vkz6 = { p: "3", "g": selg, od: { ...mk5 } };
    snackbar('Unpined', 500);
    sendd(urli, vkz6, 'unpin');
  } else { alert('Select order first.') }
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
  x.style.display = '';
  x.innerHTML = txt;
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
