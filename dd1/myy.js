//alert('hi')
function resetd() {
let from=Number(localStorage.fromod);let crrodno=Number(zxc);
 let odcount=1+crrodno-from;let oldm1=localStorage.lastreset.split(','); // '304,34' 
 let oldmc='';
 if(oldm1[0]!=date1){oldmc='\nAnd old month('+oldm1[0]+') from '+oldm1[1];}
 if(odcount){
    let per1 = prompt("Please enter 'ok' to download\nthis month from "+from+" to "+zxc+oldmc);
    if (per1==="ok") {
      // {p:0,g:'odt',od:{}};
      let lastr=date1+','+(1+crrodno);
      const shod2={"p":"2","g":selg,"od":{'Stock Not Updated from Order No':lastr}};
        couttot(from,selg).then(()=>{
          sendd(urli, shod2,'reset');
        })
        setTimeout(function(){
        tabletcsv('testTable',odcount+'('+from+'-'+zxc+')');
        localStorage.setItem('fromod',1+crrodno);
        localStorage.setItem('lastreset',lastr);
        //document.getElementById('tre6').innerHTML='';
        //document.getElementById('p781').click();
        //stockm();
        },4000)
    }
}else{alert("No data to download ")}
}

async function delod() {
  let an5={};let shod11={};let ptc;
  let latsel=Object.keys(selod5);
 if(latsel.length){
  let r=latsel.pop();
  let odno=r.slice(3);
  let text = "Want to delete? order No."+odno;
  console.log('hdhjd',selg);
  if (confirm(text) == true) {
    await mthdb(selg.slice(-1)+odno.slice(0,3));
    await oddb.od.get(Number(odno)).then((doc)=>{
    // od=doc.it;//let odno=selg.slice(-1)+doc.id;
    an5=doc;an5.tot=0;an5.it={};an5.tch=0;an5.och=0;an5.dis=0;an5.c=[];an5.pc={};an5.inv=[],an5.bulk=0;
    shod11={"p":"1","g":selg,"od":{...an5}};
    sendd(urli,shod11,'del order');
    // console.log(an5);
}).then(async() => {
  //console.log('hhhhh',shod11.od)
   await db.pt.get(shod11.od.pt).then((v)=>{
    let yu=v.ods.indexOf(selg.slice(-1)+odno);
    if (yu>(-1)) {v.ods.splice(yu, 1);}
    ptc=v;
    console.log(ptc,yu);
  })
  await db.pt.put(ptc,Number(shod11.od.pt));
  await bulkdb.bk.delete(shod11.od.id);
  await oddb.od.put(shod11.od,Number(odno)).then(response => {
    selod5={};
    document.querySelector('[name='+selg+']').click();
  })
  .catch(error => {
    alert('error in del update fn-', error);
    console.log('error in del update fn-', error);
  });})
  }
} else {alert('Bhaii, Pahle order select ker le !!')}}

var pk8;var oldod;
var instg={Delhi:'ods',Tiruppur:'odt',Kolkata:'odk',PD:'odpd'};

