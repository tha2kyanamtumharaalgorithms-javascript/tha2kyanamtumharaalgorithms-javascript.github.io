self.addEventListener('message', event => {
    const d = event.data;
    console.log(d[0]); // dlid
    console.log(d[1]); // data
    fetch(d[0].url,d[1])
      .then(res => res.json())
      .then(data => {
        self.postMessage([d[0],data]);
      })
      .catch(error => {
        self.postMessage({ error: error });
      });
  });

// self.addEventListener("fetch", (event) => {
//     let url=event.request.url;
//     if (/script.google.com/.test(url)) return;
//     if (/postalpincode/.test(url)) return;
//     if (/shiprocket/.test(url)) return;
    
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) {
//           console.log("Found in cache: "+url);
//           return response;
//         }
//         console.log("Not found in cache: "+url);
//         return fetch(event.request)
//           .then((response) => {
//             console.log("fetch from Net: "+url);
//             console.log(response.headers.get("last-modified"));
//                const clonedResponse = response.clone();
//             caches.open("v1").then((cache) => {cache.add(url, clonedResponse);});
//             return response;
//           })
//           .catch((error) => {
//             console.error(`Fetching failed: ${url}`);
//             // throw error;
//           });
//       })
//     );
//   });

// let p=location.pathname;
//  if (p.match(/\/dd\/index.html/)){
//     p='/dd/';
// }else if (p.match(/\/aa\/index.html/)){
//     p='/aa/';
// }else if (p.match(/\/index.html/)){
//   p='/';
// }
// let d=[p+"index.html",
// p+"rop.html",
// p+"pc.html",
// p+"exgst.html",
// p+"allcache.html",
// p+"my.js",
// p+"myy.js",
// p+"om.js",
// p+"w3.js",
// p+"dexie.min.js",
// p+"exgst.js",
// p+"vue.js",
// p+"sw.js",
// p+"my.css",
// p+"om.css",
// p];

// caches.open('v1').then((cache)=>{
//     cache.addAll(d);
// })