// ============================================================
// Google Apps Script — Delete Order Handler
// Deploy as Web App (Execute as: Me, Access: Anyone)
// After deploying, save the URL in your dashboard browser:
//   localStorage.setItem('liveWebScriptUrl', 'YOUR_DEPLOYED_URL')
//
// This script handles the deleteOrder action from the dashboard's
// Delete button. It writes deleted order IDs to a "DeletedOrders"
// tab in the Google Sheet so they can be excluded from the
// Live Website total.
//
// IMPORTANT: If you already have a doPost() in this Apps Script
// project, merge the deleteOrder handling into your existing doPost().
// ============================================================

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);

  // Handle deleteOrder action
  if (payload.action === 'deleteOrder') {
    return handleDeleteOrder(payload);
  }

  // ... your existing doPost logic here ...
}

function handleDeleteOrder(payload) {
  var orderIds = payload.orderIds; // array of order ID strings
  if (!orderIds || !orderIds.length) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: "No orderIds provided" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
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
