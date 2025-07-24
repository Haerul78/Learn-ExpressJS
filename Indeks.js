// app.js

// console.log("--- Memulai Simulasi Callback Hell, Promises, dan Async/Await ---");
// console.log("Perhatikan urutan output dan waktu eksekusi.\n");

// --- Fungsi Simulasi Asinkron ---
// Fungsi-fungsi ini akan mensimulasikan operasi yang membutuhkan waktu
// dengan menggunakan setTimeout.

function getUser(userId) {
    return new Promise((resolve, reject) => {
        console.log(`[getUser] Mencari user dengan ID: ${userId}...`);
        setTimeout(() => {
            if (userId === 123) {
                console.log(`[getUser] User ${userId} ditemukan.`);
                resolve({ id: userId, name: 'Alice', email: 'alice@example.com' });
            } else {
                console.error(`[getUser] User ${userId} tidak ditemukan!`);
                reject(new Error(`User with ID ${userId} not found`));
            }
        }, 1000); // Simulasi penundaan 1 detik
    });
}

function getOrders(userId) {
    return new Promise((resolve, reject) => {
        console.log(`[getOrders] Mencari pesanan untuk user ID: ${userId}...`);
        setTimeout(() => {
            if (userId === 123) {
                console.log(`[getOrders] Pesanan untuk user ${userId} ditemukan.`);
                resolve(['Order_A1', 'Order_B2', 'Order_C3']);
            } else {
                console.error(`[getOrders] Pesanan untuk user ${userId} tidak ditemukan!`);
                reject(new Error(`Orders for user ${userId} not found`));
            }
        }, 800); // Simulasi penundaan 0.8 detik
    });
}

function processOrders(orders) {
    return new Promise((resolve, reject) => {
        console.log(`[processOrders] Memproses ${orders.length} pesanan...`);
        setTimeout(() => {
            if (orders.length > 0) {
                console.log(`[processOrders] Semua pesanan (${orders.join(', ')}) berhasil diproses.`);
                resolve(); // Tidak mengembalikan data, hanya menandakan selesai
            } else {
                console.error(`[processOrders] Tidak ada pesanan untuk diproses.`);
                reject(new Error("No orders to process"));
            }
        }, 500); // Simulasi penundaan 0.5 detik
    });
}

function handleError(error) {
    console.error(`\n!!! Terjadi Kesalahan: ${error.message} !!!\n`);
}

// --- Contoh Implementasi ---
const testUserId = 123; // Ganti dengan 456 untuk melihat error handling

console.log("--- Contoh 1: Callback Hell ---");
// Catatan: Dalam skenario nyata, fungsi ini tidak akan mengembalikan Promise
// Tapi di sini kita akan sedikit memodifikasinya agar bisa mensimulasikan
// callback hell dari fungsi yang sudah kita buat sebagai Promise.
// Untuk kode ini, kita akan membuat versi callback-nya secara manual.

function getUserCallback(userId, callback) {
    console.log(`[getUserCallback] Mencari user dengan ID: ${userId}...`);
    setTimeout(() => {
        if (userId === 123) {
            console.log(`[getUserCallback] User ${userId} ditemukan.`);
            callback(null, { id: userId, name: 'Alice', email: 'alice@example.com' });
        } else {
            console.error(`[getUserCallback] User ${userId} tidak ditemukan!`);
            callback(new Error(`User with ID ${userId} not found`), null);
        }
    }, 1000);
}

function getOrdersCallback(userId, callback) {
    console.log(`[getOrdersCallback] Mencari pesanan untuk user ID: ${userId}...`);
    setTimeout(() => {
        if (userId === 123) {
            console.log(`[getOrdersCallback] Pesanan untuk user ${userId} ditemukan.`);
            callback(null, ['Order_A1', 'Order_B2', 'Order_C3']);
        } else {
            console.error(`[getOrdersCallback] Pesanan untuk user ${userId} tidak ditemukan!`);
            callback(new Error(`Orders for user ${userId} not found`), null);
        }
    }, 800);
}

function processOrdersCallback(orders, callback) {
    console.log(`[processOrdersCallback] Memproses ${orders.length} pesanan...`);
    setTimeout(() => {
        if (orders.length > 0) {
            console.log(`[processOrdersCallback] Semua pesanan (${orders.join(', ')}) berhasil diproses.`);
            callback(null);
        } else {
            console.error(`[processOrdersCallback] Tidak ada pesanan untuk diproses.`);
            callback(new Error("No orders to process"));
        }
    }, 500);
}

// Implementasi Callback Hell
console.log("\n--- Executing Callback Hell for user ID:", testUserId, "---");
getUserCallback(testUserId, (err, user) => {
    if (err) return handleError(err);
    getOrdersCallback(user.id, (err, orders) => {
        if (err) return handleError(err);
        processOrdersCallback(orders, (err) => {
            if (err) return handleError(err);
            console.log('\nCallback Hell: All done!');
            console.log("--- Selesai Callback Hell ---\n");

            // Lanjut ke contoh Promises setelah Callback Hell selesai
            runPromisesExample();
        });
    });
});

// --- Contoh 2: Menggunakan Promises ---
function runPromisesExample() {
    console.log("--- Contoh 2: Menggunakan Promises ---");
    console.log("\n--- Executing Promises for user ID:", testUserId, "---");
    getUser(testUserId)
        .then(user => {
            console.log('Promises: User fetched:', user.name);
            return getOrders(user.id);
        })
        .then(orders => {
            console.log('Promises: Orders fetched:', orders.length);
            return processOrders(orders);
        })
        .then(() => {
            console.log('Promises: All orders processed.');
            console.log('Promises: All done!');
            console.log("--- Selesai Promises ---\n");

            // Lanjut ke contoh Async/Await setelah Promises selesai
            runAsyncAwaitExample();
        })
        .catch(handleError);
}

// --- Contoh 3: Menggunakan Async/Await ---
async function runAsyncAwaitExample() {
    console.log("--- Contoh 3: Menggunakan Async/Await ---");
    console.log("\n--- Executing Async/Await for user ID:", testUserId, "---");
    try {
        const user = await getUser(testUserId);
        console.log('Async/Await: User fetched:', user.name);
        const orders = await getOrders(user.id);
        console.log('Async/Await: Orders fetched:', orders.length);
        await processOrders(orders);
        console.log('Async/Await: All orders processed.');
        console.log('Async/Await: All done!');
        console.log("--- Selesai Async/Await ---");
    } catch (err) {
        handleError(err);
    } finally {
        console.log("\n--- Simulasi Selesai ---");
    }
}