const array = new Uint8Array(32);

const randomArray = crypto.getRandomValues(array);

const buff = Buffer.from(randomArray).toString("base64");

console.log(buff);

console.log(randomArray);
