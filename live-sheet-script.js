// ============================================================
// Google Apps Script — Dashboard Order Handlers
// Deploy as Web App (Execute as: Me, Access: Anyone)
// After deploying, save the URL in your browser:
//   localStorage.setItem('liveWebSheetScriptUrl', 'YOUR_DEPLOYED_URL')
//
// This script handles:
// - Sync: writes aggregated order data to Live Website / Live Offline sheet
// - deleteOrder: records deleted orders in DeletedOrders tab
// - doGet: returns starting order number from sheet cell B1
// ============================================================

var SHEET_ID = '1qgd56MEzSTLstp_sOPnKTp0eWA1pIkJHOp3DEPrlsM0';

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);

  if (payload.action === 'deleteOrder') {
    return handleDeleteOrder(payload);
  }

  // ===== Sync handler =====
  return handleSync(payload);
}

// ===== handleSync =====
function handleSync(payload) {
  var data = payload.data;       // [[product, color, size, qty], ...]
  var totalQty = payload.totalQty;
  var orderCount = payload.orderCount;
  var timestamp = payload.timestamp;
  var startOd = payload.startOd;
  var sheetName = payload.sheetName || "Live Offline";

  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // Row 1: NEVER touch B1 — user's starting order number lives there
  // Set label only if A1 is empty (first time)
  if (!sheet.getRange(1, 1).getValue()) {
    sheet.getRange(1, 1).setValue("Start Order:");
  }
  // Update stats in row 1 (columns C, D, E) — but NEVER touch B1
  sheet.getRange(1, 3).setValue("Orders: " + orderCount);
  sheet.getRange(1, 4).setValue("Qty: " + totalQty);
  sheet.getRange(1, 5).setValue("Updated: " + timestamp);

  // Clear from row 2 onward (keep row 1 untouched)
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    sheet.getRange(2, 1, lastRow - 1, 5).clearContent();
  }

  // Row 2: Column headers
  sheet.getRange(2, 1).setValue("Product");
  sheet.getRange(2, 2).setValue("Color");
  sheet.getRange(2, 3).setValue("Size");
  sheet.getRange(2, 4).setValue("Qty");

  // Row 3+: Data rows
  if (data.length > 0) {
    var range = sheet.getRange(3, 1, data.length, 4);
    range.setValues(data);
  }

  // Total row at the end
  var totalRow = data.length + 3;
  sheet.getRange(totalRow, 1).setValue("TOTAL");
  sheet.getRange(totalRow, 4).setValue(totalQty);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", rows: data.length, totalQty: totalQty, sheet: sheetName })
  ).setMimeType(ContentService.MimeType.JSON);
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

// ===== doGet — returns starting order number from cell B1 =====
// Pass ?sheet=Live%20Website to read from Live Website sheet
function doGet(e) {
  var sheetName = (e && e.parameter && e.parameter.sheet) || "Live Offline";
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", startOd: null })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var startOd = sheet.getRange(1, 2).getValue(); // Cell B1
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", startOd: startOd || null })
  ).setMimeType(ContentService.MimeType.JSON);
}
