const foo = new Promise((resolve) => {
    setTimeout(() => {
        resolve("A");
    }, Math.floor(Math.random() * 5));
});

const bar = new Promise((resolve) => {
    setTimeout(() => {
        resolve("B");
    }, Math.floor(Math.random() * 5));
});


const buzz = new Promise((resolve) => {
    setTimeout(() => {
        resolve("С");
    }, Math.floor(Math.random() * 5));
});

Promise.all([foo, bar, buzz]).then(values => {
    console.log(values)
});
