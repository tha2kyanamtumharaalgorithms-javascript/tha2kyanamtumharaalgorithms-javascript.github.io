// ============================================================
// Google Apps Script — paste this into your Apps Script project
// Deploy as Web App (Execute as: Me, Access: Anyone)
// After deploying, copy the URL and save it in your browser:
//   localStorage.setItem('liveSheetScriptUrl', 'YOUR_DEPLOYED_URL')
//
// HOW TO USE:
// 1. On the "Live Offline" sheet, put your starting order number in cell B1
//    (Cell A1 says "Start Order:" as label — don't change it)
// 2. The app will read B1 and auto-sync all orders from that number
// 3. Never touch row 1 again — data fills from row 3 onward
// ============================================================

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);
  var data = payload.data;       // [[product, color, size, qty], ...]
  var totalQty = payload.totalQty;
  var orderCount = payload.orderCount;
  var timestamp = payload.timestamp;
  var startOd = payload.startOd;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Live Offline");
  if (!sheet) {
    sheet = ss.insertSheet("Live Offline");
  }

  // Row 1: NEVER touch — user's starting order number lives here
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
    JSON.stringify({ status: "ok", rows: data.length, totalQty: totalQty })
  ).setMimeType(ContentService.MimeType.JSON);
}

// doGet — returns the starting order number from cell B1
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Live Offline");
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
