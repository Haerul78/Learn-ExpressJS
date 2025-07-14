# NodeJS
NodeJS adalah adalah sebuah runtime yang bisa berjalan di Window, Mac, Linux, dan lain-lain. Ia memungkinkan dapat menjalankan kode JavaScript di luar web browser, juga bisa melakukan pengembangan dari sisi server dengan JavaScript. NodeJS dirancang untuk membangung aplikasi network yang skalalabel secara efisien. \n
NodeJS itu menggunakana asynchronous (non-blocking) programming, yang artinya itu tetap bisa berjalan meskipun sedang mengerjakan tugas lain seperti reading file atau berkomunikasi ke database. dengan asynchronous code, NodeJS memungkinkan untuk melakukan banyak dalam satu waktu yang membuat jadi cepat dan efisiensi
```
const fs = require('fs');

fs.readFile('Halo.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file: ' + err);
        return;
    }
    console.log('file content: ' + data);
})

console.log("Reading file...");
```
__Alur Kerja (Bagaimana Kode Bekerja):__
1. Mulai: Program dimulai.
2. Cetak "Reading file..." duluan: Karena operasi membaca file (fs.readFile) adalah asinkron, artinya ia tidak langsung selesai dan menunggu, pesan "Reading file..." akan langsung ditampilkan ke konsol terlebih dahulu. Program tidak menunggu proses pembacaan file selesai.
3. Mulai Membaca File: Komputer mulai proses membaca file Halo.txt di latar belakang.
4. Selesai Membaca (Nanti):
    - Jika file berhasil dibaca, isi file akan ditampilkan setelah pesan "Reading file...".
    - Jika ada masalah (misalnya file tidak ada), pesan kesalahan akan ditampilkan setelah pesan "Reading file...".
