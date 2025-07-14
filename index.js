const fs = require('fs');

fs.readFile('Halo.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file: ' + err);
        return;
    }
    console.log('file content: ' + data);
})

console.log("Reading file...");