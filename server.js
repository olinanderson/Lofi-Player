const express = require("express");

// Initialize app
const app = express();

// Initializing dependencies
const chalk = require("chalk"),
  fs = require("fs"),
  path = require("path"),
  server = require("http").createServer(app);

// Port Environment variable
const PORT = process.env.PORT || 5000;

var fileArray = [];

const getFileNames = async () => {
  fs.readdir("./client/public/uploads", function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      // Getting rid of spaces in any newly added audio files (React doesn't recognize files with spaces in them)

      fs.rename(
        "./client/public/uploads/" + file,
        "./client/public/uploads/" + file.replace("–", "-"),
        () => {
          fs.rename(
            "./client/public/uploads/" + file,
            "./client/public/uploads/" + file.replace(/ /g, "_"),
            () => {
              fs.stat(
                "./client/public/uploads/" + file.replace(/ /g, "_"),
                (error, stats) => {
                  if (error) {
                    console.log(error);
                    return;
                  }
                  fileArray.push({
                    fileName: file.replace(/ /g, "_"),
                    fileBirthMs: stats.birthtimeMs,
                  });
                }
              );
            }
          );
        }
      );
    });
  });
};
getFileNames();

app.get("/api/audio", async (req, res) => {
  fileArray.sort((a, b) => {
    return a.fileBirthMs - b.fileBirthMs;
  });

  for (let i = 0; i < fileArray.length; i++) {
    fileArray[i] = { ...fileArray[i], img: i + 1 };
  }

  return res.json(fileArray);
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Firing up the server on selected port
server.listen(PORT);

server.on("listening", () => {
  console.log(chalk.green("server listening on port", PORT));
});

// Callback function for checking connecting or errors
server.on("error", (error) => {
  throw new Error(`[server]::ERROR:${error.message}`);
});
