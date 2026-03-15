// Google Apps Script — Live Website Sheet
// Deploy: Web App → Execute as Me → Access Anyone
// ALL operations use doGet (POST doesn't work due to Google's 302 redirect)
//
// Endpoints:
//   ?action=ping          → { status:'ok', v:2 }
//   ?action=status        → { status:'ok', startOd: <B1 value> }
//   ?action=sync&n=7&q=172&d=Oversize+240gsm~Brown~M~9*T-Shirt~Red~L~3
//     n = order count, q = total qty
//     d = rows of product~color~size~qty separated by *

var SHEET_ID = '1qgd56MEzSTLstp_sOPnKTp0eWA1pIkJHOp3DEPrlsM0';
var VER = 2;

function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.action === 'ping') return j({ v: VER });
    if (p.action === 'sync') return doSync(p);
    // default: status
    var sh = getOrCreateSheet();
    return j({ startOd: sh.getRange(1, 2).getValue() || null, v: VER });
  } catch (err) {
    return j({ error: err.message });
  }
}

function doSync(p) {
  var n = Number(p.n) || 0;
  var q = Number(p.q) || 0;
  var d = p.d || '';
  var ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // parse compact data
  var rows = [];
  if (d) {
    var parts = d.split('*');
    for (var i = 0; i < parts.length; i++) {
      var f = parts[i].split('~');
      if (f.length >= 4) rows.push([f[0], f[1], f[2], Number(f[3])]);
    }
  }

  var sh = getOrCreateSheet();

  // row 1: A1=label, B1=user's startOd (NEVER touch), C1-E1=stats
  if (!sh.getRange(1, 1).getValue()) sh.getRange(1, 1).setValue('Start Order:');
  sh.getRange(1, 3).setValue('Orders: ' + n);
  sh.getRange(1, 4).setValue('Qty: ' + q);
  sh.getRange(1, 5).setValue(ts);

  // clear old data (row 2 onwards)
  var last = sh.getLastRow();
  if (last >= 2) sh.getRange(2, 1, last - 1, 5).clearContent();

  // row 2: headers
  sh.getRange(2, 1, 1, 4).setValues([['Product', 'Color', 'Size', 'Qty']]);

  // row 3+: data
  if (rows.length) sh.getRange(3, 1, rows.length, 4).setValues(rows);

  // total row
  sh.getRange(rows.length + 3, 1).setValue('TOTAL');
  sh.getRange(rows.length + 3, 4).setValue(q);

  return j({ synced: rows.length, q: q });
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName('Live Website');
  if (!sh) sh = ss.insertSheet('Live Website');
  return sh;
}

function j(obj) {
  obj.status = 'ok';
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
