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
