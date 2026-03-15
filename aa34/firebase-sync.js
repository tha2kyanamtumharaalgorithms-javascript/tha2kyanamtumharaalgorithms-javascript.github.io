// Firebase Cross-Device Sync
// Bridges Dexie.js local storage with Firebase Realtime Database

const FB_DEVICE_ID = localStorage.getItem('_fbDeviceId') || (() => {
  const id = Math.random().toString(36).slice(2, 10);
  localStorage.setItem('_fbDeviceId', id);
  return id;
})();

const fbRef = fbDb.ref('data');

// localStorage keys to sync across devices
const FB_SYNC_LS_KEYS = ['pin', 'pint', 'pink', 'pinpd', 'trp', 'imglastod', 'liveSheetStartOd', 'lastExportedOdNum', 'liveSheetLocked', 'liveWebSheetStartOd', 'liveWebSheetLocked', 'fromod', 'gr5', 'gre', 'clickcount', 'm', 'liveSheetScriptUrl', 'liveWebSheetScriptUrl'];

// ===== Core Write Functions =====

function fbPutOrder(monthKey, orderData) {
  try {
    const d = { ...orderData, _ts: firebase.database.ServerValue.TIMESTAMP, _dev: FB_DEVICE_ID };
    fbRef.child('orders/' + monthKey + '/' + orderData.id).set(d);
  } catch (e) { console.log('fb order sync err:', e); }
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
    const o = { ...d }; delete o._ts; delete o._dev;
    const tmpDb = new Dexie(mc);
    tmpDb.version(1).stores({ od: "id,dt,bulk" });
    const existing = await tmpDb.od.get(o.id);
    if (!existing) {
      await tmpDb.od.put(o, o.id);
      console.log('fb: new order from other device', mc, o.id);
    }
  });
}

// ===== Connection Status =====

function fbSetupConnectionStatus() {
  const connRef = firebase.database().ref('.info/connected');
  connRef.on('value', (snap) => {
    const el = document.getElementById('fbSyncStatus');
    if (el) {
      if (snap.val() === true) {
        el.textContent = 'Cloud: Connected';
        el.style.color = '#2ecc71';
      } else {
        el.textContent = 'Cloud: Offline';
        el.style.color = '#e74c3c';
      }
    }
  });
}

// ===== Init =====

(function fbInit() {
  fbSetupListeners();
  fbSetupConnectionStatus();
  console.log('fb: sync initialized, device:', FB_DEVICE_ID);
})();
