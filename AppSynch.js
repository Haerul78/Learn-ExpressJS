const fs = require('fs');

console.log('1');
const data = fs.readFileSync('Halo.txt', 'utf-8');
console.log('2' + data);
console.log('3');