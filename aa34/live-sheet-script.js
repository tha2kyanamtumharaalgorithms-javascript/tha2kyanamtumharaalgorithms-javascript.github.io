// ============================================================
// Google Apps Script — paste this into your Apps Script project
// Deploy as Web App (Execute as: Me, Access: Anyone)
// After deploying, copy the URL and save it in your browser:
//   localStorage.setItem('liveSheetScriptUrl', 'YOUR_DEPLOYED_URL')       — for Live Offline
//   localStorage.setItem('liveWebSheetScriptUrl', 'YOUR_DEPLOYED_URL')    — for Live Website
//
// HOW TO USE:
// 1. On the "Live Offline" or "Live Website" sheet, put your starting order number in cell B1
//    (Cell A1 says "Start Order:" as label — don't change it)
// 2. The app will read B1 and auto-sync all orders from that number
// 3. Never touch row 1 again — data fills from row 3 onward
//
// This script handles BOTH sheets. The payload.sheetName tells which sheet to write to.
// If no sheetName is sent, it defaults to "Live Offline" (backward compatible).
// ============================================================

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);

  // Piggyback: snapshot PendingOrder → NotCapturedYet on every POST
  try { snapshotPendingOrders(); } catch(err) {}

  var data = payload.data;       // [[product, color, size, qty], ...]
  var totalQty = payload.totalQty;
  var orderCount = payload.orderCount;
  var timestamp = payload.timestamp;
  var startOd = payload.startOd;
  var sheetName = payload.sheetName || "Live Offline";

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
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

  // Cleanup NotCapturedYet: remove orders that browser has already captured
  if (payload.capturedIds && payload.capturedIds.length) {
    try {
      var srcSs = SpreadsheetApp.openById('1qgd56MEzSTLstp_sOPnKTp0eWA1pIkJHOp3DEPrlsM0');
      var nctSheet = srcSs.getSheetByName('NotCapturedYet');
      if (nctSheet && nctSheet.getLastRow() > 0) {
        var nctData = nctSheet.getDataRange().getValues();
        var capturedSet = {};
        payload.capturedIds.forEach(function(id) { capturedSet[id] = true; });
        for (var i = nctData.length - 1; i >= 0; i--) {
          var idm = String(nctData[i][0]).match(/^(\d+)\|\|/);
          var isCaptured = idm && capturedSet[Number(idm[1])];
          var isStale = nctData[i][2] && ((new Date() - new Date(nctData[i][2])) > 5 * 60 * 1000);
          if (isCaptured || isStale) {
            nctSheet.deleteRow(i + 1);
          }
        }
      }
    } catch(err) {}
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", rows: data.length, totalQty: totalQty, sheet: sheetName })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// snapshotPendingOrders — copies PendingOrder rows to NotCapturedYet tab
// Set up a 1-minute time-driven trigger for this function:
//   Edit > Triggers > Add Trigger > snapshotPendingOrders > Time-driven > Every minute
// Also called from doPost() as a piggyback (runs every 30s when browser is active)
// ============================================================
function snapshotPendingOrders() {
  var srcSs = SpreadsheetApp.openById('1qgd56MEzSTLstp_sOPnKTp0eWA1pIkJHOp3DEPrlsM0');
  var pendingSheet = srcSs.getSheetByName('PendingOrder');
  if (!pendingSheet || pendingSheet.getLastRow() < 1) return;

  var nctSheet = srcSs.getSheetByName('NotCapturedYet');
  if (!nctSheet) nctSheet = srcSs.insertSheet('NotCapturedYet');

  // Read existing NotCapturedYet order IDs to avoid duplicates
  var existingIds = {};
  if (nctSheet.getLastRow() > 0) {
    var existingData = nctSheet.getDataRange().getValues();
    for (var i = 0; i < existingData.length; i++) {
      var match = String(existingData[i][0]).match(/^(\d+)\|\|/);
      if (match) existingIds[match[1]] = true;
    }
  }

  // Copy new orders from PendingOrder to NotCapturedYet
  var data = pendingSheet.getDataRange().getValues();
  for (var j = 0; j < data.length; j++) {
    var idMatch = String(data[j][0]).match(/^(\d+)\|\|/);
    if (idMatch && !existingIds[idMatch[1]]) {
      nctSheet.appendRow([data[j][0], data[j][1], new Date().toISOString()]);
    }
  }
}

// doGet — returns the starting order number from cell B1
// Pass ?sheet=Live%20Website to read from Live Website sheet
function doGet(e) {
  var sheetName = (e && e.parameter && e.parameter.sheet) || "Live Offline";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
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
