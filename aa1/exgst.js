
let oddb;
async function mthdb(m) {
oddb = new Dexie(m);
oddb.version(1).stores({od: "id,dt,bulk"}); 
}
// let posList = ["01-Jammu & Kashmir", "02-Himachal Pradesh", "03-Punjab", "04-Chandigarh", "05-Uttarakhand", "06-Haryana", "07-Delhi", "08-Rajasthan", "09-Uttar Pradesh", "10-Bihar", "11-Sikkim", "12-Arunachal Pradesh", "13-Nagaland", "14-Manipur", "15-Mizoram", "16-Tripura", "17-Meghalaya", "18-Assam", "19-West Bengal", "20-Jharkhand", "21-Odisha", "22-Chhattisgarh", "23-Madhya Pradesh", "24-Gujarat", "25-Daman & Diu", "26-Dadra & Nagar Haveli", "27-Maharashtra", "29-Karnataka", "30-Goa", "31-Lakshdweep", "32-Kerala", "33-Tamil Nadu", "34-Pondicherry", "35-Andaman & Nicobar Islands", "36-Telangana", "37-Andhra Pradesh","38-Ladakh", "97-Other Territory"];
let stat={"01":"Jammu and Kashmir","02":"Himachal Pradesh","03":"Punjab","04":"Chandigarh","05":"Uttarakhand","06":"Haryana","07":"Delhi","08":"Rajasthan","09":"Uttar Pradesh","10":"Bihar","11":"Sikkim","12":"Arunachal Pradesh","13":"Nagaland","14":"Manipur","15":"Mizoram","16":"Tripura","17":"Meghalaya","18":"Assam","19":"West Bengal","20":"Jharkhand","21":"Odisha","22":"Chhattisgarh","23":"Madhya Pradesh","24":"Gujarat","25":"Daman and Diu","26":"Dadra and Nagar Haveli and Daman and Diu","27":"Maharashtra","29":"Karnataka","30":"Goa","31":"Lakshadweep","32":"Kerala","33":"Tamil Nadu","34":"Pondicherry","35":"Andaman and Nicobar Islands","36":"Telangana","37":"Andhra Pradesh","38":"Ladakh","97":"Other Territory"};
let db = new Dexie("party");db.version(2).stores({pt: "id,cn,mn1,mn2,*ods"});

    window.indexedDB.databases().then((e)=>{
      let b=[];
      e.forEach((v,i)=>{
           if (String(v.name).match(/\w\d{3}/g)) {
            let x=(2+v.name.slice(1));let moth=Number(x[2]+x[3])-1;
             let mymth=new Date('20'+x[0]+x[1],moth).toLocaleDateString('en-GB', {
              month : 'short',
              year : 'numeric'
              });
              b[i]=`<a id="${v.name}" onclick="excsv('${v.name}')" class="w3-blue w3-hover-purple w3-button">${mymth}</a>`;
           }
      });
      document.getElementById('allmth').innerHTML+=b.join('');
    });
