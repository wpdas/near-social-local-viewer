const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", function (req, res) {
  fs.readFile("cache.txt", "utf8", (err, cacheContent) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    res.json({
      code: cacheContent,
    });
  });
});

app.listen(9000);