async function editod(tp) {
let nm={Bio:['Biowash R-neck, 36"-42"','Biowash R-neck, 44"-46"'],
NBio:['Cotton R-neck, 36"-42"','Cotton R-neck, 44"-46"','Cotton R-neck White, 36"-42"','Cotton R-neck White, 44"-46"'],
Hood:['Non Zipper Hoodie, S-XL','Non Zipper Hoodie, XXL'],
OverS:['O/S Drop-shoulder R-neck, S-XXL'],
Polo:['Polo neck, XS-XL','Polo neck, XXL'],
Sweat:['Sweatshirt, S-XL','Sweatshirt, XXL'],
Kids:['Kids R-neck, 20"-34"']}
  pk8=Number(tp.id.slice(1));// order id b34
  let cnv=document.getElementById('s'+pk8).tabIndex;
  
  await db.pt.get(cnv).then((v)=>{ptd=v});
  console.log(ptd,pk8,cnv);
  // db.pt.where('cn').equals(cnv).each((v)=>{ptd=v});
  // let st = new Localbase('st');
  // st.collection(selg).doc('od'+pk8).get().then(doc => {
    await mthdb(selg.slice(-1)+String(pk8).slice(0,3));
    await oddb.od.get(pk8).then((doc)=>{
    let ht=doc.cn;
    oldod=doc;
    oldod.tch&&(document.getElementById('tch').value = oldod.tch || '');
    oldod.och&&(document.getElementById('och').value = oldod.och || '');
    oldod.dis&&(document.getElementById('dis').value = oldod.dis || '');
   if(oldod.c){
    oldod.c.forEach((v)=>{
     // addtbl(v,pc,qt,d);
     let p9=v[0].slice(1).slice(0,-1);
     if (Number(v[0][0])) {
      addtbl(nm[p9][Number(v[0].slice(-1))],v[1],v[2],v[0]);
     }else{
      addtbl(p9,v[1],v[2],v[0]);
     }
    })
  }

    document.getElementById('frt').innerHTML="<strong>"+ht+"</strong>";
    // if(doc.bulk){document.getElementById('bulkc').checked=true;bulks();}else{document.getElementById('bulkc').checked=false;bulks();}
    if(doc.bulk){document.getElementById('bulkc').checked=true;}else{document.getElementById('bulkc').checked=false;}
    if (selg=='inst') {
      document.getElementById("gsel").value=instg[ht.trim()];
    } else {
      document.getElementById("gsel").value=selg;
    }
    if (doc.pc) {
      let obj1 = JSON.parse(localStorage.pc);
      let obj2 =doc.pc;
      prc={...obj1,pc:{...obj1.pc,...obj2}};
    }
    //console.log(prc);
    // console.log(doc.it)
  })
 
document.querySelectorAll('#id01 #tblom1 tbody').forEach(kjhu)
// for edit order
function kjhu(v) {//alert(v.id);document.getElementById('frt').innerText=.innerText.split('\n')[0].split(' ')[2];
    let qs1=v.innerText.split('\n');
    for (let u = 0; u < qs1.length; u++) {
        var wer5;
        if(u===0){
           wer5=qs1[u].split('\t')[0];
        }else{
           let jk=qs1[u].split('\t');
            for (let i = 0; i < jk.length; i++) {
                var wer6;
                if(i===0){wer6=jk[i]}else if(jk[i]){
                   // console.log(wer5,wer6,jk[i],i); // t,c,value,index
                    let ty6=document.querySelector('#'+wer5+' #'+wer6.replace(/\s+/, "")+' td:nth-child('+(i+1)+') input');
                   ty6.value=jk[i];triggerInput(ty6);
                }
            }
        }
    }
}

document.getElementById('id01').style.display='';
document.querySelector("div.bar button.tablink[onclick]").click();
 document.getElementById('btn_convert').style.display='none';
document.getElementById('upd5').style.display='';
function triggerInput(v) {
let event = new Event('input', {'bubbles': true,'cancelable': true});
v.dispatchEvent(event);
}}

async function updateod() {
//  if (selg=='inst') {
//   viewtotal();saveinst(0);
//  setTimeout(()=>{document.getElementById("instb").click()},100); 
//  }else{
viewtotal();
zsr.id = pk8;
zsr.cn = document.getElementById('u13').innerText;
zsr.tot = Number(total);
zsr.bulk = Number(document.getElementById('bulkc').checked);
zsr.dt = oldod.dt;
zsr.it = od;
zsr.inv=billinv;
zsr.tch=othch[0];
zsr.och=othch[1];
zsr.dis=othch[2];
let jkl=document.querySelectorAll('#ctm9 tr');
if (jkl.length) {
  let cods=[];
  jkl.forEach((v)=>{
    let pi=(v.innerText).split('\t');
    let pz1=Number(pi[1].trim());let pz2=Number(pi[2].trim());
    if (pz2) {
    cods.push([v.dataset.p,pz1,pz2]);
    zsr.inv[0]+=(pz1*pz2);
    zsr.inv[1]+=(pz1*pz2)+((pz1*pz2)*0.05);zsr.tot+=pz2;
    zsr.bulk=1;document.getElementById('bulkc').checked=1;
    }
    v.remove();
  });
  zsr.c=cods;
  console.log(cods);
}
zsr.pt=ptd.id;console.log(ptd.id);
let yu=ptd.ods.indexOf(selg.slice(-1)+pk8);
if(document.getElementById('bulkc').checked){
  ptd.ods.push(selg.slice(-1)+pk8);
  let uniq=[...new Set(ptd.ods)];
  ptd.ods=uniq;
  (async()=> {
    await bulkdb.bk.put({...zsr,"pt":ptd},zsr.id);
   })();
}else{
  // let yu=ptd.ods.indexOf(selg.slice(-1)+id55);
  if(yu>(-1)){
    ptd.ods.splice(yu, 1);
    (async()=> {
      await bulkdb.bk.put({...zsr,"pt":ptd},zsr.id);
     })();
  }
}
(async()=> {
  await db.pt.update(ptd.id, ptd);
 })();

const gsel=document.getElementById("gsel").value;
let shod1={};
if(!(selg==gsel)){
  (async () => {
  for (let u in selod5) {document.getElementById(u).checked=false;};
   selod5={};selod5[pk8]=pk8;unpin(1);selod5={}; // order id pk8=od34
   //document.querySelector("#oderli #"+pk8).parentElement.remove();
   shod1={"p":"4","g":selg,"gl":gsel,"od":{...zsr, "pc":{...odprice}}};
  await moveod(selg,gsel,'ods'+pk8);
})();
}

 // alert('g normal')
shod1={"p":"1","g":gsel,"od":{...zsr, "pc":{...odprice}},ptd};
sendd(urli,shod1,'update order');

// let st = new Localbase('st');
// st.collection(selg).doc('od'+pk8).set(shod1.od)
await mthdb(selg.slice(-1)+String(pk8).slice(0,3));
await oddb.od.put(shod1.od,pk8)
 .then(response => {
  let html33=document.getElementById("html33");
  html33.style.width='455px';
        html2canvas(html33,
            {
                allowTaint: true,
                useCORS: true
            }).then(function (canvas) {
            
            //console.log('zsr',zsr,'sho',shod1);
            let imglastod={};
            let txtcn=shod1.od.id+' '+shod1.od.cn;let imgcn=canvas.toDataURL();
            imglastod['cn']=txtcn;imglastod['im5']=imgcn;
            document.getElementById('lastodimg').src=imgcn;
            document.getElementById('lastodcn').innerHTML=txtcn;
            tt5=imglastod;
            localStorage.setItem('imglastod',JSON.stringify(imglastod));
            });
            html33.style.width='';
       newc();
document.getElementById('btn_convert').style.display='';
document.getElementById('upd5').style.display='none';
  }).then((v) => {
    document.getElementById("p781").click();
  })
  .catch(error => {
    console.log('error in update od1 fn- ', error);
    alert('error in update od1 fn- ', error);
   
  })
}

