 // document.getElementById('csvFileInput').addEventListener('change', function (e) {
 //            const file = e.target.files[0];
 //            if (file) {
 //                const reader = new FileReader();

 //                reader.onload = function (e) {
 //                    const contents = e.target.result;
 //                    const jsonData = processCSV(contents);
 //                    displayJSON(jsonData);
 //                };

 //                reader.readAsText(file);
 //            }
 //        });

 //        function processCSV(csv) {
 //            const lines = csv.split('\n');
 //            const jsonData = [];

 //            const headers = lines[0].split(',');
 //            for (let i = 1; i < lines.length; i++) {
 //                const row = lines[i].split(',');
 //                const rowData = {};
 //                for (let j = 0; j < headers.length; j++) {
 //                    rowData[headers[j]] = row[j];
 //                }
 //                jsonData.push(rowData);
 //            }

 //            return JSON.stringify(jsonData, null, 2); // Convert to JSON and format for readability
 //        }

 //        function displayJSON(jsonData) {
 //            const jsonDataDisplay = document.getElementById('jsonDataDisplay');
 //            jsonDataDisplay.textContent = jsonData;
 //            console.log(jsonData);
 //        }












 document.getElementById('csvFileInput').addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const contents = e.target.result;
                    processCSV(contents);
                };

                reader.readAsText(file);
            }
        });

        function processCSV(csv) {
            const lines = csv.split('\n');
            const jsonData = [];

            const headers = lines[0].split(',');
            for (let i = 1; i < lines.length; i++) {
                const row = lines[i].split(',');
                const rowData = {};
                for (let j = 0; j < headers.length; j++) {
                    rowData[headers[j]] = row[j];
                }
                jsonData.push(rowData);
            }

            displayData(jsonData);
        }

        function displayData(data) {
            const jsonDataDisplay = document.getElementById('jsonDataDisplay');
            jsonDataDisplay.textContent = JSON.stringify(data, null, 2);

            // Create a table and populate it with JSON data
            const jsonTable = document.getElementById('jsonTable');
            jsonTable.innerHTML = '';
            const headers = Object.keys(data[0]);
            const headerRow = jsonTable.insertRow(0);
            headers.forEach(header => {
                const cell = headerRow.insertCell(-1);
                cell.innerHTML = header;
            });

            data.forEach((rowData, index) => {
                const row = jsonTable.insertRow(index + 1);
                headers.forEach(header => {
                    const cell = row.insertCell(-1);
                    cell.innerHTML = rowData[header];
                });
            });

            // Show the popup
            const popup = document.getElementById('popup');
            popup.style.display = 'block';
        }

        // Function to close the popup
        function closePopup() {
            const popup = document.getElementById('popup');
            popup.style.display = 'none';
        }


// export dbs data from indexed db
function getDataFromIndexedDB(dldb, dl) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(dl, 'readonly');
      const objectStore = transaction.objectStore(dl);
      const data = [];

      objectStore.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        } else {
          resolve(data);
        }
      };

      transaction.onerror = (e) => {
        reject(e.target.error);
      };
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}
function convertToCSV(data) {
  const csv = [];
  const header = Object.keys(data[0]);
  csv.push(header.join(','));

  for (const item of data) {
    const row = header.map((key) => item[key]);
    csv.push(row.join(','));
  }

  return csv.join('\n');
}
function exportCSV(csvData, fileName) {
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
const dbName = 'dldb';
const storeName = 'dl';
const fileName = 'exported_data.csv';

getDataFromIndexedDB(dbName, storeName)
  .then((data) => {
    const csvData = convertToCSV(data);
    exportCSV(csvData, fileName);
  })
  .catch((error) => {
    console.error('Error exporting data:', error);
  });


// restore data in indexed db
function insertDataIntoIndexedDB(dbName, storeName, csvData) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      csvData.forEach((row) => {
        objectStore.add(row); // Assuming row is an object matching your object store structure
      });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = (e) => {
        reject(e.target.error);
      };
    });

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const data = [];

  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};

    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j];
    }

    data.push(row);
  }

  return data;
}
// Replace 'csvText' with your CSV data as a string
const csvText = '[
  {
    "id": "3081",
    "cn": "sfgdsfgdfg",
    "tot": "33",
    "bulk": "1",
    "dt": "02/Aug/2023",
    "it": "[object Object]",
    "inv": "4950",
    "tch": "5649",
    "och": "451",
    "dis": "0",
    "pt": "0"
  }
]'; // Your CSV data as a string

const dbName = 'bulk';
const storeName = 'bk';

const csvData = parseCSV(csvText);

insertDataIntoIndexedDB(dbName, storeName, csvData)
  .then(() => {
    console.log('Data inserted into IndexedDB successfully');
  })
  .catch((error) => {
    console.error('Error inserting data into IndexedDB:', error);
  });

