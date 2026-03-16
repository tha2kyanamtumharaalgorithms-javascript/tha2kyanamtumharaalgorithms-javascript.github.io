let od = document.querySelector('#orders'), sel = {}, ods = {}, htmlx = '';
let nmzx = "https://o3v0l7z6nf.execute-api.ap-south-1.amazonaws.com/pk/";
function dt(v) {
    return new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', });//year: 'numeric'
}

async function clearsel() {
    sel = {}; document.querySelectorAll('#orders .check:checked').forEach(v => v.checked = false);
}

document.addEventListener("visibilitychange", () => {
    console.log(document.visibilityState, document.hidden);
    //visible false
});

const audio = document.getElementById('audio');
window.playAudio = function () { audio.play(); }
// let toggleL=true;
od.addEventListener('click', (e) => {
    let t = e.target, id = t.parentElement?.id.slice(1);
    if (t.tagName == 'INPUT') {
        if (t.checked) { sel[id] = id; } else { delete sel[id]; };
        console.log(t.tagName == 'INPUT', t.checked, sel);
    } else if (t.id == 'dowork') {
        // console.log(t,id);
        let mods = ods[id];
        let t1 = odtype[mods.shp.slice(-1)];
        if (t1 == 'D') {
            let nmzx1 = nmzx + t1;
            let f = nmzx1 + mods.img;
            console.log(f);
            // let myW=window.open(f, "_blank");
            addTextToAllPages(f, id.slice(-4));

        } else if (t1 == 'L') {
            console.log(mods.add);
            let add = mods.add.split('||');
            let copy = 'geo:';//'https://maps.google.com/maps?q=';
            // if(toggleL&&add[0]){copy=add[0];console.log(copy)
            //     navigator.clipboard.writeText(copy);
            //     snackbar(copy, 1500);
            // }else{
            //     copy+=mods.geo[0]+','+mods.geo[1];
            //     window.open(copy, "_blank");
            // }
            // toggleL=!toggleL;
            copy += mods.geo[0] + ',' + mods.geo[1];
            window.open(copy, "_blank");
        } else if (t1 == 'T') {
            let add = mods.add.split(',');
            if (add[4]) {
                navigator.clipboard.writeText(add[4]);
                snackbar('Copied', 1000);
            } else {
                snackbar('Location not found!', 1500);
            }
        }

    }

})
nmzx += 'img/image/hd/new';
if (!localStorage.oldid) { localStorage.setItem('oldid', '[]') };
if (!localStorage.dubli) { localStorage.setItem('dubli', '[]') };
if (!localStorage.liveWebOrders) { localStorage.setItem('liveWebOrders', '{}') };
let odtype = ['', 'A', 'L', 'T', 'D', 'S', 'Tr'], newid = [], duplicates;
async function getdata() {
    sel = {}; ods = {}; newid = []; let dem = [];
    let oldid = JSON.parse(localStorage.oldid);
    let olddem = JSON.parse(localStorage.dubli);
    htmlx = `<div class="load"><div id="loadx"></div></div>`;
    document.getElementById('loadx').classList.add('loading');
    const sheetURL = `https://docs.google.com/spreadsheets/d/1qgd56MEzSTLstp_sOPnKTp0eWA1pIkJHOp3DEPrlsM0/gviz/tq?tqx=out:csv&sheet=PendingOrder`;
    let txt = [];
    await fetch(sheetURL).then(v => v.text()).then((t) => {
        if (t.length) {

            txt = t.replace(/""/g, '"').trim().split('\n').reverse();
            txt = txt.map(v => {
                // console.log(v)
                let m = v.split('||Pending","'); m[0] = m[0].slice(1); m[1] = JSON.parse(m[1].slice(0, -1));
                // console.log(mid);
                let id = Number(m[0].slice(6, 13)); newid.push(id);
                let dm = String(m[1].dt).slice(-8) + m[1].mn1.slice(-3);
                dem.push(dm);
                ods[m[0]] = m[1];//let mid1=;
                let wt = 'w3-amber'; let delevtype = ''; let shp = m[1].shp.slice(-1);
                if (shp == 1) {
                    if (m[1].dl[1] >= 33 && !m[1].tch?.includes('zz')) { wt = 'w3-brown'; }
                    if (m[1].tch.includes(',')) {
                        delevtype = '1'
                    } else if (m[1]?.tchmth?.includes("zz0")) {
                        delevtype = '5'
                    } else if (m[1]?.tchmth?.includes("zz1")) {
                        delevtype = 'E'
                    } else if (m[1]?.tchmth?.includes("zz2")) { delevtype = '10' }
                } else if (shp == 4) {
                    if (m[1].b) {
                        if (m[1].tch?.includes(',')) {
                            delevtype = 'A1';
                        } else if (m[1]?.tchmth?.includes("zz0")) {
                            delevtype = 'A5'
                        } else if (m[1]?.tchmth?.includes("zz1")) {
                            delevtype = 'AE'
                        } else if (m[1]?.tchmth?.includes("zz2")) { delevtype = 'A10' } else {
                            delevtype = 'A';
                        }
                        if (m[1].dl[1] >= 33 && !m[1].tch?.includes('zz')) { wt = 'w3-brown'; }
                    }
                }
                htmlx += `<div id="b${m[0]}" class="fx ${wt} od ${m[1].hold && 'w3-white'}" title="${dm}"><input type="checkbox" class="w3-check check">
    <div onclick="openwh(${m[1].mn1})">${id}.${escapeHtml(m[1].nm)}</div><div class="w3-auto">${m[1].shp.slice(0, -2)}</div><div class="w3-auto">${odtype[shp] + delevtype}</div><div id="dowork">${dt(m[1].dt)}</div></div>`;
                return m
            });
            let alarm = [];
            console.log(oldid);
            newid.forEach(v => {
                if (!oldid.includes(v)) {
                    alarm.push(v);
                }
            });
            if (alarm.length) {
                audio.play();
                document.getElementById('ply').click();
            }

            localStorage.setItem('oldid', JSON.stringify(newid));

            let alldv = [...dem, ...olddem];
            let dem1 = new Set(alldv);
            if (alldv.length != dem1.length) {
                let seen = new Set();
                duplicates = new Set();
                alldv.forEach(item => {
                    if (seen.has(item)) {
                        duplicates.add(item);
                    } else {
                        seen.add(item);
                    }
                });

                // if(duplicates.size){
                console.log(duplicates)
                // }

            }
            // else{
            //     // when done send uniqe value in dubli 
            //     // when dubli more than 150 then remove extra
            // }
        } else {
            htmlx = htmlx + '<div class="fw fxc p12ud w3-amber">All Orders Done!!</div>';
            // alert("All Orders Done");
        }
        console.log('ods', 'AAAAAAAAAAAAA',);
        od.innerHTML = htmlx;
        setTimeout(() => {
            duplicates.forEach(v => {
                document.querySelectorAll(`#orders [title="${v}"]`).forEach(v1 => {
                    let cl = v1.classList; cl.add('w3-blue');
                    if (cl.contains("w3-red")) { cl.remove("w3-red"); }
                })
            })
        }, 8)

        // Sync orders to Live Website sheet
        syncOrdersToLiveWeb();

    });
};

