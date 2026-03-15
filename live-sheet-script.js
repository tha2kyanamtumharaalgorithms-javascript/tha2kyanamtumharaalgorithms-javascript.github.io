// ============================================================
// Google Apps Script — Dashboard → Live Website Sheet (GET-only)
// Deploy as Web App (Execute as: Me, Access: Anyone)
//
// WHY GET instead of POST:
//   Google Apps Script uses 302 redirects which change POST→GET,
//   losing the POST body. GET requests work reliably.
//
// Data format (compact, URL-safe):
//   product~color~size~qty  joined by  *  for rows
//   Example: Oversize 240gsm~Brown~M~9*Oversize 240gsm~Off-white~S~3
//
// Endpoints (all via doGet):
//   ?action=sync&s=START_OD&n=ORDER_COUNT&q=TOTAL_QTY&d=DATA
//   ?action=status&sheet=Live+Website  (returns startOd from B1)
//   (no action) → same as status with default sheet
// ============================================================

var SHEET_ID = '1qgd56MEzSTLstp_sOPnKTp0eWA1pIkJHOp3DEPrlsM0';

function doGet(e) {
  var p = (e && e.parameter) || {};
  var action = p.action || 'status';

  try {
    if (action === 'sync') return handleSync(p);
    return handleStatus(p);
  } catch (err) {
    return json({ status: 'error', message: err.message });
  }
}

// ===== Sync: write aggregated data to sheet =====
function handleSync(p) {
  var dataStr    = p.d || '';
  var orderCount = Number(p.n) || 0;
  var totalQty   = Number(p.q) || 0;
  var startOd    = p.s || '';
  var sheetName  = 'Live Website';
  var timestamp  = new Date().toISOString();

  // Parse compact data: product~color~size~qty separated by *
  var data = [];
  if (dataStr) {
    var rows = dataStr.split('*');
    for (var i = 0; i < rows.length; i++) {
      var f = rows[i].split('~');
      if (f.length >= 4) {
        data.push([f[0], f[1], f[2], Number(f[3])]);
      }
    }
  }

  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);

  // Row 1: label + stats (NEVER touch B1 — user's starting order number)
  if (!sheet.getRange(1, 1).getValue()) {
    sheet.getRange(1, 1).setValue('Start Order:');
  }
  sheet.getRange(1, 3).setValue('Orders: ' + orderCount);
  sheet.getRange(1, 4).setValue('Qty: ' + totalQty);
  sheet.getRange(1, 5).setValue('Updated: ' + timestamp);

  // Clear rows 2+ (keep row 1)
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    sheet.getRange(2, 1, lastRow - 1, 5).clearContent();
  }

  // Row 2: headers
  sheet.getRange(2, 1, 1, 4).setValues([['Product', 'Color', 'Size', 'Qty']]);

  // Row 3+: data
  if (data.length > 0) {
    sheet.getRange(3, 1, data.length, 4).setValues(data);
  }

  // Total row
  var totalRow = data.length + 3;
  sheet.getRange(totalRow, 1).setValue('TOTAL');
  sheet.getRange(totalRow, 4).setValue(totalQty);

  return json({ status: 'ok', rows: data.length, totalQty: totalQty });
}

// ===== Status: return startOd from B1 =====
function handleStatus(p) {
  var sheetName = p.sheet || 'Live Website';
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return json({ status: 'ok', startOd: null });

  var startOd = sheet.getRange(1, 2).getValue();
  return json({ status: 'ok', startOd: startOd || null });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