//{p:4,g:'odt',gl:'odk',od:{id:34,first:"Jake",phone:"312-000-1212", last:"Newperson"}}; // move order from odt to odk
//moveod('odk','odpd','od82');
// add pin details(unpin and pin)
async function moveod(gf,gt,idf) {
// let st = new Localbase('st');
let idfs=String(idf).slice(0,3)
await mthdb(gf.slice(-1)+idfs);
let docft={};
//  await st.collection(gf).doc(idf).get().then(doc => {docft=doc;});
await oddb.od.get().then((v)=> docft=v);
//  await st.collection(gf).doc(idf).delete();
await oddb.od.delete(Number(idf));
// await st.collection(gt).doc(idf).set(docft);
await mthdb(gt.slice(-1)+idfs);
await oddb.od.put(docft,idf);
}

// document.getElementById('alltab').onclick=function() {
//   html2canvas(document.querySelector("#html33")).then(canvas => canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})])))
// };

document.getElementById("seldt").valueAsDate = new Date();
document.getElementById("instock").onclick=()=>{
 // .classList.toggle("mystyle"); this.parentElement.style.display='none'
  document.getElementById("seldt").parentElement.classList.toggle("hide");
  document.getElementById('ptd').classList.toggle("w3-hide");
  document.getElementById('cnm').classList.toggle("w3-show");
}
// in stock order 
function saveinst(v) {
  let pkx={};
  // pkx.id = (Number(zxc)+1);
   //pkx.cn = document.getElementById('gsel').options[document.getElementById('gsel').selectedIndex].innerText;
   pkx.cn =document.querySelector('#gsel').selectedOptions[0].innerText;
   pkx.tot = Number(total);
   pkx.dt = date.split(' ').join('/');
   pkx.it = od;
   (async () => {
    //  let st = new Localbase('st');
    
     if (v===0) {
      pkx.id=oldod.id;
     } 
    // else {
    //   // await st.collection('inst').get().then((e) => e.length)
    //   // await indb.inst.get().then((v)=>{console.log(v);});
    //   // .then((id) => pkx.id=Number(date1+(id+1)));
    //  }
    //  console.log('incv',v);
     await instdb.inst.put(pkx);
     await sendd(urli, { "p": "5", "g": "inst", "od": { ...pkx }},'in stock');
   })();
  newc();
  if (v===0) {
    document.getElementById('btn_convert').style.display = '';
    document.getElementById('upd5').style.display = 'none';
   }
}
  

