const fs = require("fs");

const readStream = fs.createReadStream("data.txt", "utf8");
const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
    console.log("File copied successfully");
});

readStream.on("error", (err) => {
    console.log("Read Error:", err);
});

writeStream.on("error", (err) => {
    console.log("Write Error:", err);
});
