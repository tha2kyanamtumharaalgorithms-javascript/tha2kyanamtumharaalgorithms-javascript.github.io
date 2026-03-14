// ============================================================
// Google Apps Script — paste this into your Apps Script project
// Deploy as Web App (Execute as: Me, Access: Anyone)
// After deploying, copy the URL and save it in your browser:
//   localStorage.setItem('liveSheetScriptUrl', 'YOUR_DEPLOYED_URL')
// ============================================================

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);
  var startOd = payload.startOd;
  var data = payload.data;       // [[product, color, size, qty], ...]
  var totalQty = payload.totalQty;
  var orderCount = payload.orderCount;
  var timestamp = payload.timestamp;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Live Offline");
  if (!sheet) {
    sheet = ss.insertSheet("Live Offline");
  }

  // Clear everything from row 1 onward
  sheet.clearContents();

  // Row 1: Header with starting order number
  sheet.getRange(1, 1).setValue("From Order: " + startOd);
  sheet.getRange(1, 2).setValue("Orders: " + orderCount);
  sheet.getRange(1, 3).setValue("Total Qty: " + totalQty);
  sheet.getRange(1, 4).setValue("Updated: " + timestamp);

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

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Live Sheet Script is running" })
  ).setMimeType(ContentService.MimeType.JSON);
}