let excsv1;
async function excsv(mth) {
excsv1="GSTIN/UIN of Recipient,Receiver Name,Invoice Number,Invoice date,Invoice Value,Place Of Supply,Reverse Charge,Applicable % of Tax Rate,Invoice Type,E-Commerce GSTIN,Rate,Taxable Value,Cess Amount\r\n";
await new Promise(async(resolve, reject)=>{
await mthdb(mth);
  await oddb.od.each(async(d)=>{
    console.log(d);
    if (d.bulk&&d.tot) {
        console.log('1');
        await db.pt.get(Number(d.pt)).then(async(pt) => {
            if(pt.gst){
            let dt1=d.dt.split('/').join('-');
            let gsts=pt.gst.slice(0,2);
            let poi=[pt.gst,d.cn,d.id,dt1,d.inv[1].toFixed(1),(gsts+'-'+stat[gsts]),"N","","Regular B2B","","5.0",d.inv[0].toFixed(1),"0.0\r\n"].toString();
            excsv1+=poi;
            }
        })
    }
});
    await oddb.od.count().then((v) => {
         setTimeout(()=>{console.log('2');resolve();},v*2);
    });
});
await new Promise(async(resolve, reject)=>{
        console.log('3');
        let link1 = document.getElementById(mth);
        let txt=link1.innerText;
        let nm=txt+' '+(new Date().toLocaleTimeString("en-GB"))+'.csv';
        let url='data:text/csv;charset=UTF-8,'+encodeURI(excsv1);
        let htl=`<a id="link55" href="${url}" download="${nm}"></a>`;
        let iframe = document.createElement("iframe");
        iframe.style.opacity='0';
        document.head.appendChild(iframe);
        let docx=iframe.contentWindow.document;
        docx.open();
        docx.write(htl);
        docx.getElementById("link55").click();
        docx.close();resolve(iframe);
        }).then((i) =>{
            setTimeout(()=> {
                // i.remove();
                let u=URL.createObjectURL(new Blob([excsv1], { type: 'text/plain' }));
                // window.open(u);
            }, 1000);
        });
}

// async function gencsv(data,mth){
//     let link1 = document.getElementById(mth);
//     let txt=link1.innerText;
//     let nm=txt+' '+(new Date().toLocaleTimeString("en-GB"))+'.csv';
//     let blob = new Blob([data],{type: 'text/csv;charset=utf-8;'});
//     let url = URL.createObjectURL(blob);
//     alert(excsv1);
//    await dfile(url,nm);
// }

// async function dfile(url,nm){
//    await new Promise(async(resolve, reject)=>{
//     let htl=`<a id="link55" href="${url}" download="${nm}"></a>`;
//     let iframe = document.createElement("iframe");
//     document.body.appendChild(iframe);
//     let docx=iframe.contentWindow.document;
//     docx.open();
//     docx.write(htl);
//     docx.getElementById("link55").click();
//     docx.close();resolve(iframe);
//     }).then((i) =>i.remove())
//   }

// function downloadBlob(content, filename, contentType) {
//     let blobx = new Blob([content], { type: contentType });
//     let urlx = URL.createObjectURL(blobx);
//     // let pomx = document.createElement('a');
//     // pomx.href = urlx;
//     // pomx.setAttribute('download', filename);
//     // pomx.click();
//     new Promise(async(resolve, reject)=>{
//         let iframe = document.createElement("iframe");document.body.appendChild(iframe);
//         let docx=iframe.contentWindow.document; 
//         docx.write(`<a id="link55" href="${urlx}" download="${filename}"></a>`);
//         docx.getElementById("link55").click();
//         resolve(iframe);
//         }).then((i) =>i.remove())
//     // dfile1(urlx,filename)
//   }
// dfile(csv, 'text/csv;charset=utf-8;')
// function dfile(content, contentType) {
//     return URL.createObjectURL(new Blob([content], { type: contentType }))
//   }

  

// let fr9=document.getElementById('frm5');
// let to9=document.getElementById('to5');
// fr9.valueAsDate=new Date(new Date()-(1000*60*60*24*20));to9.valueAsDate = new Date();
// console.log(fr9.valueAsNumber,fr9.valueAsDate);

// let pbar1=document.getElementById('myBar1');
// let pbar=document.getElementById('myBar');
// let odspt;let odspt1;let p1;
// function gentcsv() {
//     pbar1.style.display='';
//   odspt = [];odspt1 = [];
// (async()=>{
//     await db.pt.each((v)=>{
//         if (v.gst && v.ods.length) {
//         // if (v.gst && v.ods.length && (v.tot>10)) {
//             v.ods=[...new Set(v.ods)];v.gst=v.gst.trim().toUpperCase();
//             odspt.push(v);
//         }
//     });
//     await nnnn();
// })();
// console.log(odspt);
// }

