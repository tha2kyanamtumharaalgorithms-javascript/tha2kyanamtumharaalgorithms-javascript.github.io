// Firebase Cross-Device Sync
// Bridges Dexie.js local storage with Firebase Realtime Database

const FB_DEVICE_ID = localStorage.getItem('_fbDeviceId') || (() => {
  const id = Math.random().toString(36).slice(2, 10);
  localStorage.setItem('_fbDeviceId', id);
  return id;
})();

const fbRef = fbDb.ref('data');

// localStorage keys to sync across devices
const FB_SYNC_LS_KEYS = ['pin', 'pint', 'pink', 'pinpd', 'trp', 'imglastod', 'liveSheetStartOd', 'lastExportedOdNum', 'liveSheetLocked', 'liveWebSheetStartOd', 'liveWebSheetLocked', 'fromod', 'gr5', 'gre', 'clickcount', 'm', 'liveSheetScriptUrl', 'liveWebSheetScriptUrl', 'shipr1', 'shpdt', 'shpSelectedCouriers', 'rkbSelectedCouriers', 'shpAllCouriers', 'rkbAllCouriers'];

// ===== Pending Sync Queue (IndexedDB via Dexie) =====

const _fbPendingSyncDb = new Dexie('_fbPendingSync');
_fbPendingSyncDb.version(1).stores({ queue: 'key, ts' });

let _fbPendingCount = 0;

