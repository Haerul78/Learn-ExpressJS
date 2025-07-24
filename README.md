# NodeJS
NodeJS adalah adalah sebuah runtime yang bisa berjalan di Window, Mac, Linux, dan lain-lain. Ia memungkinkan dapat menjalankan kode JavaScript di luar web browser, juga bisa melakukan pengembangan dari sisi server dengan JavaScript. NodeJS dirancang untuk membangung aplikasi network yang skalalabel secara efisien.<br>

### Asynchronous
NodeJS itu menggunakana asynchronous (non-blocking) programming, yang artinya itu tetap bisa berjalan meskipun sedang mengerjakan tugas lain seperti reading file atau berkomunikasi ke database. dengan asynchronous code, NodeJS memungkinkan untuk melakukan banyak dalam satu waktu yang membuat jadi cepat dan efisiensi

#### Asynchronous Code
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

#### Synchornus Code
```
const fs = require('fs');

console.log('1');
const data = fs.readFileSync('Halo.txt', 'utf-8');
console.log('2' + data);
console.log('3');
```
__Alur Kerja (Bagaimana Kode Bekerja)__
1. Mulai Program dimulai.
2. Cetak "1"
3. Cetak "2" dan datanya. Karena operasi membaca file (fs.readFileSync) adalah sinkron, yang artinya ia harus selesai dan menunggu. Program harus menunggu proses membaca Halo.txt selesai.
    - jika (fs.readFileSync) error, maka ```Console.log('3')``` tidak akan pernah di eksekusi.
4. Cetak "3"

### Promise 
Promise adalah objek yang mewakili penyelesaian (atau kegagalan) suatu operasi asinkron dan hasilnya. Ini adalah cara yang lebih bersih untuk menangani operasi asinkron dibandingkan callback tradisional.

#### Status Promise
- Pending: Keadaan awal, operasi belum selesai.
- Fulfilled: Operasi berhasil diselesaikan.
- Rejected: Operasi gagal.
Setelah sebuah Promise diselesaikan (baik fulfilled maupun rejected), statusnya tidak 
bisa berubah lagi.

#### Manfaat Menggunakan Promise
- Membuat struktur kode lebih datar, menghindari callback hell.
- Penanganan error yang lebih baik dengan satu blok .catch().
- Lebih mudah untuk menyusun dan menggabungkan operasi.

#### Contoh Callback Hell (Tanpa Promise)
```
ambilUser(userId, (err, user) => {
    if (err) return tanganiError(err);
    ambilPesanan(user.id, (err, pesanan) => {
        if (err) return tanganiError(err);
        prosesPesanan(pesanan, (err) => {
            if (err) return tanganiError(err);
            console.log('Semua tugas selesai!');
        });
    });
});
```

#### Contoh Dengan Promise
```
ambilUser(userId)
    .then(user => ambilPesanan(user.id)) 
    .then(pesanan => prosesPesanan(pesanan)) 
    .then(() => console.log('Semua tugas selesai!'))
    .catch(tanganiError); 
```

#### Alur Kerja Promise
1. Mulai Operasi: Fungsi yang mengembalikan Promise dipanggil (misalnya ambilUser(userId)). Promise berada dalam status Pending.
2. Operasi Berjalan di Latar Belakang: Node.js melanjutkan eksekusi kode lain (non-blocking).
3. Hasil (Sukses atau Gagal):
    - Jika operasi berhasil, Promise akan Fulfilled dan menjalankan fungsi di dalam .then(). Hasil dari Promise sebelumnya akan diteruskan ke .then() berikutnya.
    - Jika operasi gagal, Promise akan Rejected dan melompat ke blok .catch().
4. Penanganan Error: Blok .catch() menangani semua error dari rantai Promise.
5. Finalisasi (opsional): Blok .finally() akan dijalankan terlepas dari sukses atau gagalnya Promise.

### Async/Await
Async/Await adalah cara modern untuk menangani operasi asinkron di Node.js, dibangun di atas Promise. Ini memungkinkan Anda menulis kode asinkron yang terlihat dan terasa lebih seperti kode sinkron, sehingga lebih mudah dibaca dan dipelihara.

#### Kata Kunci
- async: Digunakan untuk mendeklarasikan fungsi asinkron yang selalu mengembalikan Promise.
- await: Digunakan untuk "menjeda" eksekusi sebuah fungsi async sampai sebuah Promise selesai (resolved). await hanya bisa digunakan di dalam fungsi async.

