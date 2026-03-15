// ============================================================
// Google Apps Script — Dashboard Order Handlers
// Deploy as Web App (Execute as: Me, Access: Anyone)
// After deploying, save the URL in your browser:
//   localStorage.setItem('liveWebScriptUrl', 'YOUR_DEPLOYED_URL')
//
// SETUP:
// 1. Deploy this script as a Web App
// 2. In Apps Script editor: Triggers > Add Trigger
//    - Function: syncPendingToNotCaptured
//    - Event source: From spreadsheet
//    - Event type: On change
//
// This script handles:
// - syncPendingToNotCaptured(): merges PendingOrder into NotCapturedYet (onChange trigger)
// - deleteOrder: records deleted orders in DeletedOrders tab
// - cleanupCaptured: removes captured orders from NotCapturedYet
// ============================================================

var SHEET_ID = '1qgd56MEzSTLstp_sOPnKTp0eWA1pIkJHOp3DEPrlsM0';

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);

  if (payload.action === 'deleteOrder') {
    return handleDeleteOrder(payload);
  }

  if (payload.action === 'cleanupCaptured') {
    return handleCleanupCaptured(payload);
  }

  // ... your existing doPost logic here ...
}

// ===== syncPendingToNotCaptured =====
// Merges PendingOrder rows into NotCapturedYet tab (upsert, never removes).
// Set up an installable onChange trigger (From spreadsheet > On change).
// - New orders in PendingOrder → ADDED to NotCapturedYet
// - Edited orders in PendingOrder → UPDATED in NotCapturedYet
// - Orders removed from PendingOrder (Done) → KEPT in NotCapturedYet until dashboard syncs
function syncPendingToNotCaptured(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return; // skip if another instance is running

  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var src = ss.getSheetByName('PendingOrder');
    if (!src) return;

    // Read PendingOrder data
    var srcLastRow = src.getLastRow();
    var pendingData = srcLastRow > 0
      ? src.getRange(1, 1, srcLastRow, src.getLastColumn()).getValues()
      : [];

    // Build pending map: orderID → row data
    var pendingMap = {};
    for (var i = 0; i < pendingData.length; i++) {
      var orderId = String(pendingData[i][0]).split('||')[0];
      if (orderId) pendingMap[orderId] = pendingData[i];
    }

    // Read NotCapturedYet data
    var dst = ss.getSheetByName('NotCapturedYet');
    if (!dst) {
      dst = ss.insertSheet('NotCapturedYet');
    }

    var dstLastRow = dst.getLastRow();
    var capturedData = dstLastRow > 0
      ? dst.getRange(1, 1, dstLastRow, dst.getLastColumn()).getValues()
      : [];

    // Build captured map: orderID → row data
    var capturedMap = {};
    for (var j = 0; j < capturedData.length; j++) {
      var capId = String(capturedData[j][0]).split('||')[0];
      if (capId) capturedMap[capId] = capturedData[j];
    }

    // Merge: start with all captured rows (preserves Done'd orders)
    var merged = {};
    var mergedIds = [];

    // Keep all existing NotCapturedYet rows (preserves order)
    for (var k in capturedMap) {
      merged[k] = capturedMap[k];
      mergedIds.push(k);
    }

    // Upsert from PendingOrder: update existing, add new
    for (var p in pendingMap) {
      if (merged[p]) {
        // UPDATE: overwrite with latest from PendingOrder
        merged[p] = pendingMap[p];
      } else {
        // ADD: new order
        merged[p] = pendingMap[p];
        mergedIds.push(p);
      }
    }

    // Build final rows array and normalize column count
    var rows = [];
    var maxCols = 1;
    for (var m = 0; m < mergedIds.length; m++) {
      var row = merged[mergedIds[m]];
      if (row.length > maxCols) maxCols = row.length;
      rows.push(row);
    }

    // Pad shorter rows to match max column count
    for (var r = 0; r < rows.length; r++) {
      while (rows[r].length < maxCols) {
        rows[r].push('');
      }
    }

    // Write merged result
    dst.clearContents();
    if (rows.length > 0) {
      dst.getRange(1, 1, rows.length, maxCols).setValues(rows);
    }
  } finally {
    lock.releaseLock();
  }
}

// ===== handleDeleteOrder =====
function handleDeleteOrder(payload) {
  var orderIds = payload.orderIds;
  if (!orderIds || !orderIds.length) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: "No orderIds provided" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName("DeletedOrders");
  if (!sheet) {
    sheet = ss.insertSheet("DeletedOrders");
    sheet.getRange(1, 1).setValue("OrderID");
    sheet.getRange(1, 2).setValue("DeletedAt");
  }

  var timestamp = new Date().toISOString();
  var rows = orderIds.map(function(id) {
    return [id, timestamp];
  });

  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, rows.length, 2).setValues(rows);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", deleted: orderIds.length })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ===== handleCleanupCaptured =====
// Removes captured order IDs from NotCapturedYet tab.
// Called by syncLiveWebSheet after successful sync.
function handleCleanupCaptured(payload) {
  var capturedIds = payload.capturedIds;
  if (!capturedIds || !capturedIds.length) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", cleaned: 0 })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName('NotCapturedYet');
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", cleaned: 0 })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 1) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", cleaned: 0 })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // Build set of captured IDs for fast lookup
  var capturedSet = {};
  capturedIds.forEach(function(id) { capturedSet[id] = true; });

  // Read all rows, keep only uncaptured ones
  var data = sheet.getRange(1, 1, lastRow, sheet.getLastColumn()).getValues();
  var kept = [];
  var cleaned = 0;

  for (var i = 0; i < data.length; i++) {
    // First column contains "orderID||Pending" format
    var cell = String(data[i][0]);
    var orderId = cell.split('||')[0];
    if (capturedSet[orderId]) {
      cleaned++;
    } else {
      kept.push(data[i]);
    }
  }

  // Rewrite sheet with only uncaptured rows
  sheet.clearContents();
  if (kept.length > 0) {
    sheet.getRange(1, 1, kept.length, kept[0].length).setValues(kept);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", cleaned: cleaned })
  ).setMimeType(ContentService.MimeType.JSON);
}