function expt(v) {
 // console.log(Number(v.parentElement.innerText.split('.')[0]))
 console.log(v.parentElement.innerText.split('.')[0]);
 couttotinst(Number(v.parentElement.innerText.split('.')[0]),selg);
  setTimeout(()=>{
    tabletcsv('testTable',new Date().toLocaleString("en-GB"));
  },3000)
}
// price calculator
function pc(v,vx,a,b,c,d,e) { // v(type) a(36-42), b(44), c(46), d(32), e(34)
  //odprice
  let svc='', sva='', svbc='', svab='', svpls1='', svpls2='';
  svbc= ((b+c)!=0) ? svbc=(b+c)+'×'+prc.pc[v][1] : svbc='';
  svab= ((a+b)!=0) ? svab=(a+b)+'×'+prc.pc[v][0] : svab='';
  svc = (c!=0) ? svc=c+'×'+prc.pc[v][1] : svc='';
  sva = (a!=0) ? sva=a+'×'+prc.pc[v][0] : sva='';

  svpls1 = ((a!=0) && ((b+c)!=0)) ? svpls1='+' : svpls1='';
  svpls2 = ((c!=0) && ((a+b)!=0)) ? svpls2='+' : svpls2='';
  // console.log('whawhb',vx);
  let pj1=0;
  if ((v=='Bio')) { //console.log('BN')
    let pj1=(a*prc.pc[v][0]+(b+c)*prc.pc[v][1]);odprice[v]=prc.pc[v];
    pctt+=pj1;pcwt+=(a+b+c)*Number(prc.wt[v]);
    return "<td colspan='2'><b>"+(a+b+c)+' '+vx+"</b><b class='sa2'>"+sva+svpls1+svbc+" = </b></td><td class='sb3'><b>"+pj1+'₹</b></td>'
  }else if ((v=='NBio')) { 
    if(document.querySelector('#NBio #White.oj')){
      let wh11=document.querySelectorAll('#NBio #White.oj td input');
      let wha=0, whb=0;
    for (let h = 0; h< wh11.length; h++) {
     let njh=Number(wh11[h].value);
     if (h<=3) {
      wha+=njh;
     } else {
      whb+=njh;
     }
      // console.log('whawhb',vx);
  }
  let whpc=prc.pc[v][2];let whva='',whvpls1='',whvbc='';
  let pj10=(wha*(prc.pc[v][0]+whpc)+(whb)*(prc.pc[v][1]+whpc));odprice[v]=prc.pc[v];
      pctt+=pj10;pcwt+=(wha+whb)*Number(prc.wt[v]);
      whva = (wha!=0) ? whva=wha+'×'+(prc.pc[v][0]+whpc) : whva='';
      whvpls1 = ((wha!=0) && ((whb)!=0)) ? whvpls1='+' : whvpls1='';
      whvbc= ((whb)!=0) ? whvbc=(whb)+'×'+(prc.pc[v][1]+whpc) : whvbc='';
  
      let pj1=((a-wha)*prc.pc[v][0]+(b+c-whb)*prc.pc[v][1]);
      pctt+=pj1;pcwt+=(a+b+c-wha-whb)*Number(prc.wt[v]);
  
      let wht0="<td colspan='2'><b>"+(wha+whb)+' '+vx+' White'+"</b><b class='sa2'>"+whva+whvpls1+whvbc+" = </b></td><td class='sb3'><b>"+pj10+'₹</b></td>';
      let wht1="<td colspan='2'><b>"+(a+b+c-wha-whb)+' '+vx+"</b><b class='sa2'>"+(((a-wha)!=0) ? sva=(a-wha)+'×'+prc.pc[v][0] : sva='')+((((a-wha)!=0) && ((b+c-whb)!=0)) ? svpls1='+' : svpls1='')+(((b+c-whb)!=0) ? svbc=(b+c-whb)+'×'+prc.pc[v][1] : svbc='')+" = </b></td><td class='sb3'><b>"+pj1+'₹</b></td>'
      return (((a+b+c-wha-whb)||'')&&('<tr>'+wht1+'<tr/><tr>'))+(((wha+whb)||'')&&('<tr>'+wht0+'<tr/>'))
    }else{}
  }else if (v=='OverS' || v=='Kids') { //console.log('O')
    pj1=((a+b+c+d+e)*prc.pc[v][0]);odprice[v]=prc.pc[v];
    pctt+=pj1;pcwt+=(a+b+c+d+e)*Number(prc.wt[v]);
    return "<td colspan='2'><b>"+(a+b+c+d+e)+' '+vx+"</b><b class='sa2'>"+(a+b+c+d+e)+'×'+prc.pc[v][0]+" = </b></td><td class='sb3'><b>"+pj1+'₹</b></td>'
  }else if ((v=='Polo') || (v=='Hood') || (v=='Sweat')) { //console.log('PHS')
    pj1=((a+b)*prc.pc[v][0]+c*prc.pc[v][1]);odprice[v]=prc.pc[v];
    pctt+=pj1;pcwt+=(a+b+c)*Number(prc.wt[v]);
    return "<td colspan='2'><b>"+(a+b+c)+' '+vx+"</b><b class='sa2'>"+svab+svpls2+svc+" = </b></td><td class='sb3'><b>"+pj1+'₹</b></td>'
  }else{   }
}

// sms 
// let sms='Hi bn, An update Transport charge aur Other charge ab se save hoga';
// if (!localStorage.sms) {localStorage.setItem('sms',sms);alert(sms);}
// else if((localStorage.sms!=sms)){
// alert(sms);localStorage.setItem('sms',sms);
// }

// favicon set emoji
if (localStorage.gr5) {
  let cfa = document.createElement("canvas");
  cfa.height = 64;cfa.width = 64;
  let ctx = cfa.getContext("2d");
  ctx.font = "64px serif";
  //ctx.fillText("👕", 0, 64); 
  ctx.fillText("🇮🇳", 0, 64); 
  //ctx.fillText("❤️", 0, 64);
  //document.querySelector('link[rel="icon"]').href= cfa.toDataURL();
  document.querySelector('link[rel="shortcut icon"]').href= cfa.toDataURL();
  }