function _fbUpdatePendingBadge() {
  const el = document.getElementById('fbPendingBadge');
  if (el) {
    if (_fbPendingCount > 0) {
      el.textContent = _fbPendingCount + ' order' + (_fbPendingCount > 1 ? 's' : '') + ' not synced';
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  }
}

async function _fbAddToPendingQueue(monthKey, orderData) {
  const key = monthKey + '/' + orderData.id;
  await _fbPendingSyncDb.queue.put({ key, monthKey, orderData, ts: Date.now() });
  _fbPendingCount = await _fbPendingSyncDb.queue.count();
  _fbUpdatePendingBadge();
}

async function _fbRemoveFromPendingQueue(monthKey, orderId) {
  const key = monthKey + '/' + orderId;
  await _fbPendingSyncDb.queue.delete(key);
  _fbPendingCount = await _fbPendingSyncDb.queue.count();
  _fbUpdatePendingBadge();
}

// Retry all pending orders in the queue
async function fbRetryPendingSync() {
  const pending = await _fbPendingSyncDb.queue.toArray();
  if (!pending.length) { snackbar('All orders synced', 1500); return; }
  snackbar('Retrying ' + pending.length + ' pending order(s)...', 2000);
  let success = 0, fail = 0;
  for (const item of pending) {
    const ok = await fbPutOrder(item.monthKey, item.orderData);
    if (ok) success++; else fail++;
  }
  if (fail === 0) {
    snackbar('All ' + success + ' order(s) synced!', 2000);
  } else {
    snackbar(success + ' synced, ' + fail + ' still pending', 3000);
  }
}

// Auto-retry when connection comes back
let _fbWasOffline = false;

// ===== Core Write Functions =====

async function fbPutOrder(monthKey, orderData) {
  const path = 'orders/' + monthKey + '/' + orderData.id;
  const d = { ...orderData, _ts: firebase.database.ServerValue.TIMESTAMP, _dev: FB_DEVICE_ID };
  try {
    // Attempt Firebase write with a 10-second timeout
    await Promise.race([
      fbRef.child(path).set(d),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase write timeout')), 10000))
    ]);
    // Verify the write by reading back
    const snap = await Promise.race([
      fbRef.child(path + '/id').once('value'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase verify timeout')), 5000))
    ]);
    if (snap.val() == orderData.id) {
      // Successfully saved and verified — remove from pending queue if it was there
      await _fbRemoveFromPendingQueue(monthKey, orderData.id);
      console.log('fb order saved & verified:', path);
      return true;
    } else {
      throw new Error('Verify mismatch: expected ' + orderData.id + ' got ' + snap.val());
    }
  } catch (e) {
    console.log('fb order sync err:', e.message, path);
    // Save to pending queue for retry
    await _fbAddToPendingQueue(monthKey, orderData);
    snackbar('Order save to cloud failed - will retry', 3000);
    return false;
  }
}

function fbPutParty(partyData) {
  try {
    const d = { ...partyData, _ts: firebase.database.ServerValue.TIMESTAMP, _dev: FB_DEVICE_ID };
    fbRef.child('parties/' + partyData.id).set(d);
  } catch (e) { console.log('fb party sync err:', e); }
}

function fbDeleteParty(partyId) {
  try {
    fbRef.child('parties/' + partyId).remove();
  } catch (e) { console.log('fb party del err:', e); }
}

function fbPutInst(instData) {
  try {
    const d = { ...instData, _ts: firebase.database.ServerValue.TIMESTAMP, _dev: FB_DEVICE_ID };
    fbRef.child('inventory/' + instData.id).set(d);
  } catch (e) { console.log('fb inst sync err:', e); }
}

function fbPutDelivery(dlData) {
  try {
    const d = { ...dlData, _ts: firebase.database.ServerValue.TIMESTAMP, _dev: FB_DEVICE_ID };
    fbRef.child('delivery/' + dlData.id).set(d);
  } catch (e) { console.log('fb dl sync err:', e); }
}

function fbSyncLS(key, value) {
  try {
    fbRef.child('localStorage/' + key).set({
      v: value,
      _ts: firebase.database.ServerValue.TIMESTAMP,
      _dev: FB_DEVICE_ID
    });
  } catch (e) { console.log('fb ls sync err:', e); }
}

// ===== Full Sync: Upload all local data to Firebase =====

async function fbFullUpload() {
  try {
    snackbar('Uploading to cloud...', 3000);

    // Upload parties
    const parties = await db.pt.toArray();
    for (const p of parties) {
      fbPutParty(p);
    }

    // Upload orders - need to find all month DBs
    // Scan localStorage pin keys to find order IDs and their month codes
    const monthCodes = new Set();
    for (const key of ['pin', 'pint', 'pink', 'pinpd']) {
      const val = localStorage.getItem(key);
      if (val) {
        const obj = JSON.parse(val);
        Object.keys(obj).forEach(k => {
          const id = k.slice(3); // remove 'ods' prefix
          if (id.length >= 6) monthCodes.add('s' + id.slice(0, 6));
        });
      }
    }

    for (const mc of monthCodes) {
      const tmpDb = new Dexie(mc);
      tmpDb.version(1).stores({ od: "id,dt,bulk" });
      const orders = await tmpDb.od.toArray();
      for (const o of orders) {
        fbPutOrder(mc, o);
      }
    }

    // Upload inventory
    const insts = await instdb.inst.toArray();
    for (const i of insts) {
      fbPutInst(i);
    }

    // Upload delivery
    const dls = await dldb.dl.toArray();
    for (const d of dls) {
      fbPutDelivery(d);
    }

    // Upload localStorage
    FB_SYNC_LS_KEYS.forEach(key => {
      const val = localStorage.getItem(key);
      if (val) fbSyncLS(key, val);
    });

    snackbar('Upload complete', 1500);
  } catch (e) {
    console.log('fb full upload err:', e);
    snackbar('Upload failed', 1500);
  }
}

// ===== Full Sync: Download all data from Firebase =====

async function fbFullDownload() {
  try {
    snackbar('Downloading from cloud...', 3000);
    const snap = await fbRef.once('value');
    const data = snap.val();
    if (!data) { snackbar('No cloud data found', 1500); return; }

    // Download parties
    if (data.parties) {
      for (const id in data.parties) {
        const p = { ...data.parties[id] };
        delete p._ts; delete p._dev;
        await db.pt.put(p, p.id);
      }
    }

    // Download orders
    if (data.orders) {
      for (const mc in data.orders) {
        const tmpDb = new Dexie(mc);
        tmpDb.version(1).stores({ od: "id,dt,bulk" });
        for (const id in data.orders[mc]) {
          const o = { ...data.orders[mc][id] };
          delete o._ts; delete o._dev;
          await tmpDb.od.put(o, o.id);
        }
      }
    }

    // Download inventory
    if (data.inventory) {
      for (const id in data.inventory) {
        const i = { ...data.inventory[id] };
        delete i._ts; delete i._dev;
        await instdb.inst.put(i);
      }
    }

    // Download delivery
    if (data.delivery) {
      for (const id in data.delivery) {
        const d = { ...data.delivery[id] };
        delete d._ts; delete d._dev;
        await dldb.dl.put(d, d.id);
      }
    }

    // Download localStorage
    if (data.localStorage) {
      for (const key in data.localStorage) {
        const entry = data.localStorage[key];
        if (entry && entry.v !== undefined) {
          localStorage.setItem(key, entry.v);
        }
      }
    }

    snackbar('Download complete! Reloading...', 1500);
    setTimeout(() => location.reload(), 1600);
  } catch (e) {
    console.log('fb full download err:', e);
    snackbar('Download failed', 1500);
  }
}

// ===== Real-Time Listeners =====

let _fbListenersActive = false;

function fbSetupListeners() {
  if (_fbListenersActive) return;
  _fbListenersActive = true;

  // Listen for party changes
  fbRef.child('parties').on('child_changed', async (snap) => {
    const d = snap.val();
    if (d._dev === FB_DEVICE_ID) return; // skip own writes
    const p = { ...d }; delete p._ts; delete p._dev;
    await db.pt.put(p, p.id);
    console.log('fb: party updated from other device', p.id);
  });

  fbRef.child('parties').on('child_added', async (snap) => {
    const d = snap.val();
    if (d._dev === FB_DEVICE_ID) return;
    const p = { ...d }; delete p._ts; delete p._dev;
    const existing = await db.pt.get(p.id);
    if (!existing) {
      await db.pt.put(p, p.id);
      console.log('fb: new party from other device', p.id);
    }
  });

  fbRef.child('parties').on('child_removed', async (snap) => {
    const d = snap.val();
    if (d._dev === FB_DEVICE_ID) return;
    await db.pt.delete(Number(snap.key) || snap.key);
    console.log('fb: party deleted from other device', snap.key);
  });

  // Listen for order changes (all months)
  fbRef.child('orders').on('child_added', (monthSnap) => {
    const mc = monthSnap.key;
    _listenMonth(mc);
  });

  // Listen for localStorage changes
  FB_SYNC_LS_KEYS.forEach(key => {
    fbRef.child('localStorage/' + key).on('value', (snap) => {
      const d = snap.val();
      if (!d || d._dev === FB_DEVICE_ID) return;
      if (d.v !== undefined) {
        localStorage.setItem(key, d.v);
        if (key === 'gr5' && typeof urli !== 'undefined') { urli = d.v; }
        if (key === 'shipr1') { try { shipr1 = JSON.parse(d.v).a; } catch(e) {} }
        console.log('fb: localStorage updated from other device:', key);
      }
    });
  });

  // Listen for inventory changes
  fbRef.child('inventory').on('child_changed', async (snap) => {
    const d = snap.val();
    if (d._dev === FB_DEVICE_ID) return;
    const i = { ...d }; delete i._ts; delete i._dev;
    await instdb.inst.put(i);
    console.log('fb: inventory updated from other device', i.id);
  });

  // Listen for delivery changes
  fbRef.child('delivery').on('child_changed', async (snap) => {
    const d = snap.val();
    if (d._dev === FB_DEVICE_ID) return;
    const dl = { ...d }; delete dl._ts; delete dl._dev;
    await dldb.dl.put(dl, dl.id);
    console.log('fb: delivery updated from other device', dl.id);
  });

  console.log('fb: real-time listeners active');
}

const _listenedMonths = new Set();
function _listenMonth(mc) {
  if (_listenedMonths.has(mc)) return;
  _listenedMonths.add(mc);

  fbRef.child('orders/' + mc).on('child_changed', async (snap) => {
    const d = snap.val();
    if (d._dev === FB_DEVICE_ID) return;
    const o = { ...d }; delete o._ts; delete o._dev;
    const tmpDb = new Dexie(mc);
    tmpDb.version(1).stores({ od: "id,dt,bulk" });
    await tmpDb.od.put(o, o.id);
    console.log('fb: order updated from other device', mc, o.id);
  });

  fbRef.child('orders/' + mc).on('child_added', async (snap) => {
    const d = snap.val();
    if (d._dev === FB_DEVICE_ID) return;
    const o = { ...d }; const fbTs = d._ts || 0; delete o._ts; delete o._dev;
    const tmpDb = new Dexie(mc);
    tmpDb.version(1).stores({ od: "id,dt,bulk" });
    const existing = await tmpDb.od.get(o.id);
    if (!existing) {
      await tmpDb.od.put(o, o.id);
      console.log('fb: new order from other device', mc, o.id);
    } else if (existing.tot !== o.tot || JSON.stringify(existing.od) !== JSON.stringify(o.od)) {
      // Update stale local data — Firebase has newer version
      await tmpDb.od.put(o, o.id);
      console.log('fb: stale order updated from cloud', mc, o.id);
    }
  });
}

// ===== Connection Status =====

function fbSetupConnectionStatus() {
  const connRef = firebase.database().ref('.info/connected');
  connRef.on('value', async (snap) => {
    const el = document.getElementById('fbSyncStatus');
    if (el) {
      if (snap.val() === true) {
        el.textContent = 'Cloud: Connected';
        el.style.color = '#2ecc71';
        // Auto-retry pending syncs when reconnecting
        if (_fbWasOffline) {
          _fbWasOffline = false;
          const count = await _fbPendingSyncDb.queue.count();
          if (count > 0) {
            snackbar('Back online - retrying ' + count + ' pending order(s)...', 2000);
            setTimeout(() => fbRetryPendingSync(), 1500);
          }
        }
      } else {
        el.textContent = 'Cloud: Offline';
        el.style.color = '#e74c3c';
        _fbWasOffline = true;
      }
    }
  });
}

// ===== App Login =====

function appLogin() {
  let user = document.getElementById('loginUser').value.trim();
  let pass = document.getElementById('loginPass').value;
  if (!user) { document.getElementById('loginUser').focus(); return; }
  if (!pass) { document.getElementById('loginPass').focus(); return; }

  fbRef.child('appConfig/password').once('value').then((snap) => {
    let storedPass = snap.val();
    if (!storedPass) {
      // First time — no password set yet, save this one
      fbRef.child('appConfig/password').set(pass);
      storedPass = pass;
    }
    if (pass === storedPass) {
      let firstLogin = localStorage.getItem('appAuth') !== '1';
      localStorage.setItem('appAuth', '1');
      localStorage.setItem('appUser', user);
      document.getElementById('loginScreen').style.display = 'none';
      console.log('Login success:', user);
      if (firstLogin) {
        fbFullDownload();
      }
    } else {
      document.getElementById('loginError').style.display = 'block';
      document.getElementById('loginPass').value = '';
      document.getElementById('loginPass').focus();
    }
  }).catch(() => {
    // Offline — allow login if previously authenticated
    if (localStorage.getItem('appAuth') === '1') {
      localStorage.setItem('appUser', user);
      document.getElementById('loginScreen').style.display = 'none';
    } else {
      alert('Cannot verify password while offline. Connect to internet first.');
    }
  });
}

// Enter key triggers login
document.getElementById('loginPass').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') appLogin();
});

function appCheckAuth() {
  if (localStorage.getItem('appAuth') !== '1') {
    let ls = document.getElementById('loginScreen');
    ls.style.display = 'flex';
    // Pre-fill username if saved
    let savedUser = localStorage.getItem('appUser');
    if (savedUser) document.getElementById('loginUser').value = savedUser;
  }
}

function appLogout() {
  localStorage.removeItem('appAuth');
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginError').style.display = 'none';
}

function getAppUser() {
  return localStorage.getItem('appUser') || '';
}

// ===== Init =====

(async function fbInit() {
  appCheckAuth();
  fbSetupListeners();
  fbSetupConnectionStatus();
  // Load pending sync count on startup
  _fbPendingCount = await _fbPendingSyncDb.queue.count();
  _fbUpdatePendingBadge();
  if (_fbPendingCount > 0) {
    console.log('fb: ' + _fbPendingCount + ' order(s) pending sync');
    // Auto-retry after 5 seconds if online
    setTimeout(async () => {
      const snap = await firebase.database().ref('.info/connected').once('value');
      if (snap.val() === true) fbRetryPendingSync();
    }, 5000);
  }
  console.log('fb: sync initialized, device:', FB_DEVICE_ID);
})();