#### Contoh Dasar Async/Await
```
// Fungsi yang mengembalikan Promise (misalnya dari library atau API)
function operasiAsinkronSimulasi() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Data berhasil diambil!'), 1000); // Simulasi tunda 1 detik
    });
}

// Fungsi async menggunakan await
async function ambilData() {
    console.log('Mulai proses pengambilan data...');
    const hasil = await operasiAsinkronSimulasi(); // Jeda di sini sampai Promise selesai
    console.log(`Hasil pengambilan: ${hasil}`);
    return hasil;
}

// Memanggil fungsi async
ambilData()
    .then(dataFinal => console.log('Proses selesai dengan data:', dataFinal))
    .catch(error => console.error('Terjadi kesalahan:', error));
```

#### Alur Kerja Async/Await
1. Panggilan Fungsi async: Fungsi ambilData() dipanggil.
2. Eksekusi Awal: console.log('Mulai proses pengambilan data...'); dieksekusi.
3. Bertemu await: Ketika await operasiAsinkronSimulasi() ditemui, fungsi ambilData() "dijeda" sementara. Namun, Event Loop Node.js tidak terblokir, sehingga Node.js bisa memproses permintaan lain.
4. Promise Selesai: Setelah operasiAsinkronSimulasi() menyelesaikan Promise-nya (setelah 1 detik), eksekusi fungsi ambilData() dilanjutkan dari titik await.
5. Variabel Terisi: Variabel hasil kini terisi dengan nilai yang dihasilkan oleh Promise ('Data berhasil diambil!').
6. Eksekusi Lanjutan: console.log(Hasil pengambilan: ${hasil}); dieksekusi.
7. Fungsi async Selesai: Fungsi ambilData() selesai, dan Promise yang dikembalikannya di-resolve dengan nilai hasil.
8. Penanganan .then(): .then() di luar fungsi async menerima hasil akhir dan mencetak console.log('Proses selesai dengan data:', dataFinal).

#### Penanganan Error dengan try...catch
Async/Await memungkinkan Anda menggunakan blok try...catch yang familiar untuk menangani error, baik dari operasi sinkron maupun asinkron.
```
const fs = require('fs').promises; // Menggunakan versi Promise dari modul fs

async function bacaFilePengguna(namaFile) {
    try {
        // Coba kode yang mungkin menyebabkan error
        const data = await fs.readFile(namaFile, 'utf8');
        const user = JSON.parse(data); // Mungkin terjadi SyntaxError jika JSON tidak valid
        
        if (!user.email) {
            throw new Error('Data pengguna tidak lengkap: email kosong.'); // Melempar error kustom
        }
        
        return user;
    } catch (error) {
        // Tangkap error jika terjadi di blok try
        console.error(`Terjadi kesalahan saat memproses ${namaFile}:`, error.message);
        if (error.code === 'ENOENT') {
            console.error('File tidak ditemukan.');
        } else if (error instanceof SyntaxError) {
            console.error('Format JSON tidak valid.');
        }
        throw error; // Lempar ulang error agar bisa ditangkap di tempat lain jika perlu
    } finally {
        console.log(`Selesai mencoba memproses ${namaFile}.`); // Selalu dieksekusi
    }
}

// Memanggil dan menangani error dari fungsi async
(async () => {
    try {
        const user1 = await bacaFilePengguna('user-data.json');
        console.log('User 1:', user1);
    } catch (e) {
        console.error('Gagal memuat user 1:', e.message);
    }

    try {
        const user2 = await bacaFilePengguna('file-yang-tidak-ada.json');
        console.log('User 2:', user2);
    } catch (e) {
        console.error('Gagal memuat user 2:', e.message);
    }
})();
```

#### Alur Kerja Penanganan Error Async/Await
1. Blok try: Kode di dalamnya dieksekusi.
2. Terjadi Error: Jika ada error (misalnya fs.readFile gagal karena file tidak ada, atau JSON.parse gagal karena format salah, atau throw new Error manual), eksekusi di blok try segera berhenti.
3. Blok catch: Eksekusi melompat ke blok catch. Objek error yang terjadi diteruskan ke parameter catch. Di sini, Anda bisa mencatat error, menampilkan pesan, atau melakukan penanganan spesifik.
4. Blok finally: Setelah blok try selesai atau blok catch selesai, blok finally akan dieksekusi. Ini berguna untuk tugas bersih-bersih (misalnya menutup koneksi).

### Error Handling
Penanganan error yang tepat sangat penting dalam aplikasi Node.js untuk mencegah crash, memberikan feedback yang berarti, dan menjaga stabilitas aplikasi.

