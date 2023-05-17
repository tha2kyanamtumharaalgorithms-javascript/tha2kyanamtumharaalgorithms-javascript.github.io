
var doc=document,zzz=(s,o=doc)=>o.querySelectorAll(s),zz=(s,o=doc)=>o.querySelector(s),zc=console.log.bind(doc);
// get all ods list
async function getods(gd) {
  try {
  // await mthdb(gd.slice(-1)+date1);
  // let allod=await oddb.od.toArray((v)=>{
  // return v.sort((a,b)=>{
  //     return a.id - b.id;
  //     });
  // });

  // await appdli(allod);
  selgo(gd);
  let j=JSON.parse(pinloc);let vb='';
let hmtl0='';
for (let k in j) {
  let pf=k.slice(2,6);
  // console.log(pf,k);
  if (vb!=pf) {vb=pf;await mthdb(pf);}
   await oddb.od.get(Number(k.slice(3))).then(i => {
    let ifz='';
      if(!(i.tot)){ifz="class='delt'"};
      let gstr="<span style='padding: 0 1.55em'></span>";
      let inp="<input onclick='selod(this)' id='ods"+i.id+"' class='w3-check' type='checkbox'>";
      let vtag="<span id='vtag' ><span name="+'ods'+i.id+">"+"</span></span>";
      hmtl0="<li id=s"+i.id+" "+"tabindex="+i.pt+" "+ifz+">"+inp+' '+"<b onclick='goadd("+i.pt+','+i.id+")'>"+i.id+'. '+i.cn+'</b>'+vtag+"<span onclick='opodli(this)'>"+i.tot+' '+ gstr+' '+i.dt.slice(0,6)+"</span></li>"+hmtl0;
   });
}
document.getElementById('oderli').innerHTML=hmtl0;
dismth();
  }
  catch(error) {
    console.log('error in getods() fn-', error);
    alert('error in getods() fn-', error);
  }
}
async function appdli(v,s){
let hmtl0='';
for await (const i of v) {
      // console.log(i)
      let ifz='';
      if(!(i.tot)){ifz="class='delt'"};
      let gstr="<span style='padding: 0 1.55em'></span>";
      let inp="<input onclick='selod(this)' id='ods"+i.id+"' class='w3-check' type='checkbox'>";
      let vtag="<span id='vtag' ><span name="+'ods'+i.id+">"+"</span></span>";
      hmtl0="<li id=s"+i.id+" "+"tabindex="+i.pt+" "+ifz+">"+inp+' '+"<b onclick='goadd("+i.pt+','+i.id+")'>"+i.id+'. '+i.cn+'</b>'+vtag+"<span onclick='opodli(this)'>"+i.tot+' '+ gstr+' '+i.dt.slice(0,6)+"</span></li>"+hmtl0;
  }
  document.querySelector('#'+s).innerHTML+=hmtl0;
}
async function getinst() {
  newc2();
  w3_close();
  let pkj=document.getElementById('gstall');
  pkj.style.display='';
  pkj.innerHTML="<div id='tre6'><br><ul id='oderli' class='w3-ul w3-hoverable w3-border'></ul><br></div>";
  document.getElementById('bnm7').style.display='none';
  document.getElementById('p78').style.display='none';
  selg='inst';
  let allod=await instdb.inst.toArray((v)=>{
  return v.sort((a,b)=>{
      return a.id - b.id;
      });
  });
   let hmtl0='';
    for await (const i of allod) {
          // console.log(i)
          let gstr="<span style='padding: 0 1.55em'></span>";
           let lid='data-gd='+i.cn;let exio='Export CSV';let funex="onclick='expt(this)'";
          vtag="<span id='vtag' "+funex+"><span name="+'od'+i.id+">"+exio+"</span></span>";
          hmtl0="<li id=s"+i.id+" "+lid+" >"+' '+"<b>"+i.id+'. '+i.cn+'</b>'+vtag+"<span onclick='opodli(this)'>"+i.tot+' '+ gstr+' '+i.dt.slice(0,6)+"</span></li>"+hmtl0;
      }
      document.getElementById('oderli').innerHTML=hmtl0;
  }
let db = new Dexie("party");db.version(2).stores({pt: "id,cn,mn1,mn2,*ods"});
let erdb = new Dexie("erro");erdb.version(1).stores({err: "id"});
let instdb = new Dexie("inst");instdb.version(1).stores({inst: "++id"});
let bulkdb = new Dexie("bulk");bulkdb.version(1).stores({bk: "id"});
var selod5={};var zsr={};let selg;let odimgbob;
//var om=document.getElementById("tb").innerHTML;
var od={};var zxc=0; 
if(localStorage.clickcount){zxc=localStorage.clickcount;}

//  // date today
 var date;let date1;
 function todaydate() {
  let d=new Date();
  date = d.toLocaleDateString('en-GB', {
  day : '2-digit',
  month : 'short',
  year : 'numeric'
  });
  // for order id
  date1 = d.toLocaleDateString('LT', {
    month : '2-digit',
    year : '2-digit'}).split('-').join('').slice(-3);
    // reset order id and reset download after 1 month
  if(localStorage.m!=(d.getMonth()+1)){
    // resetd();
    localStorage.clickcount=0;zxc=0;localStorage.m=(d.getMonth()+1);
    localStorage.fromod=0;
  }
}
todaydate();
let oddb;
async function mthdb(m) {
oddb = new Dexie(m);
oddb.version(1).stores({od: "id,dt,bulk"}); 
}

