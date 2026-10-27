const fs = require("fs");

fs.writeFile(
    "data.txt",
    "Hello, this is Asynchronous Node.js",
    (err) => {

        if (err) {
            console.log(err);
            return;
        }

        console.log("File written successfully");

        fs.readFile(
            "data.txt",
            "utf8",
            (err, data) => {

                if (err) {
                    console.log(err);
                    return;
                }

                console.log("File content:");
                console.log(data);
            }
        );
    }
);