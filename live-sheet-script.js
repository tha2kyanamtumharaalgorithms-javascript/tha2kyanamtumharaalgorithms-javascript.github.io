// Google Apps Script — Live Website Sheet Sync
// Deploy: New deployment → Web app → Execute as: Me → Access: Anyone
//
// HOW IT WORKS:
//   All communication uses GET requests (not POST).
//   POST doesn't work because Google uses 302 redirect which drops the body.
//
// ENDPOINTS:
//   ?action=test&msg=hello       → writes "hello" to F1, proves connection works
//   ?action=sync&n=7&q=99&d=... → writes aggregated order data to sheet
//   ?action=ping                 → returns {status:'ok', v:3} for version check
//   (default)                    → returns startOd from cell B1

// IMPORTANT: This must match YOUR spreadsheet URL:
// https://docs.google.com/spreadsheets/d/YOUR_ID/edit
// Copy the ID from your browser URL bar ↑
var SHEET_ID = '1I8ggjHJ_wDIzPz3r0BAZoSbV9oZcJozegApIXcMgOR0';
var VER = 5;

function doGet(e) {
  var p = (e && e.parameter) || {};
  var action = p.action || '';

  try {
    if (action === 'ping') {
      return reply({ v: VER, time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) });
    }

    if (action === 'test') {
      return doTest(p);
    }

    if (action === 'sync') {
      return doSync(p);
    }

    // Default: return startOd from B1
    var sh = openSheet();
    var val = sh ? sh.getRange(1, 2).getValue() : null;
    return reply({ startOd: val || null, v: VER });

  } catch (err) {
    return reply({ error: err.message });
  }
}

// TEST: write a message to F1 to prove the connection works
function doTest(p) {
  var msg = p.msg || 'test-' + Date.now();
  var sh = openSheet();
  if (!sh) {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    sh = ss.insertSheet('Live Website');
  }
  sh.getRange(1, 6).setValue(msg);
  return reply({ test: 'written', cell: 'F1', value: msg });
}

// SYNC: write full aggregated data to the sheet
function doSync(p) {
  var n = Number(p.n) || 0;   // order count
  var q = Number(p.q) || 0;   // total quantity
  var d = p.d || '';           // compact data string
  var ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Parse: product~color~size~qty rows separated by *
  var rows = [];
  if (d.length > 0) {
    var parts = d.split('*');
    for (var i = 0; i < parts.length; i++) {
      var f = parts[i].split('~');
      if (f.length >= 4) {
        rows.push([f[0], f[1], f[2], Number(f[3])]);
      }
    }
  }

  var sh = openSheet();
  if (!sh) {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    sh = ss.insertSheet('Live Website');
  }

  // Row 1: A1=label, B1=startOd (NEVER touch), C1-E1=stats
  if (!sh.getRange(1, 1).getValue()) sh.getRange(1, 1).setValue('Start Order:');
  sh.getRange(1, 3).setValue('Orders: ' + n);
  sh.getRange(1, 4).setValue('Qty: ' + q);
  sh.getRange(1, 5).setValue(ts);

  // Clear old data (row 2 downward)
  var lastRow = sh.getLastRow();
  if (lastRow >= 2) sh.getRange(2, 1, lastRow - 1, 5).clearContent();

  // Row 2: headers
  sh.getRange(2, 1, 1, 4).setValues([['Product', 'Color', 'Size', 'Qty']]);

  // Row 3+: data rows
  if (rows.length > 0) {
    sh.getRange(3, 1, rows.length, 4).setValues(rows);
  }

  // Total row at the end
  var tr = rows.length + 3;
  sh.getRange(tr, 1).setValue('TOTAL');
  sh.getRange(tr, 4).setValue(q);

  // Return startOd from B1 so dashboard always stays in sync
  var startOd = sh.getRange(1, 2).getValue();
  return reply({ synced: rows.length, qty: q, startOd: startOd || null });
}

function openSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  return ss.getSheetByName('Live Website');
}

function reply(obj) {
  obj.status = 'ok';
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
