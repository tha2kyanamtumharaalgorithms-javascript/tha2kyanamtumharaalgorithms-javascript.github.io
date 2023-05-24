async function erradd(id,t,obj,er) { 
  let da={"id":id,"type":t,"p":obj.p,"data":obj,"err":er};
  console.log(da.id);
  await erdb.err.put(da,da.id);
 }

//sendd(urli,od,'type')
async function sendd(urld,d9,b) {
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
      errid&&(await erdb.err.delete(errid));
    })
    .catch(async(error) => {
      switch(d9.p) {
        case '0':
        case '1':
          await erradd(d9.od.id,b,d9,error);
        break;

        case '2':
        case '4':
        case '5':
          await erradd((new Date().getTime()),b,d9,error);
        break;

        case '3':
          await erradd(111,b,d9,error);
        break;

        case '10':
          await erradd(d9.ptd.id,b,d9,error);
        break;

        default:
          
        break;
      }

      if(localStorage.gr5!='hi2'){
      console.log(b+' sendd failed'+' '+error);
      console.log(d9);
      // alert(b+' sendd failed '+JSON.stringify(d9)+' '+error+'\nTake a screenshot for Onkar');
    }

    });
}




