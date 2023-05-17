self.addEventListener("fetch", (event) => {
    let url=event.request.url;
    console.log(`fetch for url ${url}`);
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log("Found in cache: "+url);
          return response;
        }
        console.log("Not found in cache: "+url);
        return fetch(event.request)
          .then((response) => {
            console.log("fetch from Net: "+url);
            console.log(response.headers.get("last-modified"));
               const clonedResponse = response.clone();
            caches.open("v1").then((cache) => {cache.add(url, clonedResponse);});
            return response;
          })
          .catch((error) => {
            console.error(`Fetching failed: ${url}`);
            // throw error;
          });
      })
    );
  });
//   let p="http://127.0.0.1:5500/";
let p=location.pathname;
 if (p.match(/\/d\/index.html/)){
    p='/d/';
}else if (p.match(/\/index.html/)){
    p='/';
}

let d=[p+"index.html",
p+"rop.html",
p+"pc.html",
p+"exgst.html",
p+"allcache.html",
p+"my.js",
p+"myy.js",
p+"om.js",
p+"w3.js",
p+"dexie.min.js",
p+"exgst.js",
p+"vue.js",
p+"sw.js",
p+"my.css",
p+"om.css",
p];

caches.open('v1').then((cache)=>{
    cache.addAll(d);
})


// caches.open('v1');
// self.addEventListener("install", (event) => {
//     event.waitUntil(caches.match(p).then((res)=>{
//            console.log(!res);
//            if (!(res)) {
//                caches.open('v1').then((cache)=>{
//                    cache.addAll(d);
//                })
//            }}));
//    });

