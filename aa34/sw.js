self.addEventListener('message', event => {
  const d = event.data;
  console.log(d[0],d[1]); // dlid , data
  let dlid=d[0];
  if (dlid.dl=='rkb') {
    let myd1 = new FormData();
    myd1.append('myd', JSON.stringify(dlid.book[0]));
    myd1.append('t', 'rkb');
    myd1.append('id', JSON.stringify(dlid.book[1]));
    d[1].body=myd1;delete d[1].headers;
  }
  fetch(d[0].url,d[1])
    .then(res => res.json())
    .then(data => {
      self.postMessage([d[0],data]);
    })
    .catch(error => {
      self.postMessage({ error: error });
    });
});