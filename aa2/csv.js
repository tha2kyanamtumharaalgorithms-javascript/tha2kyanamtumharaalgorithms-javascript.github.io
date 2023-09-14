 document.getElementById('csvFileInput').addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const contents = e.target.result;
                    const jsonData = processCSV(contents);
                    displayJSON(jsonData);
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

            return JSON.stringify(jsonData, null, 2); // Convert to JSON and format for readability
        }

        function displayJSON(jsonData) {
            const jsonDataDisplay = document.getElementById('jsonDataDisplay');
            jsonDataDisplay.textContent = jsonData;
            console.log(jsonData);
        }