// on paste mobile no.
document.getElementById('ptm').addEventListener('paste', (v) => {pastemn(v)})
document.getElementById('ptm1').addEventListener('paste', (v) => {pastemn(v);})

  function pastemn(v) {
    setTimeout(() => {
       // console.log('jkjkj',v);
      let vv=v.target.value;
      if((vv.includes('+91'))||(vv.includes(' '))){
        let nm=vv.replace(/ /g,'');
        if((nm.length==13)||nm.includes('+91')){
          v.target.value=nm.split('+91')[1];
         }else {
          v.target.value=nm.slice(-10);
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
  let p1=document.getElementById('m1list');
  p1.classList.add("w3-show");
  (async()=> { 
    let lihtml="";
    await db.pt.where('mn1').startsWith(v).limit(10).each(pv => { console.log('n',pv);
      lihtml+="<li id='"+pv.id+"'>"+pv.cn+', '+pv.mn1+', '+pv.mn2+"</li>";
    });
    p1.innerHTML=lihtml;
    console.log('End');
  })();
  console.log('oninput');
  mnvalid(v);
}

function mnvalid(v) {
  let p=v.length;
if(v==' '){
  document.getElementById('ptmn').innerHTML=" ";
 }else if(p==0){
  document.getElementById('ptmn').innerHTML=" ";
 }else if(p<10) {
  document.getElementById('ptmn').innerHTML="<b style='color:blue'>"+p+" Digits only!</b>";
 } else if(p==10){
   document.getElementById('ptmn').innerHTML="<b id='p001' style='color:red'>10 Digits <b></b></b>";
 } else if(p>10){
   document.getElementById('ptmn').innerHTML="<b style='color:blue'>"+p+" Digits!</b>";
  }
}


// pincode check
function pincode(v) {
  if(v.value.trim().length==6){
    fetch('https://api.postalpincode.in/pincode/'+v.value.trim())
   .then((response) => response.json())
   .then((data) => {
    if(data[0].Message!="No records found"){
   // console.log(data[0]);
    let p=data[0].PostOffice[0];
    let t=`${p.State}, ${p.District}`; //${p.Region}${p.Division}, 
    document.getElementById('ptplace').innerHTML="<b style='color:blue'>"+t+"</b>";
  }else{
    document.getElementById('ptplace').innerHTML="<b style='color:red'>"+data[0].Message+"</b>";
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
    document.getElementById('ptst').innerHTML = "<b style='color:blue'>"+gststate[Number(g.substr(0, 2))]+"</b>";
  }else if ((g.length < 15)) {
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
 let p=document.getElementById('plist');
  p.classList.add("w3-show");
  //((vv=='')) ? p.classList.toggle("w3-show") :  ' ';
  // genrate party search list in id-plist.  <li id="212">czxcjk fd 9554255495</li>
  (async()=> { // save party details
    let reg = new RegExp(vv, 'i');let lihtml="";
    await db.pt.filter(pk => reg.test(pk.cn)).limit(10).each(pv => { //console.log('n',pv);
      lihtml+="<li id='"+pv.id+"'>"+pv.cn+', '+pv.mn1+', '+pv.mn2+"</li>";
    }); 
    p.innerHTML=lihtml;
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
document.getElementById('plist').addEventListener('click',(e)=>{
  getptd(e);
})

// onclick // get party details by id from indexed db for mobile no. 
document.getElementById('m1list').addEventListener('click',(e)=>{
  getptd(e);
  document.getElementById('ptmn').innerHTML='';
})

// not match in list, #ptd click remove list for name and mobile no. 
document.querySelector('#ptd').addEventListener('click',()=>{
  document.getElementById('plist').innerHTML='';
  document.getElementById('m1list').innerHTML='';
})

// sptd()&&svptd()
//get party details from selected in list // fill all detail in inputs
let ptods=[];let ptid=0; // transfer value from db to new order 
function getptd(e) {
  ptods=[];ptid=0;
  let pid=Number(e.target.id);//console.log(pid);
  (async()=> {
    await db.pt.get(pid).then((v) => {
      console.log(v);
      let cop=document.getElementById('cnm5');
      if (v.ods.length) {
        cop.style.display='';
      } else {
        cop.style.display='none';
        document.getElementById('cnm4').style.display='none';
      }
     
      document.getElementById('incn').value=v.cn.replace(/\s+/g, ' ').trim();
      document.getElementById('ptm').value=v.mn1;
      
      document.getElementById('ptm1').value=v.mn2??'';
      
        let k1=document.getElementById('ptg');
        k1.value=v.gst.trim()??'';
        (k1.value)?k1.dispatchEvent(new Event('input')):document.getElementById('ptst').innerText='State 07BBNPG0866M2Z7';
       
        let k2=document.getElementById('ptp');
        k2.value=v.pin??'';
        (k2.value)?k2.dispatchEvent(new Event('input')):document.getElementById('ptplace').innerText='State, District';

      document.getElementById('pta').value=v.add??'';
      ptods=v.ods;ptid=v.id;

    });
  })();
//  e.path[0].parentElement.classList.toggle('w3-show'); 
  e.target.parentElement.innerHTML='';
}

// make party details obj
// let ptd={id:'',cn:'',mn1:'',mn2:'',gst:'',pin:'',add:'',ods:['as102','as33','ak508']};
var ptd={};let cid='';
function sptd(v){
  // prc=JSON.parse(localStorage.pc);
  ptd={id:ptid,cn:'',mn1:'',gst:'',add:'',ods:ptods};
  let cn=document.getElementById('incn').value;
  let mn1=document.getElementById('ptm').value;
  let mn2=document.getElementById('ptm1').value;
  let pinc=document.getElementById('ptp').value;
  let pta=document.getElementById('pta').value;
  let ptg=document.getElementById('ptg').value;
  ptd.cn=cn.replace(/\s+/g, ' ').trim();
  ptd.mn1=mn1;
  ptd.mn2=mn2;
  ptd.gst=ptg.replace(/\s+/g, ' ').trim().toUpperCase();
  ptd.pin=pinc;
  ptd.add=pta;
 // if(selg&&cid[1]&&(v!=1)){
  if(ptd.add&&cid&&(v!=1)){document.getElementById('ods'+cid).parentNode.style.color='';}
  else if(cid&&(v!=1)){document.getElementById('ods'+cid).parentNode.style.color='#00f';}
 // ptd.ods.push(Number(localStorage.clickcount)+Number(ptcounter()));
 let vn = (ptg) ? (true && document.getElementById('q000')): true;

 if((cn && vn)||(ptg.length==2)){
    console.log(ptd);
    if (v==1) {gonext();} // save and next 
    return true
  }else{console.log(cn,ptg); alert('⚠️Something wroug! Check all details.');return false}
}

// save party details and gen. id
function svptd() {
  let oldid=ptd.id;
  ptd.id=ptid||genid(ptcounter(),1);console.log('save party details',ptd);
  if(!oldid){
    (async()=> { // save party details
      await db.pt.add(ptd);
     })();
  } else {
    (async()=> { // update party details
      await db.pt.update(oldid, ptd);
     })();
  }
  zc(ptd,'hiiiiiii');
  sendd(urli,{ "p": "10", "g": 'ptds', "od": {},ptd},'Party Details ');
  selg||newocb();selg&&gr();
  ptods=[];ptid=0;
  for (let u in selod5) {document.getElementById(u).checked=false;}
  newc2();
}

// party counter
function ptcounter() {
  if (localStorage.ptcount && (localStorage.today==new Date().toLocaleDateString())) {
    localStorage.ptcount = Number(localStorage.ptcount)+1;
  } else {
    localStorage.ptcount = 1;
    localStorage.today=new Date().toLocaleDateString();
  }
  return localStorage.ptcount;
}

function genid(v,i,b='a'){
  let id2;let id1;
  if(i==1){
  id1=new Date().toLocaleDateString('en-GB', {day : '2-digit',month : '2-digit',year : '2-digit'}).split('/').reverse().join('');
  id2=Number(id1+v.padStart(3, '0'));
  }else{
    id2=Number(v);
  }
  let id3=id2.toString(32).padStart(6, '0'); // base 32
  let s = 0;while (id2) {s += id2 % 10;id2 = Math.floor(id2 / 10);}
  let p5=(i==1) ? Number(id1+v.padStart(3, '0')) :
  (i==2) ? b+id3+s :
  (i==3) ? [...btoa(btoa(b+id3+s))].reverse().join('') : '';
  return p5
}
//genlink(genid(ptd.id,3),ptd.cn);
// async function genlink(id,cn) {
//   // console.log(id);
//   let url1=cn+', save this link and download all your bills here👇\n\n'+'https://www.ownknitted.com/bill#'+id;
//     document.querySelector('.jkjxxx').addEventListener('click', async () => {
//      let cin=document.querySelector('#aa5 textarea');
//      cin.value=url1;
//      cin.select();
//      cin.setSelectionRange(0, 99999);
//      navigator.clipboard.writeText(cin.value);

//       //   const shareData = {
//       //     title: 'Link',
//       //     text: cn+', save this link and download all your bills here👇\n',
//       //     url: 'https://.com/'+id
//       //   }
//       //   await navigator.share(shareData);

//     });
//   // return url1
// }


function copylink(){
 let cn=document.getElementById('incn').value;
 let link='https://www.ownknitted.com/bill#'+genid(ptid,3);
  let url1=cn+', save this link and download all your bills here👇\n\n'+link;
  let cnb=document.getElementById('cnm4');
  if (cn) {
    cnb.href=link;
    cnb.innerText=cn.slice(0,6)+'...';
    cnb.style.display='';
    navigator.clipboard.writeText(url1);
  }else{
    cn='No data';
  }
  snackbar(cn+' copied',500);
    newc2();
}

function copylink1(v){
  let p= document.getElementById(v);
  let p1=p.tabIndex;
  let cn=p.querySelector('b').innerText.match(/[^\d+.].+/g)[0].trim();
  // console.log(p1,cn);
  let link='https://www.ownknitted.com/bill#'+genid(p1,3);
  let url1=cn+', save this link and download all your bills here👇\n\n'+link;
  navigator.clipboard.writeText(url1);
  snackbar(cn+' copied',500);
}

// print address
function printadd() {
  if(Object.keys(selod5).length){
  let htmladd='<style>a{text-decoration: none;color: black;}body{margin: 0; padding: 0;color: #000; background: #fff;}@media print {#pbr{page-break-after: always;display: block;}}.p2 span {font-weight: 400;}.p1{font-size: 32px!important;font-weight: initial;}.p2{font-size: 22px!important;}.p2 div{font-weight:bold}</style>';
  Object.keys(selod5).forEach(function (v,i) {
      (async()=> { // get party address
      // let od=selg.slice(-1)+v.slice(2);//'as63'
      let cadd,radd;
      let cnv=document.getElementById(v).parentElement.tabIndex;console.log(cnv);
      // db.pt.where('cn').equals(b).each((v)=>{
      // await db.pt.where('cn').equals(cnv).toArray((v)=>{
      await db.pt.get(cnv).then((v)=>{
      console.log(v);
      cadd='<h1 class="p1"><b>To </b>- '+v.cn+', '+v.mn1+', '+v.mn2+'<br>'+v.add+', '+v.pin+'</span></h1>';
      radd='<h1><span class="p2"><div><b>Return address if not delivered</b><br></div><span>Own Knitted, 9336695049</span><br><span>F-120, Shutter wali gali, near Gujjar chowk, Khanpur Delhi, 110062</span></span></h1>';
      });
let om='<hr style="border-top: 2px dashed #000;padding: 0;margin: 0;">';
      if(!((i+1)%3)){
          om='<span id="pbr"></span>';
      }
      htmladd+=cadd+radd+om;
  })();
  document.querySelector('#'+secid+' #'+v).checked=false;
  })
  selod5={};
  setTimeout(() => {
    let myWindow = window.open("", "_blank");let body1=myWindow.document.body;
    body1.setAttribute('onclick','print()');
    body1.innerHTML+=htmladd;//body.setAttribute('onclick','print()');
    myWindow.print();
    // myWindow.close();
  }, 150);
  }else{
    alert('Select order first');
  }
}
// function download(link,name) {
// let iframe = document.createElement("iframe");
// iframe.style.display = 'none';
// document.body.appendChild(iframe);
// iframe.contentWindow.document.body.innerHTML="<a href='"+link+"' id='dlink' download='"+name+"'>Download</a>";
// iframe.contentWindow.document.getElementById('dlink').click();
// setTimeout(() => iframe.remove(), 800);
// }

// function download(imgurl,imgnm){
//   let htl="<a id='link55' href='"+imgurl+"' download='"+imgnm+"'>hjhj</a>";
//   let iframe = document.createElement('iframe');
//   document.body.appendChild(iframe);
//   iframe.contentWindow.document.open();
//   iframe.contentWindow.document.write(htl);
//   iframe.contentWindow.document.getElementById('link55').click();
//   iframe.contentWindow.document.close();
//    setTimeout(function(){ iframe.remove()}, 4000);
//   }

function download(imgurl,imgnm){
  let htl="<a id='link55' href='"+imgurl+"' download='"+imgnm+"'>Download</a>";
  let iframe = document.createElement('iframe');
  document.body.appendChild(iframe);let doc=iframe.contentWindow.document;
  doc.open();
  doc.write(htl);
  doc.getElementById('link55').click();
  doc.close();
   setTimeout(()=> iframe.remove(), 4000);
  }

  function download1(link,name){
    let iframe = document.createElement('iframe');  document.body.appendChild(iframe);
    let doc=iframe.contentWindow.document; // target='_self'(Default) target='_parent' target='_top' target='framename'
    doc.write("<a id='link55' target='_blank' href='"+link+"' download='"+name+"'>Download</a>");
    doc.getElementById('link55').click();
    setTimeout(()=> iframe.remove(), 3000);
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
      document.querySelector("#gstall > div.w3-blue-gray").style.display='flex';
    }
    //
    async function goadd(b,z) {
      b=Number(b);
      ptid=0,ptods={};
      console.log(b,z);
      // db.pt.where('cn').equals(b).each((v)=>{ 
        await db.pt.get(b).then((v)=>{
          if (v) {
            gr();document.getElementById('id01').scrollTop=0;
            document.querySelector("#gstall > div.w3-blue-gray").style.display='none';
            document.getElementById('incn').value=v.cn;
            document.getElementById('ptm').value=v.mn1;
            document.getElementById('ptm1').value=v.mn2??'';
              let k1=document.getElementById('ptg');
              k1.value=v.gst??'';
              (k1.value)?k1.dispatchEvent(new Event('input')):document.getElementById('ptst').innerText='State 07BBNPG0866M2Z7';
              let k2=document.getElementById('ptp');
              k2.value=v.pin??'';
              (k2.value)?k2.dispatchEvent(new Event('input')):document.getElementById('ptplace').innerText='State, District';
            document.getElementById('pta').value=v.add??'';
            ptods=v.ods;ptid=v.id;cid=z;
            console.log(v,'b');
          }else{
            alert('Party details not found');
          }
      })
    }

function addtbl(v,pc,qt,d) {
document.getElementById('ctm9').innerHTML+=`<tr data-p="${d}"><td>${v}</td><th>${pc}</th><th>${qt}</th>
  <td style="width: 10px;" onclick="this.parentElement.remove()"><b class="w3-block w3-button w3-ripple w3-teal">Del</b></td></tr>`;
} 
document.querySelector('#addtbl0').addEventListener('click',(e)=>{
  //console.log(e.currentTarget,e.target);
  let t=e.target;
  if (t.matches('li')) {
    document.querySelector('#addtbl').classList.toggle('w3-show');
    addtbl(t.innerText,0,0,t.dataset.p);
  }
  if (t.id==='addtbl1') {
    document.querySelector('#addtbl').classList.toggle('w3-show');
    let pol=document.querySelector('#addtbl li:last-child input');
    let p0=pol.value;
    if (p0) {
      addtbl(p0,0,0,('0'+''+p0+''+'0'));
      pol.value='';
    }
  }
  // e.classList.toggle('w3-show');
})

async function syncdata(){
  newc2();
  w3_close();
  let pkj=document.getElementById('gstall');
  pkj.style.display='';
  document.getElementById('bnm7').style.display='none';
  document.getElementById('p78').style.display='none';
  let li='';
  
  await erdb.err.each(async(v)=>{
    let cn='';
    if ((v.p=='0')||(v.p=='1')) {
      cn='<div class="w3-bar-item" style="color:blue">'+v.data.od.cn+'</div>';
    }else if(v.p=='10'){
      cn='<div class="w3-bar-item" style="color:blue">'+v.data.ptd.cn+'</div>';
    }
    li+=`<li id="z${v.id}"><div class="w3-bar w3-border w3-light-grey">
    <div class="w3-bar-item w3-green w3-left">${v.id}</div>
    ${cn}
    <div class="w3-bar-item w3-right">${v.type}</div>
    </div></li>`;
    // console.log(v.id,v.type,v.data.od.cn);
  });
  pkj.innerHTML="<div id='tre6'><br><a onclick='syncdata1()' class='w3-button w3-red' style='display: block;'>Sync</a><br><ul id='sync' class='w3-ul w3-hoverable'>"+li+"</ul><br></div>";
}
let errid=0;
async function syncdata1(){
  
  await erdb.err.each(async(v)=>{
switch(v.p) {
  case '0':
  case '1':
    errid=v.id;
    await sendd(urli,v.data,v.type);
    document.getElementById('z'+v.id).remove();
  break;

  case '2':
  case '4':
  case '5':
    errid=v.id;
    await sendd(urli,v.data,v.type);
    document.getElementById('z'+v.id).remove();
  break;

  case '3': // take current pin data
  errid=v.id;
  selgo(v.data.g);
  v.data.od=JSON.parse(pinloc);
  await sendd(urli,v.data,v.type);
  document.getElementById('z'+v.id).remove();
  break;

  case '10': // take current ptd data
  await db.pt.get(v.id).then(async(doc)=>{
    v.data.ptd=doc;
    errid=v.id;
    await sendd(urli,v.data,v.type);
    document.getElementById('z'+v.id).remove();
  })
  
  break;

  default:
    
  break;
}});
}

// scroll
function dismth() {
  window.indexedDB.databases().then((e)=>{
    let b=[];
    e.forEach((v,i)=>{
         if (String(v.name).match(/\w\d{3}/g)) {
          let x=(2+v.name.slice(1));let moth=Number(x[2]+x[3])-1;
          let mth=new Date('20'+x[0]+x[1],moth).toLocaleDateString('en-GB', {
            month : 'short',
            year : 'numeric'
            });
          b[i]=`<ul id="${v.name}" class="w3-border w3-ul"><li onclick="getmth('${v.name}','${mth}')" class="w3-block w3-blue-gray w3-button">${mth}</li></ul>`;
         }
    });
    // console.log(b);
    document.getElementById('oderli').innerHTML+=b.reverse().join('');
  });
}

async function getmth(b,m){
 let po0=document.querySelector('#'+b+' li').nextSibling;
 for (let u in selod5) {document.getElementById(u).checked=false;}selod5={};

  if (!po0) {
    // console.log('0',po0);
    await mthdb(b);
    let z=await oddb.od.toArray();
    await appdli(z,b);
  }else{
    document.getElementById(b).innerHTML=`<li onclick="getmth('${b}','${m}')" class="w3-block w3-blue-gray w3-button">${m}</li>`;
    // console.log('1',po0);
  }
}

if (localStorage.gr5=='555') {
document.getElementById('cnm5').style.display='none';
}


