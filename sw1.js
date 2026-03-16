self.addEventListener('message', async event => {
const d = event.data;
let d1=d?.[0];
     
if(d1=='fetch'){ // d=['fetch',{"odid":"","url":"","opt":{method: "POST"}}]
  try {
    let ft=await fetch(d[1].url,{...d[1].opt});
    let ft1=await ft.json();
    console.log(ft1);
    await setobj({"id":d[1].odid,"trc":ft1,"booked":true});
  } catch (err) {
    await setobj({"id":d[1].odid,"trc":err,"booked":false});
  }
}
console.log(d);
})

// install, activate, fetch
const CACHE_NAME = '10023';
let urlsToCache = ['/main.css','/main.js','/bill.js','/bill.html',
  '/ajax/libs/dexie/4.0.8/dexie.min.js',
  '/gh/tha2kyanamtumharaalgorithms-javascript/tha2kyanamtumharaalgorithms-javascript.github.io@main/a12.aac'
];

let urlsToCache1 = ['/main.css','/main.js','/bill.js','/bill.html',
  'https://cdnjs.cloudflare.com/ajax/libs/dexie/4.0.8/dexie.min.js',
  'https://cdn.jsdelivr.net/gh/tha2kyanamtumharaalgorithms-javascript/tha2kyanamtumharaalgorithms-javascript.github.io@main/a12.aac'
];

// let rare=['/favicon.ico','/webw3.css','/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'];
// let more=['/okbw.css','/new.js'];
// let allTocache=[...more,...rare];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.has(CACHE_NAME).then(v => {
        if (!v) {
          return caches.open(CACHE_NAME).then(cache => {
            console.log('New cache install');
            return cache.addAll(urlsToCache1);
          });
        }
      })
    );
    self.skipWaiting();
  });

const cacheWhitelist = [CACHE_NAME];
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  let url = event.request.url;
  const requestUrl = new URL(url);
  console.log(url, requestUrl.pathname, urlsToCache.includes(requestUrl.pathname));

  if (urlsToCache.includes(requestUrl.pathname)) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response; // Cache hit
        }
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200) {
            console.log(`${url} - invalid response status: ${response.status}`);
            return response;
          } // Cache miss

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  }
});

// Initialize IndexedDB
function opendb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('zxc', 1);
  
      req.onupgradeneeded = e => {
        const db = e.target.result;db.createObjectStore('zxc', { keyPath: 'id' });
      };
  
      req.onsuccess = e => {const db = e.target.result;resolve(db);};
      req.onerror = e => {reject(new Error('Error opening IndexedDB: ' + e.target.error));};
    });
  }
  
  // Store an object
  async function setobj(object) {
    const db = await opendb();
    const transaction = db.transaction(['zxc'], 'readwrite');
    const store = transaction.objectStore('zxc');
    store.put(object);
  }
  
  // Get an object by ID
  async function getobj(id) {
    const db = await opendb();
    const transaction = db.transaction(['zxc'], 'readonly');
    const store = transaction.objectStore('zxc');
    const req= store.get(id);
  
    return new Promise((resolve, reject) => {
      req.onsuccess = e => {
        const result = e.target.result;
        resolve(result);
      };
  
      req.onerror = e => {reject(new Error('Error getting object from IndexedDB: ' + e.target.error));};
    });
  }
  
  // Delete an object by ID
  async function delobj(id) {
    const db = await opendb();
    const transaction = db.transaction(['zxc'], 'readwrite');
    const store = transaction.objectStore('zxc');
    store.delete(id);
  }
  let b=0;
  self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};b+=1;
    event.waitUntil(
      self.registration.showNotification(data.title, {...new Pdata(data)}).catch(error => {
        console.error('Failed to show notification:', error);
      })
    );
  });
  
  class Pdata {constructor(d) {this.body=d.body;this.icon=d.icon;if(d.badge){this.badge=d.badge;}if(d.image){this.image=d.image;}this.data=d.data;this.actions=d.actions;this.requireInteraction=d.requireInteraction;this.silent=d.silent;this.vibrate=d.vibrate;}}
  self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event);
    event.notification.close();
    if (event.action === 'close') {return;
    }
  
    // Open or focus the app
    const urlToOpen = event.notification.data?.url || '/';
    
    const promiseChain = clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(windowClients => {
      // Check if there's already a window/tab open with the target URL
      // for (let i = 0; i < windowClients.length; i++) {
      //   const client = windowClients[i];
      //   if (client.url === urlToOpen && 'focus' in client) {
      //     return client.focus();
      //   }
      // }
      
      // If no window/tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    });
  
    event.waitUntil(promiseChain);
  });
  
  
  self.addEventListener('notificationclose', event => {
    console.log('Notification closed:', event);
    
    // Track notification close event
    // You can send analytics here if needed
  });