(async () => { checkPendingSync(); await getdata(); await getbookedlabel(); })();

async function getbookedlabel() {
    await fetch('https://docs.google.com/spreadsheets/d/1RErftkKVUQWwCC6FqQJJqzGLY3niMwVv2s-ThdtFfRU/gviz/tq?tqx=out:csv').then(v => v.text()).then((t) => {
        if (t.length) {
            getbookedlabel.t1 = t;
            getbookedlabel.t2 = t.split('\n').map(v => JSON.parse('[' + v + ']'));//console.log(t1);
            searchlabel();
        }
    });
}

function searchlabel() {
    if (!getbookedlabel.t1.length && !ods.length) { return; }
    Object.keys(ods).forEach(id => {
        if (getbookedlabel.t1.includes(id)) {
            // console.log('includes',id);
        } else {
            // console.log('Not includes', id);
            let m = ods[id].shp.slice(-1);
            // console.log(m);
            if (m == 1 || (m == 4 && ods[id]?.tchmth?.includes("z"))) {
                document.querySelector('#b' + id + ' > div').classList.add('w3-red', 'w3-tag');
            }
        }
    })
}

function openwh(n) { window.open(`whatsapp://send/?phone=%2B91${n}&text&type=phone_number&app_absent=0`, "_blank"); }
function escapeHtml(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
let intv;
function Refresh(t) {
    intv = setInterval(async () => {
        let h = new Date().getHours(); console.log(h);
        if (9 > h || h > 19) { clearInterval(intv); console.log('clearInterval') }
        if (!Object.keys(sel).length) { await getdata(); }
    }, 1000 * t);
}

Refresh(60);

async function done() {
    let sel1 = Object.keys(sel);
    if (sel1.length) {
        let dubli = JSON.parse(localStorage.dubli);
        sel1.forEach(v => {
            let e = document.getElementById('b' + v);
            e.classList.add('w3-opacity-max');
            let i = e.title;
            if (dubli.includes(i)) {
                console.log('ddd1', v, sel1);
                // delete v from sel1
            } else {
                dubli.push(i); console.log('ddd2', v, sel1, sel[v]);
            }
        });
        let s = 150;
        if (dubli.length > s) {
            dubli = dubli.splice(-s);
        }
        localStorage.setItem('dubli', JSON.stringify(dubli));// sel1={"q":"dx","v":sel1};
        let fmd = new FormData(); fmd.append("myd", JSON.stringify(sel1));
        console.log(fmd); await clearsel();
        await fetch("https://script.google.com/macros/s/AKfycbxJs1MUozlOyJWpxY4EQmBL3qSkQq6hVKUwmvhSn53Fuhwh6Q3-Tzu3ntuAjqa0aTcK/exec", { method: 'POST', body: fmd }).then(res => res.json()).finally((v) => {
            // setTimeout(async()=>{await getdata();},100)
        })
        // Done orders STAY in live sheet cache (counted as sold)
    }

}

async function deleteod() {
    let sel1 = Object.keys(sel);
    if (!sel1.length) return;

    sel1.forEach(v => {
        let e = document.getElementById('b' + v);
        if (e) e.classList.add('w3-opacity-max');
    });
    await clearsel();

    // Step 1: Remove from PendingOrder (same as Done)
    let fmd = new FormData();
    fmd.append("myd", JSON.stringify(sel1));
    fetch("https://script.google.com/macros/s/AKfycbxJs1MUozlOyJWpxY4EQmBL3qSkQq6hVKUwmvhSn53Fuhwh6Q3-Tzu3ntuAjqa0aTcK/exec", { method: 'POST', body: fmd, mode: 'no-cors' });

    // Step 2: Remove from Live Website sheet and re-sync (GET-based)
    deleteLiveWebOrder(sel1);

    snackbar('Deleted', 1500);
}

function omprint() {
    if (Object.keys(sel).length) {
        // let myW= window.open("", "_blank"); let winbody = myW.document.body;
        // winbody.setAttribute('onclick', 'print()');
        let pd = '';
        pd += "<style>body{margin: 5px 5px 0 5px}div.bd {padding: 10px 10px 0 10px;margin-bottom: 4px;overflow: auto;font-size: 18px;font-family: sans-serif;font-weight: 600;border-style: dashed;border-width: 0.5px;}table, th, td {border: 1px solid black;border-collapse: collapse;text-align: center;font-weight: 600;font-size: 22px; padding: 4px;}#tblom1 {width: 100%;border: none;margin: 10px 0;}#tblom1  tbody tr:first-child{color:blue;background: #ffdfdd;}</style><div id='my56'></div>";
        // winbody.addEventListener("click", () => myW.close());

        for (const p in sel) {
            let d = ods[p]; //;
            let detailx = `<div><span style='float: left;padding-bottom: 12px;'>Bill To: ${d.nm}<br/>Total: ${(d.shp.slice(0, -2) || 'NA') + ', ' + odtype[d.shp.slice(-1)]}</span><span style='float: right'>Invoice No.: ${Number(p.slice(6, 13))}<br/>Date: ${dt(d.dt)}</span></div><div style='break-after:page;'><table><tbody></tbody></table>`;
            pd += '<div class="bd">' + detailx + gentbl(d.od) + '</div></div>';
            document.querySelector('#orders #b' + p + ' input').checked = false;
            delete sel[p];
        }
        let m = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body onclick="print()">${pd}</body></html>`;
        const blob = new Blob([m], { type: 'text/html' });
        const url = URL.createObjectURL(blob); window.open(url, "_blank");
        // winbody.innerHTML='<div>'+pd+'</div>';
        // URL.revokeObjectURL(url);
    }
}
let x1 = { 'XS': 0, 'S': 1, 'M': 2, 'L': 3, 'XL': 4, 'XXL': 5 };
let x2 = { '36': 0, '38': 1, '40': 2, '42': 3, '44': 4, '46': 5 };
let x3 = { '20': 0, '22': 1, '24': 2, '26': 3, '28': 4, '30': 5, '32': 6, '34': 7 };
let x10 = Object.keys(x1), x20 = Object.keys(x2), x30 = Object.keys(x3);
function gentbl(f) {
    let x; let totxx = 0; let type = '';

    Object.keys(f).forEach(t => { // type loop
        let size = ``;
        let color = ''; let sizes = []; let tot = 0;
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
                tot += (f[t][c][s] || 0);
                indx[x[s]] = `<td>${f[t][c][s] || ''}</td>`;
            });
            color += `<tr data-t="${t}" data-c="${c}"><th>${c}</th>${indx.join('')}</tr>`;
        }); totxx += tot;
        type += `<tbody><tr><td colspan="5" class="w3-blue">${t}${'<b> - (' + tot + 'pc)</b>'}</td></tr></tbody><tbody><tr><th>-</th>${size}${color}</tbody><tbody><tr><td style="border: none; background: white"><br></td></tr></tbody>`;
    });
    return `<table id='tblom1' name='${totxx}'>${type}</table>`;
}
// function gentbl(f) {
// let x;
//  let type = `<table id='tblom1'>`;
//     Object.keys(f).forEach(t=> { // type loop
//         let size = ``;
//         let color = '';let sizes=[];let tot=0;
//         let cv=Object.keys(f[t]);cv=Object.keys(f[t][cv[0]])[0];
//         console.log(cv);
//         if(x1.hasOwnProperty(cv)){x=x1;sizes=x10;}
//         else if(x2.hasOwnProperty(cv)){x=x2;sizes=x20;}
//         else if(x3.hasOwnProperty(cv)){x=x3;sizes=x30;}

//         sizes.forEach(s =>size += `<th>${s}</th>`);
//         size += `</tr>`;

//         Object.keys(f[t]).forEach(c => { // color loop
//             let indx=[];
//             sizes.forEach(s => { // size loop
//                 tot+=(f[t][c][s] || 0);
//                 indx[x[s]]=`<td>${f[t][c][s] || ''}</td>`;
//             });
//             color += `<tr><th>${c}</th>${indx.join('')}</tr>`;
//         });

//         type += `<tbody><tr><th>${t}${'<b> - ('+tot+'pc)</b>'}</th>${size}${color}</tbody><tbody><tr><td style="border: none; background: white"><br></td></tr></tbody>`;
//         // m += type;
//     });
//     return type+`</table>`;
// }

let bill;
async function dlbill(v) {
    let last = Object.keys(sel);
    if (last.length) {
        last = ods[last.pop()]; let mx = [];
        // if (last.tch?.includes(',') && last.shp.slice(-1) == '4') {
        if (last.shp.slice(-1) == '4') {
            bilnn({ ...last, shp: last.shp.replace(',4', ',4rkb') }); return;
        }
        if (last.gstno) {
            return await fetch('https://jz3f7gi2t35icvvwrgn2tk2ay40dlbxi.lambda-url.ap-south-1.on.aws' + '/?v=' + last.odid).then(async (res) => {
                if (res.status !== 200) {
                    alert('E-Invoice Fail To Generate');
                    bilnn(last); return;
                }

                mx = await res.json();
                if (mx.pdf) {
                    clearsel();
                    window.open(mx.pdf, '_blank');
                    // let link = document.createElement('a');
                    // link.href = mx.pdf;
                    // link.target = '_blank';link.rel = 'noopener noreferrer';
                    // link.download = `Invoice_${last.odid.slice(-13)}.pdf`;
                    // document.body.appendChild(link);
                    // link.click();
                    // document.body.removeChild(link);
                } else {
                    bilnn(last);
                }
            }).catch(() => {
                alert('E-Invoice Fail To Generate');
                bilnn(last); return;
            });
        }
        bilnn(last);
    }
}

async function bilnn(last) {
    let w = window.open("");
    w['aaa'] = last; w.x1 = x1; w.x2 = x2; w.x3 = x3; w.x10 = x10; w.x20 = x20; w.x30 = x30;
    if (!bill) {
        await fetch('bill.html').then(v => v.text()).then(v => { bill = v; });
    }
    w.document.open();
    w.document.write(bill);
    w.document.close();
    clearsel();
}
function snackbar(txt, time) {
    return new Promise(res => {
        let x = document.getElementById("snackbar");
        x.style.display = ''; x.innerHTML = txt;
        setTimeout(() => { x.style.display = 'none'; res(1) }, time);
    })
}

function printadd() {
    if (Object.keys(sel).length) {
        let htmladd = '<style>a{text-decoration: none;color: black;}body{margin: 0; padding: 0;color: #000; background: #fff;}@media print {#pbr{page-break-after: always;display: block;}}.p2 span {font-weight: 400;}.p1{font-size: 32px!important;font-weight: initial;}.p2{font-size: 16px!important;}.p2 div{font-weight:bold}</style>';
        //   let t1=odtype[v.shp.slice(-1)];
        //   if((t1=='T')||(t1=='Tr')){
        Object.keys(sel).forEach((v, i) => {
            let v1 = v;
            v = ods[v];
            console.log(v);
            let t1 = odtype[v.shp.slice(-1)];
            if ((t1 == 'T') || (t1 == 'Tr')) {
                let add = ''; let add1 = '';
                if (v.add) {
                    add = v.add?.split(',');// "Uttar Pradesh,Noida,adasda,5fddd,,ZyJyZtZwZyZwZs=="
                    add1 = add[2].slice(0, 15) + ' ' + (isFinite(add[5]) ? add[5] : atob(vde(add[5], tde)));
                    add = add[3] + ', ' + add[1] + ', ' + add[0];
                } else { add = v.station }
                if (v.station) { add = v.station }
                let cadd = '<h1 class="p1"><b>To </b>- ' + v.nm + ', ' + v.mn1 + '<br>' + add + '</span></h1>';
                let radd = `<h1><span class="p2"><div><b>Return address if not delivered</b><br></div><span>Own Knitted, 9336695049</span><br><span>F-120, Gujjar chowk, Khanpur, Delhi, 110062<b style="color: #00000026;float: right;font-size:12px">${add1}</b></span></span></h1>`;

                let om = '<hr style="border-top: 2px dashed #000;padding: 0;margin: 0;">';
                if (!((i + 1) % 3)) {
                    om = '<span id="pbr"></span>';
                }
                htmladd += cadd + radd + om;
                document.querySelector('#orders #b' + v1 + ' input').checked = false;
                delete sel[v1];
            }
        })
        clearsel();
        setTimeout(() => {
            let myWindow = window.open("", "_blank"); let body1 = myWindow.document.body;
            body1.setAttribute('onclick', 'print()');
            body1.innerHTML += htmladd;
            myWindow.print();
            // myWindow.close();
        }, 150);
        // }else if((t1=='A')||(t1=='DA')){//||(t1=='AE')||(t1=='A5')||(t1=='A10')
        //     printMergedPDFs()
        // }
    } else {
        alert('Select first!!')
        // document.getElementById('id01').scrollTop = 0;
        // document.getElementById('id01').scrollTo({top: 0, behavior: 'smooth'});
    }
}

async function mergePDFsFromLinks(pdfUrls) {
    const { PDFDocument, rgb } = PDFLib;
    const mergedPdf = await PDFDocument.create();
    try {
        const fetchPromises = pdfUrls.map(url =>
            fetch(url[1]).then(r => r.arrayBuffer()).then(a => ({ url, a, success: true }))
                .catch(error => {
                    console.error(`Error fetching ${url[1]}:`, error);
                    return { url, error, success: false };
                })
        );

        const results = await Promise.all(fetchPromises);
        console.log('All PDFs fetched!');
        for (const result of results) {
            if (result.success) {
                try {
                    const pdf = await PDFDocument.load(result.a);
                    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    pages.forEach(page => {
                        page.drawRectangle({
                            x: 7.6,
                            y: 55,
                            width: 200,
                            height: 13,
                            color: rgb(1, 1, 1),
                        });
                        return mergedPdf.addPage(page)
                    });
                    console.log(`✓ Merged: ${result.url}`);
                } catch (error) {
                    console.error(`Error processing PDF from ${result.url}:`, error);
                }
            }
        }
        const mergedPdfBytes = await mergedPdf.save();
        return mergedPdfBytes;
    } catch (error) {
        console.error('Error merging PDFs:', error);
        throw error;
    }
}
async function printMergedPDFs(pdfUrls = []) {
    getbookedlabel.tNoLabel = []; let k = Object.keys(sel);
    if (ods[k[0]].tch.includes(',')) {
        getbookedlabel.t2.findLast(v => {
            if (v[0].includes(k[0])) {
                window.open(v[1]); return true;
            }
        })
        clearsel(); return;
    }
    k.forEach(id => {
        document.querySelector('#orders #b' + id + ' input').checked = false;
        delete sel[id];
        getbookedlabel.t2.findLast(v => {
            if (v[0].includes(id)) {
                console.log(v);
                pdfUrls.push(v);
                return true
            }
        })
        if (!getbookedlabel.t1.includes(id)) { getbookedlabel.tNoLabel.push(id); }
    })
    clearsel();
    console.log('No label', getbookedlabel.tNoLabel);
    const pdfBytes = await mergePDFsFromLinks(pdfUrls);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl);
    printWindow.onload = function () { printWindow.print(); };
}

const tde = { "=": "=", 8: 0, 2: 1, 5: 2, 7: 3, 2: 4, 3: 5, 1: 6, 9: 7, 6: 8, 4: 9, b: "a", d: "b", f: "c", h: "d", j: "e", l: "f", n: "g", p: "h", r: "i", t: "j", v: "k", x: "l", z: "m", a: "n", c: "o", e: "p", g: "q", i: "r", k: "s", m: "t", o: "u", q: "v", s: "w", u: "x", w: "y", y: "z", B: "A", D: "B", F: "C", H: "D", J: "E", L: "F", N: "G", P: "H", R: "I", T: "J", V: "K", X: "L", Z: "M", A: "N", C: "O", E: "P", G: "Q", I: "R", K: "S", M: "T", O: "U", Q: "V", S: "W", U: "X", W: "Y", Y: "Z" };
const vde = (t, m) => { let ct = ''; for (let c of t) { ct += m[c]; } return ct };

function book() {
    if (Object.keys(sel).length == 1) {
        let d = ods[Object.keys(sel).pop()];
        let m = d.shp.slice(-1);
        if (m == 1 || m == 4) {
            clearsel();
            let bn = `podid=${encodeURIComponent(d.odid)}`;
            bn = 'https://script.google.com/macros/s/AKfycbxXWJGTlbU8oiXqBJ7a678POQhCC7sdcqlotW4mXKmiQiOBsjMCpOtywWjINo28GGLtDg/exec?' + bn;
            // bn='/favicon.ico?'+bn;
            if (!d.tch?.includes('zz')) { //rkb or shp not delhivery

                if ((d.ttpc > 49999.99) && d.tch?.includes(',')) {
                    let eway = prompt("Enter Eway bill number", "");
                    if (!eway) {
                        snackbar(Number(d.odid.slice(-13).slice(6, 13)) + '. ' + d.nm.slice(0, 5) + ' Cancel', 1000);
                        return
                    }
                    bn += `&eway=${eway}`;
                }

                if (d.dl[1] >= 33) {
                    let nop = prompt("Enter no. of packages", 2);
                    console.log(nop);
                    if (nop) {
                        bn += `&nop=${nop}`;
                    } else {
                        snackbar(Number(d.odid.slice(-13).slice(6, 13)) + '. ' + d.nm.slice(0, 5) + ' Cancel', 1000);
                        return
                    }
                } else {
                    bn += `&nop=0`;
                }
            } else { //shp
                bn += `&nop=0`;
            }
            snackbar(Number(d.odid.slice(-13).slice(6, 13)) + '. ' + d.nm.slice(0, 5) + ' Booking', 1000);
            postms(['fetch', { "odid": d.odid.slice(-13), "url": bn, "opt": {} }]);

        } else {
            alert('Keval Courier!! Kuch Aur nhi')
        }
    } else { alert('Ek Select Kero!! Jada nhi') }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw1.js').then(function (registration) {
            // console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (error) {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}

function postms(v) { navigator.serviceWorker.controller.postMessage(v); }

function holdn() {
    let selc = Object.keys(sel);
    if (selc.length) {
        clearsel(); let s = selc.pop(); console.log(selc, s); s = { "q": "hd", "v": s };
        let fmd = new FormData(); fmd.append("myd", JSON.stringify(s));
        fetch("https://script.google.com/macros/s/AKfycbwAERsQuAd05odSohoOxFDFN6fvL5jznyTWt7aGou2CJPHd2GgOliAmxFljAfmJFMq-/exec", { method: 'POST', body: fmd }).then(res => res.json()).finally((v) => {
            snackbar('Hold', 1000); setTimeout(async () => { await getdata(); }, 1000)
        })
    }
}

// async function requestNotificationPermission() {
//     if ('Notification' in window) {
//         const permission = await Notification.requestPermission();
//         return permission === 'granted';
//     }
//     return false;
// }

// function sendNotification(title, body, icon = '/icon/192.png') {
//     if (Notification.permission === 'granted') {
//         new Notification(title, {
//             body: body,
//             icon: icon,
//             badge: '/icon/152.png',
//             vibrate: [200, 100, 200]
//         });
//     }
// }

// async function subscribe() {
//     if ('Notification' in window) {
//         const p = await Notification.requestPermission();
//         if (p === 'granted') {
//             let sw = await navigator.serviceWorker.ready;
//             let push = await sw.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: 'BIGvfzzmiHzDp__5S3NCDDhMnfpB9fdGQIFnoVwCOc2R_Ei25DzrMv1y67n2xt8WcJGM_isg4mRCbn7DezZN1C8' });
//             if (!localStorage.sub) {
//                 let sub = JSON.stringify(push), fmd = new FormData(); fmd.append("myd", sub);//console.log(sub,fmd);
//                 fetch('https://script.google.com/macros/s/AKfycbymKo8Dy8EXXv7Sz65m5D2x34UqMnlcDsUM5y5_lrTbU9xE-Y4tyPdrK3hgQzGFXbxVaw/exec', { method: 'POST', body: fmd, keepalive: true, redirect: 'follow' }).then(res => res.json()).finally((v) => {
//                     snackbar('Notification ON', 1000); localStorage.setItem('sub', 'Y');
//                 });
//             }
//         } else if (p === 'denied') { alert('Notification permission Blocked. Please Allow it in your browser/app settings.'); };
//     }
// }

// =====================================================
// LIVE WEBSITE SHEET SYNC — v3.1 (with retry + failed sync tracking)
// =====================================================
// How it works:
//   1. startOd comes from cell B1 in the Google Sheet (source of truth)
//   2. localStorage.liveWebOrders = cache of all orders from startOd onwards
//   3. New orders from getdata() → added to cache (keeps growing)
//   4. Done orders → STAY in cache (stock already sold, keeps counting)
//   5. Deleted orders → REMOVED from cache via deleteLiveWebOrder()
//   6. Edited orders → UPDATED in cache via updateLiveWebOrder()
//   7. After any change → aggregate cache → send to sheet via GET
//   8. Failed syncs → auto-retry 3 times, then show red indicator
//
// Why GET not POST:
//   Google Apps Script redirects POST with 302, browser changes to GET,
//   POST body is lost. GET works because params are in the URL.
//
// Data format in URL: product~color~size~qty joined by * for rows
//   Example: T-Shirt~Red~M~5*Pants~Black~L~3
// =====================================================

// Failed sync tracking
let syncRetryCount = 0;
let syncRetryTimer = null;
const SYNC_MAX_RETRIES = 3;

function updateSyncIndicator(status, msg) {
    let el = document.getElementById('syncIndicator');
    if (!el) return;
    if (status === 'ok') {
        el.style.display = 'none';
        localStorage.removeItem('syncFailed');
    } else if (status === 'retrying') {
        el.style.display = 'block';
        el.style.background = '#ff9800';
        el.textContent = '⟳ Sync retry ' + syncRetryCount + '/' + SYNC_MAX_RETRIES + '...';
    } else if (status === 'failed') {
        el.style.display = 'block';
        el.style.background = '#f44336';
        el.textContent = '✗ Sync failed — tap to retry';
        localStorage.setItem('syncFailed', Date.now());
    }
}

// Check on page load if there was a previous failed sync
function checkPendingSync() {
    let failed = localStorage.getItem('syncFailed');
    if (failed) {
        updateSyncIndicator('failed');
    }
}


// Fetch startOd from sheet B1 (source of truth), then sync
function syncOrdersToLiveWeb() {
    let scriptUrl = localStorage.getItem('liveWebSheetScriptUrl');
    if (!scriptUrl) return;

    // If we already have a cached startOd, sync immediately with it
    let cached = localStorage.getItem('liveWebSheetStartOd');
    if (cached && Number(cached)) {
        mergeAndSync(Number(cached));
    }

    // Also fetch latest B1 in background to stay updated
    fetchStartOdFromSheet();
}

// Fetch B1 from sheet, update cache if changed, re-sync if needed
function fetchStartOdFromSheet() {
    let scriptUrl = localStorage.getItem('liveWebSheetScriptUrl');
    if (!scriptUrl) return;

    let sep = scriptUrl.includes('?') ? '&' : '?';
    fetch(scriptUrl + sep + '_t=' + Date.now(), { redirect: 'follow' })
        .then(r => r.ok ? r.json() : Promise.reject('HTTP ' + r.status))
        .then(d => {
            if (!d.startOd) return;
            let newOd = String(d.startOd);
            let old = localStorage.getItem('liveWebSheetStartOd');
            if (newOd !== old) {
                console.log('[SYNC] B1 startOd changed:', old, '→', newOd);
                localStorage.removeItem('liveWebOrders'); // new startOd = fresh start
                localStorage.setItem('liveWebSheetStartOd', newOd);
                mergeAndSync(Number(newOd)); // re-sync with new startOd
            }
        })
        .catch(e => console.warn('[SYNC] Failed to fetch B1:', e));
}

// Merge pending orders into cache and send to sheet
function mergeAndSync(fromNum) {
    let cache = JSON.parse(localStorage.liveWebOrders || '{}');

    // Add/update every pending order that is >= startOd
    for (let id in ods) {
        if (Number(id) < fromNum) continue;
        let od = ods[id]?.od;
        if (od && typeof od === 'object') {
            cache[id] = od;
        }
    }
    // Done orders STAY in cache — stock was sold, total keeps growing

    localStorage.setItem('liveWebOrders', JSON.stringify(cache));
    sendSyncToSheet();
}

// Step 2: aggregate the cache and send to Google Sheet
function sendSyncToSheet() {
    let scriptUrl = localStorage.getItem('liveWebSheetScriptUrl');
    if (!scriptUrl) return;

    let cache = JSON.parse(localStorage.liveWebOrders || '{}');

    // Aggregate: type > color > size > total qty
    let agg = {};
    let orderCount = 0;
    let totalQty = 0;

    for (let id in cache) {
        let od = cache[id];
        if (!od || typeof od !== 'object') continue;
        orderCount++;
        for (let type in od) {
            if (!agg[type]) agg[type] = {};
            for (let color in od[type]) {
                if (!agg[type][color]) agg[type][color] = {};
                for (let size in od[type][color]) {
                    let qty = Number(od[type][color][size]) || 0;
                    agg[type][color][size] = (agg[type][color][size] || 0) + qty;
                    totalQty += qty;
                }
            }
        }
    }

    // Build compact string: product~color~size~qty joined by *
    let rows = [];
    for (let t in agg) {
        for (let c in agg[t]) {
            for (let s in agg[t][c]) {
                rows.push(t + '~' + c + '~' + s + '~' + agg[t][c][s]);
            }
        }
    }
    let dataStr = rows.join('*');

    // Build GET URL
    let sep = scriptUrl.includes('?') ? '&' : '?';
    let url = scriptUrl + sep + 'action=sync&n=' + orderCount + '&q=' + totalQty + '&d=' + encodeURIComponent(dataStr);

    console.log('[SYNC] sending — orders:', orderCount, '| rows:', rows.length, '| qty:', totalQty, '| url length:', url.length);

    fetch(url, { redirect: 'follow' })
        .then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(d => {
            console.log('[SYNC] SUCCESS', d);
            syncRetryCount = 0;
            if (syncRetryTimer) { clearTimeout(syncRetryTimer); syncRetryTimer = null; }
            updateSyncIndicator('ok');
            snackbar('Synced ' + d.synced + ' rows', 1500);
            // Update cached startOd from sheet B1 if it changed
            if (d.startOd) {
                let newOd = String(d.startOd);
                let old = localStorage.getItem('liveWebSheetStartOd');
                if (newOd !== old) {
                    console.log('[SYNC] B1 changed during sync:', old, '→', newOd);
                    localStorage.removeItem('liveWebOrders');
                    localStorage.setItem('liveWebSheetStartOd', newOd);
                    mergeAndSync(Number(newOd));
                }
            }
        })
        .catch(e => {
            console.error('[SYNC] FAILED', e);
            syncRetryCount++;
            if (syncRetryCount <= SYNC_MAX_RETRIES) {
                let delay = syncRetryCount * 3000; // 3s, 6s, 9s
                console.log('[SYNC] Retrying in ' + delay + 'ms (attempt ' + syncRetryCount + ')');
                updateSyncIndicator('retrying');
                snackbar('Sync failed, retrying in ' + (delay / 1000) + 's...', 2000);
                syncRetryTimer = setTimeout(() => sendSyncToSheet(), delay);
            } else {
                console.error('[SYNC] All retries failed');
                updateSyncIndicator('failed');
                snackbar('Sync failed after ' + SYNC_MAX_RETRIES + ' retries!', 4000);
                syncRetryCount = 0;
            }
        });
}

// Called from deleteod() — removes orders from cache and updates sheet
function deleteLiveWebOrder(orderIds) {
    let cache = JSON.parse(localStorage.liveWebOrders || '{}');
    orderIds.forEach(id => delete cache[id]);
    localStorage.setItem('liveWebOrders', JSON.stringify(cache));
    sendSyncToSheet();
}

// Called from edit.js — updates order quantity in cache and updates sheet
function updateLiveWebOrder(orderId, newOdData) {
    let cache = JSON.parse(localStorage.liveWebOrders || '{}');
    cache[orderId] = newOdData;
    localStorage.setItem('liveWebOrders', JSON.stringify(cache));
    sendSyncToSheet();
}

// ===== Sync Settings UI =====
function openSyncSettings() {
    document.getElementById('syncScriptUrl').value = localStorage.getItem('liveWebSheetScriptUrl') || '';
    document.getElementById('syncModal').style.display = 'block';
    document.getElementById('syncStatus').style.display = 'none';
}

// Test button: writes a test value to F1 of the sheet to prove the connection works
function testSync() {
    let url = document.getElementById('syncScriptUrl').value.trim();
    let el = document.getElementById('syncStatus');
    if (!url) { el.style.display = 'block'; el.style.background = '#f44336'; el.style.color = '#fff'; el.textContent = 'Enter URL first'; return; }

    el.style.display = 'block'; el.style.background = '#ffc107'; el.style.color = '#000';
    el.textContent = 'Sending test...';

    let testMsg = 'dashboard-test-' + Date.now();
    let sep = url.includes('?') ? '&' : '?';
    fetch(url + sep + 'action=test&msg=' + encodeURIComponent(testMsg), { redirect: 'follow' })
        .then(r => {
            console.log('[TEST] response status:', r.status, 'ok:', r.ok);
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(d => {
            console.log('[TEST] response:', d);
            if (d.error) throw new Error(d.error);
            el.style.background = '#4CAF50'; el.style.color = '#fff';
            el.textContent = 'SUCCESS! Check cell F1 in Live Website sheet. Value: ' + d.value;
        })
        .catch(e => {
            console.error('[TEST] FAILED:', e);
            el.style.background = '#f44336'; el.style.color = '#fff';
            el.textContent = 'FAILED: ' + (e.message || e);
        });
}

function saveSyncSettings() {
    let url = document.getElementById('syncScriptUrl').value.trim();
    let el = document.getElementById('syncStatus');

    if (!url) { el.style.display = 'block'; el.style.background = '#f44336'; el.style.color = '#fff'; el.textContent = 'Enter URL'; return; }

    el.style.display = 'block'; el.style.background = '#ffc107'; el.style.color = '#000';
    el.textContent = 'Connecting...';

    // Verify script version with ping
    let sep = url.includes('?') ? '&' : '?';
    fetch(url + sep + 'action=ping', { redirect: 'follow' })
        .then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(d => {
            console.log('[SAVE] ping response:', d);
            if (d.error) throw new Error(d.error);
            if (!d.v || d.v < 4) throw new Error('Old script deployed. Need v4+. Got v' + (d.v || '?') + '. Deploy the NEW script as a NEW deployment.');

            localStorage.setItem('liveWebSheetScriptUrl', url);

            // Fetch startOd from B1 immediately
            return fetch(url + sep + '_t=' + Date.now(), { redirect: 'follow' })
                .then(r => r.ok ? r.json() : Promise.reject('HTTP ' + r.status))
                .then(b1 => {
                    if (b1.startOd) {
                        let newOd = String(b1.startOd);
                        let old = localStorage.getItem('liveWebSheetStartOd');
                        if (newOd !== old) {
                            localStorage.removeItem('liveWebOrders');
                            localStorage.setItem('liveWebSheetStartOd', newOd);
                        }
                        el.style.background = '#4CAF50'; el.style.color = '#fff';
                        el.textContent = 'Saved! Script v' + d.v + ' | Start: ' + newOd;
                    } else {
                        el.style.background = '#ff9800'; el.style.color = '#fff';
                        el.textContent = 'Saved! But B1 is empty — enter start order in B1';
                    }

                    setTimeout(() => {
                        document.getElementById('syncModal').style.display = 'none';
                        el.style.display = 'none';
                        syncOrdersToLiveWeb();
                    }, 1500);
                });
        })
        .catch(e => {
            console.error('[SAVE] FAILED:', e);
            el.style.background = '#f44336'; el.style.color = '#fff';
            el.textContent = 'FAIL: ' + (e.message || e);
        });
}

// ===== Export (From-To) — shows BOTH sources for cross-verification =====
function openExportModal() {
    document.getElementById('exportFrom').value = '';
    document.getElementById('exportTo').value = '';
    document.getElementById('exportResult').style.display = 'none';
    document.getElementById('exportModal').style.display = 'block';
}

function aggregateOrders(source, from, to) {
    let totalQty = 0, orderCount = 0, agg = {};
    if (source === 'cache') {
        let cache = JSON.parse(localStorage.liveWebOrders || '{}');
        for (let key in cache) {
            let num = Number(key.slice(6, 13));
            if (num < from || num > to) continue;
            let od = cache[key];
            if (!od || typeof od !== 'object') continue;
            orderCount++;
            for (let type in od) {
                if (!agg[type]) agg[type] = {};
                for (let color in od[type]) {
                    if (!agg[type][color]) agg[type][color] = {};
                    for (let size in od[type][color]) {
                        let qty = Number(od[type][color][size]) || 0;
                        agg[type][color][size] = (agg[type][color][size] || 0) + qty;
                        totalQty += qty;
                    }
                }
            }
        }
    } else {
        for (let key in ods) {
            let num = Number(key.slice(6, 13));
            if (num < from || num > to) continue;
            let od = ods[key]?.od;
            if (!od || typeof od !== 'object') continue;
            orderCount++;
            for (let type in od) {
                if (!agg[type]) agg[type] = {};
                for (let color in od[type]) {
                    if (!agg[type][color]) agg[type][color] = {};
                    for (let size in od[type][color]) {
                        let qty = Number(od[type][color][size]) || 0;
                        agg[type][color][size] = (agg[type][color][size] || 0) + qty;
                        totalQty += qty;
                    }
                }
            }
        }
    }
    let lines = [];
    for (let t in agg) for (let c in agg[t]) for (let s in agg[t][c])
        lines.push(t + ' | ' + c + ' | ' + s + ' : ' + agg[t][c][s]);
    return { totalQty, orderCount, lines };
}

function renderExportBlock(label, color, r) {
    if (r.orderCount === 0)
        return '<div style="background:#ff9800;color:#fff;padding:10px;border-radius:4px;margin-bottom:8px;text-align:center;font-weight:bold;">' +
            label + ': No orders found</div>';
    return '<div style="background:' + color + ';color:#fff;padding:10px;border-radius:4px;margin-bottom:8px;font-weight:bold;text-align:center;">' +
        '<div style="font-size:12px;">' + label + '</div>' +
        '<div>Orders: ' + r.orderCount + ' | Total Qty: <span style="font-size:22px;">' + r.totalQty + '</span></div>' +
        '<div style="margin-top:8px;font-size:13px;text-align:left;max-height:180px;overflow:auto;">' +
        r.lines.map(l => '<div>' + l + '</div>').join('') + '</div></div>';
}

function liveExportFromTo() {
    let fromVal = document.getElementById('exportFrom').value.trim();
    let toVal = document.getElementById('exportTo').value.trim();
    let el = document.getElementById('exportResult');

    if (!fromVal || !toVal) {
        el.style.display = 'block'; el.style.background = '#f44336'; el.style.color = '#fff';
        el.textContent = 'Enter both From and To order numbers';
        return;
    }
    let from = Number(fromVal), to = Number(toVal);
    if (from > to) {
        el.style.display = 'block'; el.style.background = '#f44336'; el.style.color = '#fff';
        el.textContent = 'From must be less than or equal to To';
        return;
    }

    let cacheResult = aggregateOrders('cache', from, to);
    let dashResult = aggregateOrders('dashboard', from, to);

    let match = cacheResult.totalQty === dashResult.totalQty && cacheResult.orderCount === dashResult.orderCount;
    let matchBar = match
        ? '<div style="background:#2196F3;color:#fff;padding:6px;border-radius:4px;text-align:center;font-weight:bold;margin-bottom:8px;">MATCH — Both sources agree</div>'
        : '<div style="background:#f44336;color:#fff;padding:6px;border-radius:4px;text-align:center;font-weight:bold;margin-bottom:8px;">MISMATCH — Values differ! (Sync cache has done+pending, Dashboard has only pending)</div>';

    el.style.display = 'block';
    el.style.background = '#fff';
    el.style.color = '#000';
    el.innerHTML = matchBar +
        renderExportBlock('Sync Cache (pending + done orders)', '#4CAF50', cacheResult) +
        renderExportBlock('Dashboard (only pending orders)', '#607D8B', dashResult);
}