var urli =localStorage.gr5;
let gststate={01:"JAMMU AND KASHMIR",02:"HIMACHAL PRADESH",03:"PUNJAB",04:"CHANDIGARH",05:"UTTARAKHAND",06:"HARYANA",07:"DELHI",08:"RAJASTHAN",09:"UTTAR PRADESH",10:"BIHAR",11:"SIKKIM",12:"ARUNACHAL PRADESH",13:"NAGALAND",14:"MANIPUR",15:"MIZORAM",16:"TRIPURA",17:"MEGHALAYA",18:"ASSAM",19:"WEST BENGAL",20:"JHARKHAND",21:"ODISHA",22:"CHATTISGARH",23:"MADHYA PRADESH",24:"GUJARAT",26:"DADRA AND NAGAR HAVELI AND DAMAN AND DIU (NEWLY MERGED UT)",27:"MAHARASHTRA",28:"ANDHRA PRADESH(BEFORE DIVISION)",29:"KARNATAKA",30:"GOA",31:"LAKSHADWEEP",32:"KERALA",33:"TAMIL NADU",34:"PUDUCHERRY",35:"ANDAMAN AND NICOBAR ISLANDS",36:"TELANGANA",37:"ANDHRA PRADESH",38:"LADAKH",97:"OTHER TERRITORY",99:"CENTRE JURISDICTION"}
var ods1={Bio:{Black:{36:0,38:0,40:0,42:0,44:0,46:0},White:{36:0,38:0,40:0,42:0,44:0,46:0},Maroon:{36:0,38:0,40:0,42:0,44:0,46:0},Navy:{36:0,38:0,40:0,42:0,44:0,46:0},"Mustard Yellow":{36:0,38:0,40:0,42:0,44:0,46:0},Red:{36:0,38:0,40:0,42:0,44:0,46:0},"Bottle Green":{36:0,38:0,40:0,42:0,44:0,46:0},Beige:{36:0,38:0,40:0,42:0,44:0,46:0},"Royal Blue":{36:0,38:0,40:0,42:0,44:0,46:0},Lavender:{36:0,38:0,40:0,42:0,44:0,46:0},Sky:{36:0,38:0,40:0,42:0,44:0,46:0},Grey:{36:0,38:0,40:0,42:0,44:0,46:0}},NBio:{Black:{36:0,38:0,40:0,42:0,44:0,46:0},White:{36:0,38:0,40:0,42:0,44:0,46:0},Navy:{36:0,38:0,40:0,42:0,44:0,46:0},Grey:{36:0,38:0,40:0,42:0,44:0,46:0},Mint:{36:0,38:0,40:0,42:0,44:0,46:0},Charcol:{36:0,38:0,40:0,42:0,44:0,46:0},Olive:{36:0,38:0,40:0,42:0,44:0,46:0}},Polo:{Black:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},White:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Navy:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Grey:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Maroon:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Anthra:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Red:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Charcol:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Royal:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Orange:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},"Sky Blue":{XS:0,S:0,M:0,L:0,XL:0,XXL:0},"Flag Green":{XS:0,S:0,M:0,L:0,XL:0,XXL:0},"Reliance Green":{XS:0,S:0,M:0,L:0,XL:0,XXL:0},"Golden Yellow":{XS:0,S:0,M:0,L:0,XL:0,XXL:0}},OverS:{Black:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},White:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Lavender:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Beige:{XS:0,S:0,M:0,L:0,XL:0,XXL:0}},Hood:{Black:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},White:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Navy:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Grey:{XS:0,S:0,M:0,L:0,XL:0,XXL:0}},Sweat:{Black:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},White:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Navy:{XS:0,S:0,M:0,L:0,XL:0,XXL:0},Grey:{XS:0,S:0,M:0,L:0,XL:0,XXL:0}},Kids:{Black:{20:0,22:0,24:0,26:0,28:0,30:0,32:0,34:0},White:{20:0,22:0,24:0,26:0,28:0,30:0,32:0,34:0}}};

var pki={"types":[{"type":"Bio","color":["Black","White","Maroon","Navy","Mustard Yellow","Red","Bottle Green","Beige","Royal Blue","Lavender","Sky","Grey"],"size":[36,38,40,42,44,46],"price":155},{"type":"NBio","color":["Black","White","Navy","Grey","Mint","Charcol","Olive"],"size":[36,38,40,42,44,46],"price":105},{"type":"Polo","color":["Black","White","Navy","Grey","Maroon","Anthra","Red","Charcol","Royal","Orange","Sky Blue","Flag Green","Reliance Green","Golden Yellow"],"size":["XS","S","M","L","XL","XXL"],"price":190},{"type":"OverS","color":["Black","White","Lavender","Beige"],"size":["XS","S","M","L","XL","XXL"],"price":190},{"type":"Hood","color":["Black","White","Navy","Grey"],"size":["XS","S","M","L","XL","XXL"],"price":190},{"type":"Sweat","color":["Black","White","Navy","Grey"],"size":["XS","S","M","L","XL","XXL"],"price":190},{"type":"Kids","color":["Black","White"],"size":["20","22","24","26","28","30","32","34"],"price":190}]};
// console.log(pki.types[0]); // console.log(pki.types[0].type); // console.log(pki.types[0].color[0]); // console.log(pki.types[0].size[0]);
let intp;
if((navigator.platform)==='iPhone'){intp="pattern='[0-9]*' type='text'";
}else{intp="type='number'";}
//console.log('intp:',intp);

// change type name
const typep7={"Bio":"RN Bio","NBio":"RN Non Bio","Polo":"Polo","OverS":"Oversize","Hood":"Hoodie","Sweat":"Sweatshirt","Kids":"Kids RN"};

// for image bill
const typep77={"Bio":"Bio-RN","NBio":"Cotton-RN","Polo":"Polo","OverS":"O/S Dropsholder","Hood":"Hoodie","Sweat":"Sweatshirt","Kids":"Kids-RN"};
// typep7[variable] //console.log(typep7["Bio"]);

//gen. table start
function gentbl(m) {
 let c11=pki.types[m].type;
 let tb1="<table id='tbl"+m+"' class='w3-table-all pky w3-centered'><thead>"; 

 var size="";var tk="";
  for (let i = 0; i < pki.types[m].size.length; i++) {
    size+="<th>"+pki.types[m].size[i]+"</th>";
   tk+="<th>"+"</th>";
  }
 
 var sizel='';
for (let l in pki.types[m].size) {
    sizel+="<td>"+"<input class='w3-input' oninput='inclick(this)'"+intp+">"+"</td>";
}

var colorl='';
for (let i in pki.types[m].color) {
    colorl+="<tr id='"+pki.types[m].color[i].replace(/\s+/, "")+"' "+"class='oj'"+"><th>"+pki.types[m].color[i]+"</th>"+sizel+"</tr>";
}
 //console.log(c11);
  let tblo=tb1+"<tr class='w3-blue-grey'><th>Total</th>"+tk+"</tr>"+"<tr id='trth' class='w3-red'>"+"</th>"+"<th  class='w3-blue'>"+c11+"</th>"+size+"</tr></thead><tbody id='"+c11+"'>"+colorl+"</tbody></table>";
   //console.log(colorl,"mymymy",tblo);
document.getElementById("type"+m).innerHTML=tblo;
 /// make table contentEditable
//  let olo=document.querySelectorAll("#tbl"+m+" td");
// for (let i = 0; i < olo.length; i++) {
//     olo[i].contentEditable=true;
//     } 
}
//gen. table End