// async function nnnn(){
// let fr1=(document.getElementById('frm5').valueAsNumber-19800000);let to1=(document.getElementById('to5').valueAsNumber-19800000);
// p1="data:text/csv;charset=utf-8,GSTIN/UIN of Recipient,Receiver Name,Invoice Number,Invoice date,Invoice Value,Place Of Supply,Reverse Charge,Applicable % of Tax Rate,Invoice Type,E-Commerce GSTIN,Rate,Taxable Value,Cess Amount\r\n";
// let pkl=odspt.length;let lp;
// console.log(new Date(fr1),'||',new Date(to1),'||',new Date("02/May/2023"));
//   for(let i = 0; i < pkl; i++){
//     // console.log(odspt);
//     lp=((i+1)/pkl)*100;
//     pbar.style.width = lp + '%';
//     pbar.innerHTML =  Math.round(lp) + '%';
//     // console.log(lp,'1hiiiiiii');
//     odspt1[i]=[];let pt=odspt[i];
//     odspt1[i][0]=pt;
//     let gsts=pt.gst.slice(0,2);
//     let pfgh=[...new Set(odspt[i].ods)];//console.log(pfgh);
//     let vb='';
//     for(let j = 0; j < pfgh.length; j++){
//     let odsf1=pfgh[j].slice(0,4);
//     let odsf=Number(pfgh[j].slice(1));
//         if (vb!=odsf1) {
//             vb=odsf1;
//             await mthdb(odsf1);
//         }
//         await oddb.od.get(odsf).then((d)=>{
//             console.log(odsf,d);
//         let dt1=d.dt.split('/').join('-');
//         let nd=new Date(dt1).getTime(); // console.log(nd);
//         if((fr1<=nd&&to1>=nd)){
//         if(d.bulk&&d.tot){
//         let poi=[pt.gst,d.cn,d.id,dt1,d.inv[1].toFixed(1),(gsts+'-'+stat[gsts]),"N","","Regular B2B","","5.0",d.inv[0].toFixed(1),"0.0\r\n"].toString();
//         p1+=poi;
//         }
//     }
//     });
//     }
// }

// // console.log(odspt1,p1);
// pbar1.style.display='none';
// let link1 = document.getElementById("alink");link1.style.display='';
// let fname="From "+fr9.value.split('-').reverse().join('_')+" To "+to9.value.split('-').reverse().join('_');
// link1.innerHTML="<li><a href="+encodeURI(p1)+" download='"+fname+".csv' class='w3-padding-small' style='text-decoration: none;'>❯ "+fname+" Download</a></li>"+link1.innerHTML;
// link1.querySelector('li > a').click();
// }


// let d=["GSTIN/UIN of Recipient",
//     "Receiver Name",
//     "Invoice Number",
//     "Invoice date",
//     "Invoice Value",
//     "Place Of Supply",
//     "Reverse Charge",
//     "Applicable % of Tax Rate",
//     "Invoice Type",
//     "E-Commerce GSTIN",
//     "Rate",
//     "Taxable Value",
//     "Cess Amount"];
   
// let p=["","","","","","","N","","Regular B2B","","5.0","","0.0"];
// let gsts=[0].gst.slice(0,2);
// let p=[.gst,.cn,.id,.dt,.inv[1],gsts+'-'+stat[gsts],"N","","Regular B2B","","5.0",.inv[0],"0.0"];
// p[0]=[0].gst;// GST of Recipient
// p[1]=[1].cn;// Receiver Name
// p[2]=[1].id;// Invoice Number
// p[3]=[1].dt.split('/').join('-');// Invoice date
// p[4]=[1].inv[1];// Invoice Value
// let gsts=[0].gst.slice(0,2);
// p[5]=gsts+'-'+stat[gsts];// Place Of Supply
// p[11]=[1].inv[0];// Taxable Value

// p[6]='N';// Reverse Charge
// p[7]='';// Applicable % of Tax Rate
// p[8]='Regular B2B';// Invoice Type
// p[9]='';// E-Commerce GSTIN
// p[10]='5.0';// Rate
// p[12]='0.0';// Cess Amount