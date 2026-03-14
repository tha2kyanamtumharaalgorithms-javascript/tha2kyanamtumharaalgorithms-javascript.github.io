function bill(x) {
    let gststate = {"01":"Jammu And Kashmir","02":"Himachal Pradesh","03":"Punjab","04":"Chandigarh","05":"Uttarakhand","06":"Haryana","07":"Delhi","08":"Rajasthan","09":"Uttar Pradesh","10":"Bihar","11":"Sikkim","12":"Arunachal Pradesh","13":"Nagaland","14":"Manipur","15":"Mizoram","16":"Tripura","17":"Meghalaya","18":"Assam","19":"West Bengal","20":"Jharkhand","21":"Odisha","22":"Chattisgarh","23":"Madhya Pradesh","24":"Gujarat","26":"Dadra And Nagar Haveli And Daman And Diu","27":"Maharashtra","28":"Andhra Pradesh(old)","29":"Karnataka","30":"Goa","31":"Lakshadweep","32":"Kerala","33":"Tamil Nadu","34":"Puducherry","35":"Andaman And Nicobar Islands","36":"Telangana","37":"Andhra Pradesh","38":"Ladakh","97":"Other Territory","99":"Centre Jurisdiction"};
    let qt=0;let amt=0;
    if (true) {
      let x=window.aaa;
      console.log(x);
      let doc=document.querySelector('#tembill');
      // x.pc={ "Oversize 210gsm": { "1": [ "XL", "XXL" ], "2": [ "S", "M", "L" ] } };
      // x.pc={ "Biowash Rneck": { "145": [ "36", "38", "40", "42" ], "150": [ "44", "46" ] }, "PC Polo": { "180": [ "36", "38", "40", "42", "44" ], "185": [ "46" ] }, "Sweatshirt": { "215": [ "S", "M", "L", "XL" ], "225": [ "XXL" ] } };
      let gst=x.gstno?.toUpperCase().trim();
      let stgst = gst.slice(0, 2) + '-' + gststate[gst.slice(0, 2)];
      let gstz = (gst.length > 3)?true:'';
      let add=``;
      let shp=x.shp.slice(-1);
      if(shp=='1'){
        add=`${x.add && ('<br/>' + x.add + (x.pin && (', ' + x.pin)))}`;
      }else if(shp=='2'){}else if(shp=='3'){
        add=x.add.split(',').slice(0,4).reverse();delete add[1];add='<br/>'+add.join(', ').replace(', , ','')
        console.log(add);
      }else if(x.shp.includes('4rkb')){
        let td= doc.querySelector("#doc1 > div > table:nth-child(1) > tbody > tr > td");
        td.innerHTML=``;
        let txt=`<p class="companyNameHeaderTextSize boldText">${x.nm}</p><p class="bigTextSize">Near J J Colony, Khanpur Village,<br>Main Road, South Delhi, 110062 <br> Phone No.: +91-${x.mn1} <br>State: 07-Delhi </p>`
        td.innerHTML = txt;
        doc.querySelector("#doc1 > div > table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > table:nth-child(4)").innerHTML = '';
        doc.querySelector("#doc1 > div > table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(2) > table:nth-child(2)").innerHTML = '';
        doc.querySelector("#ptd").innerHTML = `<b style='font-size: 16px;'>${x.b.cn}</b><br/>${x.b.add1+'<br/>'+x.b.add2+', '+x.b.pin}${'<br/>Contact No.: ' + x.b.id}`;
        doc.querySelector("#inno").innerHTML = `<p>Invoice No.: ${x.odid.slice(-13)}</p><p>Date: ${new Date(x.dt).toLocaleDateString("kkk", {day: "numeric",month: "numeric",year: "numeric"})}</p>`;
        if(x.tv>22000){
          x.tv=44000;
        }else{
          x.tv=x.tv*2;
        }
        
        document.querySelector("#tbody").innerHTML=`<tr><td>1</td><td>Plain Cloth</td><td>6109</td>
        <td>${x.dl[0]}</td><td>₹${(x.tv/x.dl[0]).toFixed(2)}</td><td class="theme10BorderColor">₹${x.tv.toFixed(2)}</td></tr>`;
        document.querySelector("#ttqt").innerHTML=x.dl[0];
        document.querySelector("#ttpc").innerHTML=`₹${x.tv.toFixed(2)}`;
        let ht='';
        ht+=ttr(`GST@${x.gstp}%`,((x.gstp/100)*x.tv));//ht+=`<tr><td></td><td></td></tr>`;
        let p=(((x.gstp/100)*x.tv)+x.tv);
        let r=Math.ceil(p);
        ht+=ttr(`Round Off`,r-p);
        ht+=`<tr class="final"><td>Total</td><td>₹${r.toLocaleString('en-IN')}.00</td></tr>`; 
        document.querySelector('#tblf').innerHTML=ht;
        return;
      }
      doc.querySelector("#ptd").innerHTML = `<b style='font-size: 16px;'>${x.nm}</b>${add}${x.mn1 && ('<br/>Contact No.: ' + x.mn1)}${gstz && ('<br/>GSTIN Number: ' + gst)}${gst && ('<br/>State: ' + stgst)}`;
    
      doc.querySelector("#inno").innerHTML = `<p style='font-weight: 500;'>${gst && ('Place of Supply: ' + stgst)}</p><p>Invoice No.: ${x.odid.slice(-13)}</p><p>Date: ${new Date(x.dt).toLocaleDateString("kkk", {day: "numeric",month: "numeric",year: "numeric"})}</p>`;
      let od1=Object.keys(x.od);let samplebulk=typeof x.pc[Object.keys(x.pc)[0]]=='number';
        if ((od1.length !== 0)) {
          let type={};// qt
          let upc={}; // unit price
          // let upc1={}; 
        od1.forEach(t=>{
            let pc1,pczc,pc;
            if(samplebulk){
                pc=x.pc[t];
            }else{
            pc1=Object.entries(x.pc[t]);
            console.log(pc1);
            pczc=pc1.length>1;
            }

          type[t]={};
          
          Object.keys(x.od[t]).forEach(c=>{
            let ks=Object.keys(x.od[t][c]);
            ks.forEach(s=>{
              // console.log(t,c,s,od[t][c][s]);
              // console.log(pc1);
              let v3;
              if(samplebulk){
                // if(x1.hasOwnProperty(s)){v3=x10}
                // else if(x2.hasOwnProperty(s)){v3=x20}
                // else if(x3.hasOwnProperty(s)){v3=x30}
                v3='';
               console.log(v3);
            }else{
                 let p1=pc1[0];
              if(pczc){
                if(p1[1].includes(s)){
                  pc=Number(p1[0]);
                  v3=p1[1]
                }else{
                  pc=Number(pc1[1][0]);
                  v3=pc1[1][1]
                }
                
              }else{
                  pc=Number(p1[0]);
                  v3=p1[1]
              }
            }
    
              v3=(v3.length>2)?`${v3[0]} to ${v3[v3.length-1]}`:`${v3.toString()}`;
    
              if (type[t].hasOwnProperty(v3)) {
                type[t][v3][1]+=x.od[t][c][s];
              } else {
                type[t][v3]=[pc,x.od[t][c][s]];
              }
              
            })
          })
        });
          console.log(type,upc);
          let row='';
          let ct=0;qt=0;amt=0;
          Object.keys(type).forEach(t1=>{
            Object.keys(type[t1]).forEach(v=>{
              console.log(t1,v,type[t1][v]);
              let pcqt=type[t1][v];let amt1=pcqt[0]*pcqt[1]
              ct+=1;amt+=amt1;qt+=pcqt[1];
              row+=`<tr>
                <td>${ct}</td><td>${t1+(v?' - '+v:'')}</td><td>6109</td>
                <td>${pcqt[1]}</td><td>₹${pcqt[0]}</td><td class="theme10BorderColor">₹${amt1}.00</td>
              </tr>`;
            })
          });
          document.querySelector("#tbody").innerHTML=row;
          document.querySelector("#ttqt").innerHTML=qt;
          document.querySelector("#ttpc").innerHTML=`₹${amt}.00`;
        }

      let ht='';
      if (x.dis) {
       amt-=x.dis;
       ht+=ttr('Discount',x.dis);
      }

      if(x.tch){
      let tch=Number(x.tch.split('z')[0]);
      amt+=tch;
      ht+=ttr('Shipping',tch);
      }

      if(x.tpch){
        amt+=x.tpch;
        ht+=ttr('Local transport',x.tpch);
      }

      if(x.ttpch){
        amt+=x.ttpch;
        ht+=ttr('Transport charge',x.ttpch);
      }

      if(x.pch){
        amt+=x.pch;
        ht+=ttr('Packing charge',x.pch);
      }

      ht+=ttr('Sub total',amt);
    
      let gstamt=(x.gstp/100)*amt;
      if (gst.slice(0, 2) == '07') {
        ht+=ttr(`SCST@${x.gstp/2}%`,(gstamt / 2));
        ht+=ttr(`CGST@${x.gstp/2}%`,(gstamt / 2));
      } else {
        ht+=ttr(`IGST@${x.gstp}%`,gstamt);
      }
    
      amt+=gstamt;
      ht+=`<tr class="final"><td>Total</td><td>₹${Number(amt.toFixed(2)).toLocaleString('en-IN')}</td></tr>`;
      document.querySelector('#tblf').innerHTML=ht;
    } else {
      // alert('')
    }

    function ttr(n,v) {return `<tr><td>${n}</td><td>₹${v.toFixed(2)}</td></tr>`}
};


      // let disamt=0;
      // dis.forEach(v=>{
      //   if (v.length) {disamt+=qt*v[1];}
      // });
      
    //   let dis=x.dis;let disamt=0;
    //   let dish=document.querySelector('#dis');
    //   dis.forEach(v=>{
    //     if (v.length) {disamt+=qt*v[1];}
    //   });
    //   if (disamt) {amt-=disamt;dish.innerHTML=`₹${disamt.toFixed(2)}`;
    //   }else{dish.parentNode.remove();}

    //   let tch=Number(x.tch.split('z')[0]);
    //   amt+=tch;
    //  document.querySelector('#tch').innerHTML=`₹${tch.toFixed(2)}`;
    
    //   document.querySelector("#st").innerHTML = `₹${amt.toFixed(2)}`;
    
    //   let gstp=x.gstp/100;let gstamt=gstp*amt;
    //   if (x.gstno.slice(0, 2) == '07') {
    //     document.querySelector('#igst').parentNode.remove();
    //     document.querySelector('#scst').innerHTML = '₹' + (gstamt / 2).toFixed(2);
    //     document.querySelector('#cgst').innerHTML = '₹' + (gstamt / 2).toFixed(2);
    //   } else {
    //     document.querySelector('#scst').parentNode.remove();
    //     document.querySelector('#cgst').parentNode.remove();
    //     document.querySelector('#igst').innerHTML = '₹' + gstamt.toFixed(2);
    //   }
    
    //   amt+=gstamt;
    
    // document.querySelector('#ttt').innerHTML = '₹' + amt.toLocaleString('en-IN');


// document.querySelector('#och').parentNode.remove();
    //  let phxx = (Math.ceil(amt) - amt);
    //   if (phxx) {
    //     document.querySelector('#roff').innerHTML = '₹' + phxx.toFixed(2);
    //   } else {
    //     document.querySelector('#roff').parentNode.remove();
    //   }