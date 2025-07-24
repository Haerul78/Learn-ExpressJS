const myPromise = new Promise((resovle, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.5;

        if (success) {
            resovle('Operation completed successfully');
        } else {
            reject(new Error('Operation failed'));
        }
    }, 1000);
});

myPromise
    .then(result => console.log('Succes:', result))
    .catch(error => console.error('Error:', error.message))