// ============================================================
// Google Apps Script — Dashboard Order Handlers
// Deploy as Web App (Execute as: Me, Access: Anyone)
// After deploying, save the URL in your browser:
//   localStorage.setItem('liveWebScriptUrl', 'YOUR_DEPLOYED_URL')
//
// This script handles:
// - deleteOrder: records deleted orders in DeletedOrders tab
// ============================================================

var SHEET_ID = '1qgd56MEzSTLstp_sOPnKTp0eWA1pIkJHOp3DEPrlsM0';

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);

  if (payload.action === 'deleteOrder') {
    return handleDeleteOrder(payload);
  }

  // ... your existing doPost logic here ...
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