#### Tipe Error Umum
- Standard JavaScript Errors:
    - SyntaxError: Kesalahan penulisan kode atau sintaks.
    - TypeError: Operasi pada tipe data yang salah (misalnya memanggil method pada null).
    - ReferenceError: Menggunakan variabel yang belum didefinisikan.
- System Errors (Errno): Error dari sistem operasi, biasanya terkait I/O.
    - ENOENT: File atau direktori tidak ditemukan.
    - ECONNREFUSED: Koneksi jaringan ditolak.
    - EACCES: Tidak ada izin akses.

#### Pola Penanganan Error Dasar
##### Error-First Callbacks:
- Pola historis di banyak modul inti Node.js.
- Parameter pertama callback adalah objek error (jika ada), parameter kedua adalah hasil sukses.
```
// Contoh Error-First Callback
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) { // Selalu cek error di awal
        console.error('Gagal membaca file:', err);
        return; // Penting: keluar dari callback jika ada error
    }
    console.log('Isi file:', data);
});
```
##### Alur Kerja Error-First Callback:
1. Fungsi asinkron (misalnya fs.readFile) dipanggil dengan callback.
2. Operasi asinkron berjalan di latar belakang.
3. Ketika operasi selesai:
    - Jika gagal, err akan berisi objek Error dan data akan undefined. Kode di dalam if (err) akan dieksekusi.
    - Jika sukses, err akan null dan data akan berisi hasilnya. Kode di luar if (err) akan dieksekusi.
4. Penting untuk selalu return setelah menangani error agar tidak melanjutkan eksekusi kode sukses.

##### try...catch dengan Async/Await (Pola Modern):
- Cara paling bersih untuk menangani error di kode async/await.
```
// Contoh try...catch dengan Async/Await (sudah dijelaskan di bagian Async/Await)
// ...lihat contoh sebelumnya
```
##### Alur Kerja try...catch dengan Async/Await:
1. Kode di dalam blok try dieksekusi.
2. Jika ada error (baik synchronous maupun asynchronous yang di-await), eksekusi di blok try segera berhenti.
3. Kontrol langsung melompat ke blok catch. Kode di dalam catch dieksekusi untuk menangani error.
4. Setelah try atau catch selesai, blok finally (jika ada) selalu dieksekusi.

### Penanganan Error Global
#### ```process.on('uncaughtException', ...):```
- Menangani error synchronous yang tidak tertangkap oleh try...catch mana pun.
- Peringatan: Ini adalah fallback terakhir. Sebaiknya error ditangani di tempat terjadinya. Setelah ini terpicu, aplikasi berada dalam keadaan tidak stabil dan sebaiknya dimatikan secara bersih.
```
// Menangkap error synchronous yang tidak tertangkap
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Aplikasi akan mati.', err);
    // Lakukan pembersihan (misal: tutup koneksi DB)
    process.exit(1); // Keluar dengan kode error
});

// Contoh yang akan memicu ini (error synchronous yang tidak ditangkap)
// throw new Error('Ini error sinkronus yang tidak tertangkap!');
```

#### Alur Kerja uncaughtException:
1. Sebuah error synchronous terjadi dan tidak ada blok try...catch yang menanganinya.
2. Event uncaughtException terpicu.
3. Fungsi listener yang Anda definisikan akan dieksekusi. Di sinilah Anda harus melakukan logging error dan pembersihan sumber daya (server.close(), db.close()).
4. Sangat disarankan untuk mematikan proses (process.exit(1)) setelah menangani error jenis ini karena proses berada dalam keadaan tidak pasti.

#### ```process.on('unhandledRejection', ...):```
- Menangani Promise yang berstatus Rejected tetapi tidak memiliki .catch() (atau tidak ditangkap oleh try...catch di fungsi async/await).
```
// Menangkap Promise yang gagal tapi tidak ada .catch()
process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION! Aplikasi akan mati.', reason);
    // Lakukan pembersihan (misal: tutup koneksi DB)
    process.exit(1); // Keluar dengan kode error
});

// Contoh yang akan memicu ini (Promise gagal tanpa .catch())
// Promise.reject(new Error('Ini promise yang tidak tertangani!'));
```
#### Alur Kerja unhandledRejection:
1. Sebuah Promise menjadi Rejected.
2. Tidak ada penanganan .catch() (atau try...catch pada await) di rantai Promise tersebut.
3. Event unhandledRejection terpicu.
4. Fungsi listener yang Anda definisikan akan dieksekusi. Mirip dengan uncaughtException, ini adalah indikator masalah serius dan seringkali memerlukan penghentian proses.
