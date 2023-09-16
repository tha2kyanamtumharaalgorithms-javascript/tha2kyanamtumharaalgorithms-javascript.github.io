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












//  document.getElementById('csvFileInput').addEventListener('change', function (e) {
//             const file = e.target.files[0];
//             if (file) {
//                 const reader = new FileReader();

//                 reader.onload = function (e) {
//                     const contents = e.target.result;
//                     processCSV(contents);
//                 };

//                 reader.readAsText(file);
//             }
//         });

//         function processCSV(csv) {
//             const lines = csv.split('\n');
//             const jsonData = [];

//             const headers = lines[0].split(',');
//             for (let i = 1; i < lines.length; i++) {
//                 const row = lines[i].split(',');
//                 const rowData = {};
//                 for (let j = 0; j < headers.length; j++) {
//                     rowData[headers[j]] = row[j];
//                 }
//                 jsonData.push(rowData);
//             }

//             displayData(jsonData);
//         }

//         function displayData(data) {
//             const jsonDataDisplay = document.getElementById('jsonDataDisplay');
//             jsonDataDisplay.textContent = JSON.stringify(data, null, 2);

//             // Create a table and populate it with JSON data
//             const jsonTable = document.getElementById('jsonTable');
//             jsonTable.innerHTML = '';
//             const headers = Object.keys(data[0]);
//             const headerRow = jsonTable.insertRow(0);
//             headers.forEach(header => {
//                 const cell = headerRow.insertCell(-1);
//                 cell.innerHTML = header;
//             });

//             data.forEach((rowData, index) => {
//                 const row = jsonTable.insertRow(index + 1);
//                 headers.forEach(header => {
//                     const cell = row.insertCell(-1);
//                     cell.innerHTML = rowData[header];
//                 });
//             });

//             // Show the popup
//             const popup = document.getElementById('popup');
//             popup.style.display = 'block';
//         }

//         // Function to close the popup
//         function closePopup() {
//             const popup = document.getElementById('popup');
//             popup.style.display = 'none';
//         }


// // export dbs data from indexed db
// function getDataFromIndexedDB(dldb, dl) {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open(dbName);

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const transaction = db.transaction(dl, 'readonly');
//       const objectStore = transaction.objectStore(dl);
//       const data = [];

//       objectStore.openCursor().onsuccess = (e) => {
//         const cursor = e.target.result;
//         if (cursor) {
//           data.push(cursor.value);
//           cursor.continue();
//         } else {
//           resolve(data);
//         }
//       };

//       transaction.onerror = (e) => {
//         reject(e.target.error);
//       };
//     };

//     request.onerror = (e) => {
//       reject(e.target.error);
//     };
//   });
// }
// function convertToCSV(data) {
//   const csv = [];
//   const header = Object.keys(data[0]);
//   csv.push(header.join(','));

//   for (const item of data) {
//     const row = header.map((key) => item[key]);
//     csv.push(row.join(','));
//   }

//   return csv.join('\n');
// }
// function exportCSV(csvData, fileName) {
//   const blob = new Blob([csvData], { type: 'text/csv' });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement('a');
//   a.href = url;
//   a.download = fileName;
//   a.style.display = 'none';
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);

//   URL.revokeObjectURL(url);
// }
// const dbName = 'dldb';
// const storeName = 'dl';
// const fileName = 'exported_data.csv';

// getDataFromIndexedDB(dbName, storeName)
//   .then((data) => {
//     const csvData = convertToCSV(data);
//     exportCSV(csvData, fileName);
//   })
//   .catch((error) => {
//     console.error('Error exporting data:', error);
//   });


const sourceDBName = 'party';
const sourceObjectStoreName = 'pt';
const data = [];
const req = indexedDB.open(sourceDBName);

req.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction([sourceObjectStoreName], 'readonly');
  const objectStore = transaction.objectStore(sourceObjectStoreName);
console.log('this is first step for json update');
  objectStore.openCursor().onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
      data.push(cursor.value);
      cursor.continue();
     console.log('this is secound step for json update');
    } else {
      console.log(data);
      const jsonData = JSON.stringify(data);
      
      // Create a Blob containing the JSON data
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // Create a FileWriter to save the Blob to a file
      window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024, function(fs) {
       console.log('this is last step for json update');
        fs.root.getFile('data.json', { create: true }, function(fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
            fileWriter.write(blob);
            console.log('JSON data saved as data.json in the current directory.');
          });
        });
      });
    }
  };
};
