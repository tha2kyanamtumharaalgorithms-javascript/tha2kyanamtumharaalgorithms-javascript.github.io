// ============================================================
// Google Apps Script — Dashboard Order Handlers
// Deploy as Web App (Execute as: Me, Access: Anyone)
// After deploying, save the URL in your browser:
//   localStorage.setItem('liveWebScriptUrl', 'YOUR_DEPLOYED_URL')
//
// SETUP:
// 1. Deploy this script as a Web App
// 2. In Apps Script editor: Triggers > Add Trigger
//    - Function: snapshotPendingOrders
//    - Event source: Time-driven
//    - Type: Minutes timer > Every 1 minute
//
// This script handles:
// - snapshotPendingOrders(): copies PendingOrder to NotCapturedYet (1-min trigger)
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

// ===== snapshotPendingOrders =====
// Copies all PendingOrder rows to NotCapturedYet tab (rolling snapshot).
// Set up a 1-minute time-driven trigger for this function.
function snapshotPendingOrders() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var src = ss.getSheetByName('PendingOrder');
  if (!src) return;

  var lastRow = src.getLastRow();
  if (lastRow < 1) return;

  var data = src.getRange(1, 1, lastRow, src.getLastColumn()).getValues();

  var dst = ss.getSheetByName('NotCapturedYet');
  if (!dst) {
    dst = ss.insertSheet('NotCapturedYet');
  }

  // Clear old snapshot and write fresh copy
  dst.clearContents();
  if (data.length > 0) {
    dst.getRange(1, 1, data.length, data[0].length).setValues(data);
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
