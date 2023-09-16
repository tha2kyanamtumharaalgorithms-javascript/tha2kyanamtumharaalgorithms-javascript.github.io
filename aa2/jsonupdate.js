const sourceDBName = 'party';
const sourceObjectStoreName = 'pt';
const data = [];
const req = indexedDB.open(sourceDBName);

req.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction([sourceObjectStoreName], 'readonly');
  const objectStore = transaction.objectStore(sourceObjectStoreName);

  objectStore.openCursor().onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
      data.push(cursor.value);
      cursor.continue();
    } else {
      console.log(data);
      const jsonData = JSON.stringify(data);
      
      // Create a Blob containing the JSON data
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // Create a FileWriter to save the Blob to a file
      window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024, function(fs) {
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
