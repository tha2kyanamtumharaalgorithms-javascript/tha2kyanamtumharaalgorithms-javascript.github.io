// async function erradd(id,t,obj,er) { 
//   let da={"id":id,"type":t,"p":obj.p,"data":obj,"err":er};
//   console.log(da.id);
//   await erdb.err.put(da,da.id);
//  }

//sendd(urli,od,'type')
async function sendd(urld,d9,b,q) {
 let da={"id":0,"type":b,"p":d9.p,"data":d9};
  switch(d9.p) {
    case '0':
    case '1':
      da.id=d9.od.id;
    break;

    case '2':
    case '4':
    case '5':
      da.id=(new Date().getTime());
    break;

    case '3':
      da.id=111;
    break;

    case '10':
      da.id=d9.ptd.id;
    break;

    default:
      
    break;
  }
  await fetch(urld, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    body: JSON.stringify(d9)
  })
    .then(async(res) => {
      console.log(b+' data send successfully ', d9);
      cuuid[1].push(da);
    })
    .catch(async(error) => {
        if (q!=='z') {
        await erdb.err.put(da);
      }else{
        console.log(da.id);
        cuuid[0].push(da);
      }
      console.log(b+' sendd failed '+error);
      console.log(d9);
      alert(b+' sendd failed '+JSON.stringify(d9));
    });
}




