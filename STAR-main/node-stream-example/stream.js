const fs = require("fs");

// Create a readable stream
const readStream = fs.createReadStream("data.txt", "utf8");

// Create a writable stream
const writeStream = fs.createWriteStream("output.txt");

// Read data from the file
readStream.on("data", (chunk) => {
    console.log("Reading data:");
    console.log(chunk);

    // Write the data into output.txt
    writeStream.write(chunk);
});

// When reading is completed
readStream.on("end", () => {
    console.log("File reading completed");

    // Close the write stream
    writeStream.end();
});

// Handle read errors
readStream.on("error", (err) => {
    console.log("Read Error:", err);
});

// Handle write errors
writeStream.on("error", (err) => {
    console.log("Write Error:", err);
});

// When writing is completed
writeStream.on("finish", () => {
    console.log("File written successfully");
});
