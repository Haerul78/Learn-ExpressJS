const fs = require('fs');

fs.readFile('Halo.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file: ' + err);
        return;
    }
    console.log('File content: ' + data);
});

console.log('Reading file... (this runs first!)');