//gen. table for Each tab on load
window.onload = function(){
  document.querySelectorAll('.bar button').forEach(
 function(e, i) {
  gentbl(i);
  });
};

/// tab layout
let curtab="type0";
function openCity(evt, cityName) {
  let odert=document.getElementById('odert');
  odert.style.display='';
  odert.innerText="Total";
  let i, x, tablinks;
  x = document.querySelectorAll(".city");let xa=x.length;
  for (i = 0; i < xa; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.querySelectorAll(".tablink");
  for (i = 0; i < xa; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
let jk12=0;
 let jk100=document.getElementById(cityName).querySelectorAll("thead > tr.w3-blue-grey th");let jk1001=jk100.length;
 for (let r = 1; r < jk1001; r++) {
   let njh113=jk100[r].innerText;
   let njh123=Number(njh113);
   jk12+=njh123;//console.log(r,'lelolelo',jk12,njh113,njh123)
 }
 odert.innerText="Total-"+jk12;
 let lkp1=document.querySelectorAll("tr.oj");let lkp11=lkp1.length;
 for (let p = 0; p < lkp11; p++) {
    lkp1[p].style.display="";
}

 let uy=document.querySelectorAll('.city thead tr:nth-child(1)');let uy1=uy.length;
for (let v = 0; v < uy1; v++) {
 uy[v].style.display='';
}
 document.getElementById('tot').style.display='none';
}


//  toggle in sample/bulk oder
function bulks() {
  totqt[12] = (document.getElementById('bulkc').checked) ? 10 : -110;
  console.log(totqt,'hiiiiiii');
}

// display all tab 
// let bulk;
  let prc={};let bulkpc=JSON.parse(localStorage.pc);let sampc=JSON.parse(localStorage.pcs);
  function viewtotal(){
   let sum = totqt.reduce((p, a) => p + a, 0);
    console.log(sum);
      if((sum>bulkpc.sqt)){
        prc=bulkpc;document.getElementById('bulkc').checked=1;
        // zc(sum,bulkpc.sqt,'t0hiiiiiii');
      }else{
        prc=sampc;document.getElementById('bulkc').checked=0;
        // zc(sum,bulkpc.sqt,'f0hiiiiiii');
      }

   let x1 = document.querySelectorAll(".city");let x11=x1.length;
    for (i = 0; i < x11; i++) {
    x1[i].style.display = "block";
  }
  tablinks = document.querySelectorAll(".tablink");
    for (i = 0; i < x11; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
// remove 0 value table
//let ytl=document.querySelectorAll(".city td .w3-input");
let lkp=document.querySelectorAll(".city tr.oj");let lkp1=lkp.length;
for (let k = 0; k < lkp1; k++) {
    lkp[k].style.display="none";
}
for (let i = 0; i < lkp1; i++) {
   let pkz= lkp[i].querySelectorAll('td').length;
    
    for (let j = 0; j < pkz; j++) {
     let zo=lkp[i].querySelectorAll('tr input')[j].value==="";
      //  let jkp=[];
   if(!zo){
       //console.log(lkp[i],'y');
      lkp[i].style.display="";
   }else{}
  }
}
let gf=document.querySelectorAll(".city");let gf1=gf.length;
for (let d = 0; d < gf1; d++) {
  let hyt= gf[d].querySelectorAll('td input');let hyt1=hyt.length;
  let fhall=1;
   for (let g = 0; g <hyt1; g++) {
     fhall+=hyt[g].value;
   }
  if(fhall==="1"){
    gf[d].style.display="none";
  } //console.log("gghgh",fhall);
 } tot();
}
//// Display Total table
var pctt;var pcwt;let total;var odprice;let billinv=[];let othch;
function tot(){
odprice={};billinv=[];
let dtt=date.slice(0,6);
othch=[];
let tch = document.getElementById('tch').valueAsNumber||0;
let och = document.getElementById('och').valueAsNumber||0;
let dis = document.getElementById('dis').value;
let dptch = tch ? '': 'display:none';
let dpoch = och ? '': 'display:none';
othch=[tch,och,Number(dis)];
// alert(othch);
document.getElementById('u13').innerText=document.getElementById('frt').innerText;
let v9 = (pk8) ? pk8 : (date1+(Number(localStorage.clickcount)+1));
// console.log(pk8,v9);
document.querySelector('#tot table thead th span').innerText='#'+v9;

let dtt2=', '+ new Date().toLocaleTimeString('en', { hour: "2-digit", minute: "2-digit",hour12: true }).replace(' ','');

document.getElementById('tot').style.display='';
document.getElementById('odert').style.display='none';
total=0;pctt=0;pcwt=0;
let uy= document.querySelectorAll('.city thead tr:nth-child(1)');let uy1=uy.length;
for(let v = 0; v < uy1; v++){
 uy[v].style.display='none';
}
let tg=document.querySelectorAll('.city');let tg1=tg.length;
let sd0='';
for (let b = 0; b < tg1; b++) {
let sd20=document.querySelectorAll("#trth .w3-blue")[b];
let sd2=sd20.innerText.trim();
let sd21=typep77[sd2];
// console.log(sd2,sd21);
let cta=0, ctb=0, ctc=0, ctd=0, cte=0,sd1=null,sd11=0;
 sd1=tg[b].querySelectorAll("thead > tr.w3-blue-grey > th");
   sd11=sd1.length;
 // console.log('gh',sd1,sd11);
  for (let h = 1; h< sd11; h++) {
   let njh=sd1[h].innerText;
   let njh1=Number(njh);
   total+=njh1;
   if (h<=4) {
    cta+=njh1;
   } else if(h==5) {
     ctb=njh1;
   }else if(h==6) {
    ctc=njh1;
  }else if(h==7) {
    ctd=njh1;
  }else if(h==8) {
    cte=njh1;
  }
}
  let ctt=(cta+ctb+ctc+ctd+cte);
  if(ctt!=0){
    sd0+="<tr>"+pc(sd2,sd21,cta,ctb,ctc,ctd,cte)+"</tr>";
  }
}//console.log(sd0);
let txv=(Number(pctt)-Number(dis));

let vn = (document.getElementById('bulkc').checked) ? (Number(txv)*0.05) : 0;
let vn1 = (document.getElementById('bulkc').checked) ? '' : 'none';
// let vn1 = (document.getElementById('bulkc').checked) ?  '+ 5% Tax' : '<span style="padding: 0 2.30em"></span>';
let inv=Math.ceil((vn+Number(txv)+Number(tch)+Number(och)));billinv=[txv,inv];
let pctt0=dis&&("<tr><td colspan='2'><b class='sa2'>Discount -</b></td><td>"+"<b>"+dis+'₹'+'</b></td></tr>');
let pctt1="<tr><td colspan='3' style='padding: 1px 4px 1px 2px!important'><div><b class='sc1'>"+total+" PCS Total</b><b class='sc1' style='margin-left: 2px;background: #2e2effd6'>"+Math.ceil(pcwt)+"kg</b><b class='sa2' style='display:"+vn1+"'>"+txv+'₹ + 5% Tax'+'</b></div></td>'+'</tr>';
let pctt2="<tr style="+dptch+"><td colspan='2'><b class='sa2'>Transport Charge -</b></td><td>"+"<b>"+tch+'₹'+'</b></td></tr>';
let pctt3="<tr style="+dpoch+"><td colspan='2'><b class='sa2'>Other Charges -</b></td><td>"+"<b>"+och+'₹'+'</b></td></tr>';
let pctt4="<tr><td colspan='2'><b style='font-size: 12px; font-weight: 500;'>"+dtt+dtt2+"</b><b class='sa2'>Total Amount -</b></td><td>"+"<b class='sc1'>"+(inv.toLocaleString('en-IN'))+'₹'+'</b></td></tr>';
document.querySelector('#tot table tbody').innerHTML=sd0+pctt0+pctt1+pctt2+pctt3+pctt4;
 //document.querySelector('#tot thead tr #u13').contentEditable=true;
 //document.querySelector('#tot thead tr #u23').innerText='Total-'+tote;
}

// store in od var 
 function stork(t,c,s,v) { // type color size value
  //console.log(v);
  if(v!=0){
   if (t in od){//alert('type available') // check type available
       if (c in od[t]){//alert('color available') // check color available
        od[t][c][s]=v; // add or update value
        }
        else{ //alert('color not available') // if color not available
         od[t][c]={}; // add color
         od[t][c][s]=v; // add value
        }
 }else{ //alert('type not available') // if type not available
  od[t]={}; /// add type
  od[t][c]={};
  od[t][c][s]=v; // add value
   }
  }else{
    // remove zero value and empty color
    //console.log(od[t][c][s],v);
    delete od[t][c][s]
    //console.log((Object.keys(od[t][c]).length === 0))
   if(Object.keys(od[t][c]).length === 0){delete od[t][c]}
   if(Object.keys(od[t]).length === 0){delete od[t]}
  }
 }
// end stork

// create new, clear old input 
function newc(){
  document.getElementById('bulkc').checked = 0;
 let hjk=document.querySelectorAll('.city table td input');
for (let t of hjk) {
    if(t.value){t.value=''}
}

let ty1=document.querySelectorAll(".city thead > tr.w3-blue-grey>th");let ty11=ty1.length;
for (let q = 1; q < ty11; q++) {
    let av=ty1[q];
 if(av.innerText!='Total'){av.innerText='';}
}
  newc2();
 document.querySelector("body > div.bar > div.w3-bar.w3-purple > button:nth-child(1)").click();
 document.getElementById('id01').style.display='block';
 document.getElementById('incn').value='';
 document.getElementById('tch').value='';
 document.getElementById('och').value='';
 document.getElementById('dis').value='';
	selg='';
}

function newc2(){
  document.querySelector('#gall input').checked;
  let ty3=document.querySelectorAll("#ptd input");
  for (let t of ty3) {
   if(t.value){t.value=''}
 }
 let ty4=document.querySelectorAll("#ptd .w3-padding");
 for (let t of ty4) {
   t.innerHTML='';
 }
 document.getElementById('pta').value='';
 newc1();
}

function newc1(){
  for (let u in selod5) {document.getElementById(u).checked=false;}
  totqt=[];od={}; zsr={};
  ptd={};pk8=0;ptods=[];ptid=0;selod5={};
}

// onload model get Customer Name and gst
function gonext() {
   // alert(document.getElementById('instock').checked);
   if (document.getElementById('instock').checked) {
    document.getElementById("incn").value=document.querySelector('#gall input[type="radio"]:checked').labels[0].innerText;
   }
   let ur=document.getElementById("incn").value;
		if(ur){
    document.getElementById('u13').innerHTML=ur;
    document.getElementById('frt').innerHTML='<strong>'+ur+'</strong>';
    // if (document.getElementById('q000')) {
    //   document.getElementById('gst').checked=true;
    // }
    
   let val5=document.querySelector('#gall input[type="radio"]:checked').value;
   document.getElementById("gsel").options[val5].selected=true;

   document.getElementById('id01').style.display='none';
    // let ge5 = document.getElementById("gsel");
    // let ovalue=ge5.options[ge5.selectedIndex].value;
  //e.options[2].selected=true
		 }else{alert('Customer Name Koun Likhega?');}
		}


// Print
async function omprint() {
 // document.title+=zxc+',';
 // window.print();
if(Object.keys(selod5).length){
///console.log(selod5);
    let myW;let tyu5;
document.getElementById('uyt4').innerHTML='';
  myW = window.open("", "_blank");let winbody=myW.document.body;
  winbody.setAttribute('onclick','print()');
  winbody.innerHTML+="<style>body{margin: 0 8px}table tbody:last-child {display:none}div {padding: 5px;margin: 5px 0;overflow: auto;font-size: 18px;font-family: sans-serif;font-weight: 600;}table, th, td {border: 1px solid black;border-collapse: collapse;text-align: center;font-weight: 600;}#tblom1 {width: 100%;border: none;}#tblom1  tbody tr:first-child{color:blue;background: #ffdfdd;}</style><div id='my56'></div>";
  winbody.addEventListener("click", () => myW.close());
  // winbody.addEventListener("click", () => {setTimeout(() => {
  //   myW.close();
  // }, 500); });
// let st = new Localbase('st');
let vb='';
for (const p in selod5) {
let p0=p.slice(2,6);
if(vb!=p0){
  vb=p0;
  await mthdb(p0);
}
  
// st.collection(selg).doc(p).get().then(doc => {
 // console.log(doc);
 await oddb.od.get(Number(p.slice(3))).then((doc)=>{
odtbl2(doc.it,'tblom1','uyt4',p,doc);
      tyu5=document.getElementById('uyt4').innerHTML;
      winbody.innerHTML+=tyu5;
      document.querySelector('#'+secid+' #'+p).checked=false;
     //my56
});  
   }

 // table gen for oder
function odtbl2(jk,b,c1,or,doc) {
document.getElementById(c1).innerHTML="<div><span style='float: left'>"+"Bill To: "+doc.cn+"<br/>Total: "+doc.tot+"</span><span style='float: right'>"+"Invoice No.: "+doc.id+"<br/>Date: "+doc.dt+"</span></div><div id='"+or+"' style='break-after:page;border-style: dashed;border-width: 0.5px;'><table id='"+b+"'><tbody></tbody></table>";
var sd1=document.querySelector('#'+or+' #'+b);
  
Object.keys(jk).forEach(function(t) {
  //  type loop
  if((t==='Bio')||(t==='NBio')){
    sd1.innerHTML+="<tbody id='"+t.replace(/\s+/, "")+"' style=''><tr> <th>"+typep7[t]+"</th> <th>36</th> <th>38</th> <th>40</th> <th>42</th> <th>44</th> <th>46</th> </tr></tbody><table><tr><td style='border: none; background: white'><br></td></tr></table>";
  }else if((t==='Kids')){sd1.innerHTML+="<tbody id='"+t.replace(/\s+/, "")+"'><tr> <th>"+typep7[t]+"</th> <th>20</th> <th>22</th> <th>24</th> <th>26</th> <th>28</th> <th>30</th> <th>32</th> <th>34</th> </tr></tbody><table><tr><td style='border: none; background: white'><br></td></tr></table>";
}
  else{sd1.innerHTML+="<tbody id='"+t.replace(/\s+/, "")+"' style=''><tr> <th>"+typep7[t]+"</th> <th>XS</th> <th>S</th> <th>M</th> <th>L</th> <th>XL</th> <th>XXL</th> </tr></tbody><table><tr><td style='border: none; background: white'><br></td></tr></table>";
}
  
 Object.keys(jk[t]).forEach(function(c) {
  // color loop
  let td2=' ';
  if((t==='Kids')){td2="<td></td> <td></td>"}
   sd1.querySelector('#'+t).innerHTML+="<tr id='"+c.replace(/\s+/, "")+"'> <th>"+c+"</th> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>"+td2+"</tr>";

   Object.keys(jk[t][c]).forEach(function(s) {
    // size loop

  switch (s) {
  case "20":
  case "36":
  case "XS":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(2)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(2)').setAttribute("id", s);
    break;
  case "22":
  case "38":
  case "S":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(3)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(3)').setAttribute("id", s);
    break;
  case "24":
  case "40":
  case "M":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(4)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(4)').setAttribute("id", s);
    break;
  case "26":
  case "42":
  case "L":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(5)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(5)').setAttribute("id", s);
    break;
  case "28":
  case "44":
  case "XL":
   sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(6)').innerHTML=jk[t][c][s];
   sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(6)').setAttribute("id", s);
    break;
  case "30":
  case "46":
  case "XXL":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(7)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(7)').setAttribute("id", s);
    break;
    case "32":
      sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(8)').innerHTML=jk[t][c][s];
      sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(8)').setAttribute("id", s);
      break;
    case "34":
      sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(9)').innerHTML=jk[t][c][s];
      sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(9)').setAttribute("id", s);
}
//console.log( t,c,s, jk[t][c][s]); 
  });
 });
});
}// End table gen for oder

 selod5={};secid='';
}else{alert('Select order first')}
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
 document.getElementById('bnm7').style.display='block';
  document.getElementById('p78').style.display='none';
 document.getElementById('gstall').innerHTML='';
 newc();
 document.getElementById('in1').checked=true;
 
 // new date today
 todaydate();
}


///each oninput table cell
let totqt=[];
function inclick(zx){
 //macin();
 let qt=Number(zx.value);let ep=zx.parentElement.parentElement;
 let tbid=ep.parentElement.parentElement.id;
// alert('hi')
 let xn=Array.from(ep.children).indexOf(zx.parentNode);
// console.log('cvbnmkkk',tbid,xn);
let pk1=document.getElementById(tbid).rows;let pk11=pk1.length;
let jk=0;
for(let i = 2; i < pk11; i++){
   jk+=Number(pk1[i].cells[xn].querySelector('input').value);
}//console.log(zx,zx.value,'asd');
 let ihj=document.querySelectorAll("#"+tbid+" > thead > tr.w3-red > th")[xn].innerText;
// let ihj1=zx.parentElement.parentElement;
 let ihj2=document.querySelectorAll("#"+tbid+" > thead > tr.w3-red > th")[0].innerText;
 // console.log('kjkj',ihj2,ihj1.querySelector('th').innerText,ihj,zx.value);
 stork(ihj2,ep.querySelector('th').innerText,ihj,qt);
 // console.log(od);
document.querySelectorAll("#"+tbid+" > thead > tr.w3-blue-grey > th")[xn].innerText=jk;
 let uy=document.querySelectorAll("#"+tbid+" > thead > tr.w3-blue-grey > th");let uy1=uy.length;
 let rt=0;
 for (let u = 1; u < uy1; u++) {
  rt+=Number(uy[u].innerText);
  // console.log('gggtttt',rt,yt12);
 }// console.log('fghjkk',rt);
 totqt[tbid.slice(-1)]=rt;
 document.getElementById('odert').innerText="Total-"+rt;
}

async function stockm() {
 document.getElementById('p78').style.display='block'
 document.getElementById('bnm7').style.display='none';
 newc2();
 await indb({"name":'ods'});
 setTimeout(()=>{
  document.getElementById('i88').innerHTML="<style>#ghy99,#p781{color: #fff!important; background-color: #000!important;}</style>";
 },10);
//  setTimeout(function () {document.getElementById('p781').click()}, 100);
 //document.getElementById('p781').click()
}

async function indb(d) {
  newc2();
selg=d.name;
document.getElementById('gstall').style.display='block';
// selgo(selg);

document.getElementById('gstall').innerHTML="<div class='w3-blue-gray' style='display:flex;position: sticky;top: -50px;z-index: 6;'><div class='w3-bar-item w3-button w3-border-right' onclick='delod()'>Del</div><div id='cout6' class='w3-bar-item w3-button w3-border-right'>Total</div><div onclick='resetd()' class='w3-bar-item w3-button w3-border-right'>Reset</div><button class='w3-button w3-bar-item w3-border-right' onclick='omprint()'>Print</button>"+"<div id='st91' class='w3-dropdown-hover'> <button class='w3-button w3-border-right'>Status</button><div id='st92' class='w3-hide w3-bar-block w3-border'> <a href='#' onclick='unpin()' class='w3-bar-item w3-button'>None</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Payment Pending</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Under Production</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Printing</a><a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Part Quantity</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>Pending</a> <a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>In Transit</a><a href='#' onclick='chnot(0,this)' class='w3-bar-item w3-button'>COD</a> <input onchange='chnot(1,this)' id='inp5' name='od84' class='w3-border w3-bar-item' type='text' style='padding:5px;display:none' placeholder='Write other...'></div></div>"+"<button onclick='printadd()' class='w3-button'>DTDC</button>"+"</div>"+"<div id='tre6'><ul id='oderli' class='w3-ul'></ul></div>";
// status toggle
document.getElementById('st91').addEventListener('click', (v) => {
document.getElementById('st92').classList.toggle('w3-show'); 
})
// count total
document.getElementById('cout6').addEventListener("click", function() {
  let fromod1=Number(localStorage.fromod);
  if(1+Number(zxc)-Number(localStorage.fromod)){couttot(fromod1,selg)}
  else{alert("No data to count total ")}
 })

await getods(selg).then(() => {
  // selod5=JSON.parse(pinloc);//console.log(selg,pinloc)
  setTimeout(()=>{pint();},100);
})

}

let clickh=0;
async function opodli(b) {
    let qwe5=b.parentElement.id.slice(1);
    console.log(b.parentElement.tabIndex,qwe5);
    if (selg!='inst') {
      // console.log(selg.slice(-1)+qwe5.slice(0,3));
      await mthdb(selg.slice(-1)+qwe5.slice(0,3));
      await oddb.od.get(Number(qwe5)).then((doc)=>{clickonod(b,qwe5,doc);});
    }else{
     await instdb.inst.get(Number(qwe5)).then((doc)=>{clickonod(b,qwe5,doc);});
    }
        
}
function clickonod(b,qwe5,doc) {
  clickh+=1;
  if((clickh % 2 == 0)){
    if(document.getElementById('aa5')){document.getElementById('my55').remove();document.getElementById('aa5').remove()}
  }else{
    if(!document.getElementById('my55')){b.parentElement.insertAdjacentHTML('afterend', "<div id='aa5' style='font-weight: 600;display: flex;'><div class='w3-small w3-button w3-border-right w3-dark-grey' id='b"+qwe5+"' onclick='editod(this)'>Edit</div><div onclick='copylink1("+`"s${qwe5}"`+")' class='w3-small w3-button w3-border-right w3-dark-grey w3-ripple'>Copy Link</div></div></div>"+"<div id='my55'>Sample Div</div>")}
       odtbl(doc.it,'tblom1','my55');
       }
}

// table gen for oder
function odtbl(jk,b,c2) {
document.getElementById(c2).innerHTML="<table id='"+b+"'></table>";
var sd1=document.getElementById(b);
Object.keys(jk).forEach(function(t) {
  //  type loop
  if((t==='Bio')||(t==='NBio')){
    sd1.innerHTML+="<tbody id='"+t.replace(/\s+/, "")+"'><tr> <th>"+t+"</th> <th>36</th> <th>38</th> <th>40</th> <th>42</th> <th>44</th> <th>46</th> </tr></tbody>";
  }else if((t==='Kids')){sd1.innerHTML+="<tbody id='"+t.replace(/\s+/, "")+"'><tr> <th>"+t+"</th> <th>20</th> <th>22</th> <th>24</th> <th>26</th> <th>28</th> <th>30</th> <th>32</th> <th>34</th> </tr></tbody>";
}
  else{sd1.innerHTML+="<tbody id='"+t.replace(/\s+/, "")+"'><tr> <th>"+t+"</th> <th>XS</th> <th>S</th> <th>M</th> <th>L</th> <th>XL</th> <th>XXL</th> </tr></tbody>";
}
  
 Object.keys(jk[t]).forEach(function(c) {
  // color loop
  let td2=' ';
  if((t==='Kids')){td2="<td></td> <td></td>"}
   sd1.querySelector('#'+t).innerHTML+="<tr id='"+c.replace(/\s+/, "")+"'> <th>"+c+"</th> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>"+td2+"</tr>";
   Object.keys(jk[t][c]).forEach(function(s) {
    // size loop

  switch (s) {
  case "20":
  case "36":
  case "XS":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(2)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(2)').setAttribute("id", s);
    break;
  case "22":
  case "38":
  case "S":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(3)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(3)').setAttribute("id", s);
    break;
  case "24":
  case "40":
  case "M":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(4)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(4)').setAttribute("id", s);
    break;
  case "26":
  case "42":
  case "L":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(5)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(5)').setAttribute("id", s);
    break;
  case "28":
  case "44":
  case "XL":
   sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(6)').innerHTML=jk[t][c][s];
   sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(6)').setAttribute("id", s);
    break;
  case "30":
  case "46":
  case "XXL":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(7)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(7)').setAttribute("id", s);
    break;
  case "32":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(8)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(8)').setAttribute("id", s);
    break;
  case "34":
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(9)').innerHTML=jk[t][c][s];
    sd1.querySelector('#'+t.replace(/\s+/, "")+' #'+c.replace(/\s+/, "")+' '+'td:nth-child(9)').setAttribute("id", s);
}
     
//console.log( t,c,s, jk[t][c][s]); 
  });
 });
});
}// End table gen for oder


let secid='';
function selod(h) {
  let crrid=h.parentElement.parentElement.id;
  if ((secid!='')&&(secid!=crrid)) {
  document.querySelectorAll('#'+secid+'> li input').forEach((v)=>{
    if(v.checked){
      v.click();
    }
    });
  }

  let er5=h.id;
  if(h.checked){
    selod5[er5]=er5;
    secid=crrid;
   }else{
    delete selod5[er5];
    !Object.keys(selod5).length&&(secid='');
  }
 console.log(selod5, secid);
}
 // count total and make table
//alert('',xc)
  let pd2;
  async function couttot(xc,gd) {  
  // let st = new Localbase('st');
  newc2();
  pd2=structuredClone(ods1);//{...ods1}
  // console.log(pd2);
let oldm=localStorage.lastreset.split(','); // '304,34' 
console.log(oldm[0],date1,oldm[1],xc,zxc);
if (oldm[0]!=date1) {
  let lr=Number(oldm[1]);let lr1=500;
  await mthdb(gd.slice(-1)+oldm[0]);
  for(let v = lr; v <= (lr+lr1); v++){
  // st.collection(gd).doc('od'+(oldm[0])+v).get().then(doc => {
    await oddb.od.get(Number(oldm[0]+''+v)).then((doc)=>{
    if (doc) {
    // console.log('1',v);
    lelo(doc.it);
    // }else{console.log('0',v);
  }
}).catch(err => {console.log(err)});
}
}
await mthdb(gd.slice(-1)+date1);
for(let v1 = xc; v1 <= Number(zxc); v1++){  
// st.collection(gd).doc('od'+date1+v1).get().then(doc => {
  await oddb.od.get(Number(date1+v1)).then((doc)=>{
    // console.log(date1+''+v1)
  if (doc) {lelo(doc.it);}
  // else{console.log('0',v1);
}).catch(err => {console.log(err)});
  }
 }
 
// for instock
async function couttotinst(xc,gd) {  
  // let st = new Localbase('st');
  pd2=structuredClone(ods1);
  // console.log(pd2);
  // st.collection(gd).doc('od'+xc).get().then(doc => {
    await instdb.inst.get(xc).then(doc => {
    lelo(doc.it);
  })
}


function lelo(kk) {
    Object.keys(kk).forEach(function(t) {
  //  type loop
 Object.keys(kk[t]).forEach(function(c) {
  // color loop
   Object.keys(kk[t][c]).forEach(function(s) {
    // size loop
    pd2[t][c][s]+=kk[t][c][s];
    //console.log(pd2[t][c][s],kk[t][c][s]);
 // console.log( t,c,s, od[t][c][s]); 
  });
 });
}); 
//<input class='w3-border w3-input' type='text' style='padding: 0' placeholder='Write Notes...'></div>
let tfv17="<div class='w3-panel' style='padding: 0;margin: 0'><table id='testTable' class='w3-table-all w3-bordered w3-centered w3-striped w3-border test' style='color:#000'><tr class='w3-green'><th><a id='acsv' href='#'>Type</a></th><th>Color</th><th>Size</th><th>QT.</th></tr>";
//document.getElementById('gstall').innerHTML='';
document.getElementById('id01').style.display='block';
document.getElementById('bnm7').style.display='none';
document.getElementById('gstall').style.display='block';
// document.querySelector('#id01 span').style.display='';
var tfv27=''; var qt5=0;// console.log(pd2)
Object.keys(pd2).forEach(function(t) {
  //  type loop
 Object.keys(pd2[t]).forEach(function(c) {
  // color loop
   Object.keys(pd2[t][c]).forEach(function(s) {
    // size loop
    if(!(pd2[t][c][s]===0)){
     qt5+=pd2[t][c][s];
    tfv27+="<tr><td>"+typep7[t]+"</td><td>"+c+"</td><td>"+s+"</td><td>"+pd2[t][c][s]+"</td></tr>";}
 // console.log( t,c,s, od[t][c][s]); 
  });
 });
});
document.getElementById('tre6').innerHTML=tfv17+tfv27+'</table></div>';
 tfv27='';
  document.querySelector('#testTable tr th:last-child').innerHTML='Qt. '+qt5;
}

let dfg6=0;
let tyg=document.querySelectorAll('#id01 .w3-modal-content button');
tyg.forEach(omak)
function omak(n,i,a){  
 n.addEventListener("click", function() {
  let idrr='';
  if(n.id==='ghy99'||n.id==='p781'||n.id==='p782'||n.id==='p783'||n.id==='p784'){idrr='#'+n.id+','+'#ghy99,'}
  if(n.id){
    if(n.id!='lastimgc'){
   document.getElementById('i88').innerHTML="<style>"+idrr+"#"+n.id+"{color: #fff!important; background-color: #000!important;}</style>";
  }}
  else{
   dfg6++;
   n.setAttribute('id','ghy'+dfg6)
  document.getElementById('i88').innerHTML="<style>#ghy"+dfg6+"{color: #fff!important; background-color: #000!important;}</style>";
 }
})
}

// export tabletocsv
 function tabletcsv(table_id,oderno,separator = ',') {
    // Select rows from table_id
    let rows = document.querySelectorAll('table#' + table_id + ' tr');let rows1=rows.length;
    // Construct csv
    let csv = [];
    for (let i = 0; i < rows1; i++) {
        let row = [], cols = rows[i].querySelectorAll('td, th');let cols1=cols.length;
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
    let filename = oderno+ '.csv';
    let link9='data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string);
    // Download it
    download(link9,filename);
    let acsv=document.getElementById('acsv');acsv.style='color:blue';
    acsv.innerText='Download';acsv.setAttribute('target', '_blank');
    acsv.href=link9;acsv.setAttribute('download', filename);
}

  // Download image
function downl(imgurl,imgnm){
let htl="<a id='link55' href='"+imgurl+"' download='"+imgnm+"'>hjhj</a>";
let iframe = document.createElement('iframe');
document.body.appendChild(iframe);
iframe.contentWindow.document.open();
iframe.contentWindow.document.write(htl);
iframe.contentWindow.document.getElementById('link55').click();
iframe.contentWindow.document.close();
 setTimeout(function(){ iframe.remove()}, 5000);
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
async function chnot(b,v) {
  let dq=document.querySelector('#'+secid);
  let sel=Object.keys(selod5);
  let cd='';
  if(sel.length){
    sel.forEach((fv,i)=>{
      cd+=(i+1)+'- '+dq.querySelector('#'+fv).nextElementSibling.innerText+'\n';
    });
if(confirm(cd+' Status will change to '+v.innerText)){
    selgo(selg);//pint(1);
   let op5=JSON.parse(pinloc);
    sel.forEach((fv,i)=>{
      console.log(fv,b,v);
      if (!secid.match(/\w\d{3}/g)) {
        if (b===1) {
          op5[fv]=v.value;
          dq.querySelector('#vtag [name='+fv+']').innerHTML=v.value;
           v.value='';
        }else{
          op5[fv]=v.innerText;
          dq.querySelector('#vtag [name='+fv+']').innerText=v.innerText;
        }
      }else{
        op5[fv]=v.innerText;
      }
      dq.querySelector('#'+fv).checked=false;
    });
  selpin(selg);
  localStorage.setItem(pinz,JSON.stringify(op5));
  let vkz5={ p: "3","g":selg, od:{...op5}};
  if (secid.match(/\w\d{3}/g)){
    await indb({name:selg}).then(() => document.getElementById('st92').classList.toggle('w3-show'));
  }
 await sendd(urli,vkz5,'pin');}
 selod5={};secid='';
}else{alert('Select order first.')
  }
}

// pin onload
async function pint(v) {
  selgo(selg);let aul=document.getElementById('oderli');
  let j=JSON.parse(pinloc);
  for (const t in j) {
    let px=document.getElementById(t);
    let pxn=px.parentNode;
    pxn.querySelector('#vtag [name='+t+']').innerText=j[t];
      // console.log(t,pj,t);
      let pj=pxn.tabIndex;
      if (pj>0) {
    await db.pt.get(pj).then((v)=>{
      if (v) {
        !!(v.add)||(pxn.style.color='blue'); // if add=='' txt color blue
        if (v.gst) {
            let zw=pxn.querySelector('span[onclick] span');
            zw.innerText='GST';
            zw.style.padding='';
        }
      }else{
        (pxn.style.color='red'); // if no party found txt color red
      }
    });}
  }
  for (let u in selod5) {document.getElementById(u).checked=false;}selod5={};
}

function unpin(){
  let sel=Object.keys(selod5);
  let cd='';
  sel.forEach((fv,i)=>{
    cd+=(i+1)+'- '+document.querySelector('#oderli '+'#'+fv).nextElementSibling.innerText+'\n';
  });
  if(confirm(cd+' Will be unpin')){
  selgo(selg);
  let mk5=JSON.parse(pinloc);
  for (const t in selod5) {
    let px1=document.getElementById(t);
    px1.parentNode.style.background='#fff';
   document.querySelector('#vtag [name='+t+']').innerText='';
   delete mk5[t];
    px1.checked=false;
  }
  selpin(selg);
  localStorage.setItem(pinz,JSON.stringify(mk5));
  selod5={};
  let vkz6={ p: "3","g":selg,od:{...mk5}};
  sendd(urli, vkz6,'unpin');
}
}

var pinloc='{}';
function selgo(g) {
  switch (g) {
    case 'ods':
      pinloc=localStorage.pin;
      break;
    case 'odt':
      pinloc=localStorage.pint;
      break;
    case 'odk':
      pinloc=localStorage.pink;
      break;
    case 'odpd':
      pinloc=localStorage.pinpd;
      break;
    case 'inst':
        pinloc=localStorage.inst;
        break;
  }
}
var pinz='';
function selpin(g) {
  switch (g) {
    case 'ods':
      pinz='pin'
      break;

    case 'odt':
      pinz='pint'
      break;

    case 'odk':
      pinz='pink'
      break;

    case 'odpd':
      pinz='pinpd'
      break;

    case 'inst':
        pinz='inst'
        break;
    default:
      break;
  }
}

// onload set last image
  let tt5=JSON.parse(localStorage.imglastod);
  document.getElementById('lastodimg').src=tt5.im5;
  document.getElementById('lastodcn').innerHTML=tt5.cn;

  document.getElementById('lastimgc').addEventListener('click', async(v) => {
    let blobx=await makeblob(tt5.im5);
    await navigator.clipboard.write([new ClipboardItem({"image/png": blobx}),]);
    await snackbar(tt5.cn.match(/[^\d+\s].+/g)[0]+" copied",500);
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

async function snackbar(txt,time) {
  let x = document.getElementById("snackbar");
  x.style.display='';
  x.innerHTML=txt;
  setTimeout(function(){ x.style.display='none'; }, time);
}

window.addEventListener('online', () => {
  document.body.classList.remove("w3-grayscale-min");
  snackbar("Online",500);
});
window.addEventListener('offline', () => {
  document.body.classList.add('w3-grayscale-min');
  snackbar("Offline",500);
});

window.navigator.onLine||document.body.classList.add('w3-grayscale-min');
