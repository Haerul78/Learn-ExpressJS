// const http = require('http');
// http.createServer((req, res) => {
//     res.writeHead(200,  {'content-type': 'text/plain'});
//     res.end('Hello World');
// }).listen(8080);

// const express = require("express");
// const app = express();
// app.get('/', (req, res) => res.send('Hello World dunia!'));
// app.listen(8080);

// function ambilDataDenganCallback(callback) {
//   setTimeout(() => { 
//     callback('Data diterima (pakai callback)!');
//   }, 1000);
// }
// ambilDataDenganCallback((pesan) => {
//   console.log(pesan);
// });

// const ambilDataDenganPromise = () => {
//   return new Promise((resolve) => { 
//     setTimeout(() => resolve('Promise sudah terpenuhi!'), 1000);
//   });
// };
// ambilDataDenganPromise().then((pesan) => { 
//   console.log(pesan);
// });

// async function dapatkanData() {
//   const hasil = await ambilDataDenganPromise();
//   console.log(hasil);
// }
// dapatkanData();

// console.log('Semua argumen:', process.argv);
// console.log('Argumen pertama yang kamu berikan:', process.argv[2]);
// console.log('Argumen kedua yang kamu berikan:', process.argv[3]);

console.log('Lingkungan:', process.env.NODE_ENV || 'development');
console.log('Variabel Kustom:', process.env.MY_VARIABLE);
console.log('URL Database:', process.env.DATABASE_URL || 'Belum diatur');
