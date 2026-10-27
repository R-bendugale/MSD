const fs = require("fs");

fs.writeFileSync(
    "data.txt",
    "Hello, this is Node.js"
);

const data = fs.readFileSync(
    "data.txt",
    "utf8"
);

console.log(data);