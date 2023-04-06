const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");
const getFilesList = require("./getFilesList");
const getWidgetsFolder = require("./getWidgetsFolder");
const app = express();

// WIDGETS_FOLDER
const WIDGETS_FOLDER = process.env.WIDGETS_FOLDER;
if (!WIDGETS_FOLDER) {
  throw new Error("You must provide WIDGETS_FOLDER");
}

// PROJECT_DIR
const PROJECT_DIR = process.env.PROJECT_DIR;
if (!PROJECT_DIR) {
  throw new Error("You must provide PROJECT_DIR");
}

// Get final widgets folder dir
const widgetsFolder = getWidgetsFolder(WIDGETS_FOLDER, PROJECT_DIR);

app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("/widget/list", function (req, res) {
  // Get widget files list
  getFilesList(widgetsFolder).then((widgetsList) => {
    const widgetKeys = Object.keys(widgetsList);
    const widgetsName = widgetKeys.map((name) => name.replace(".jsx", ""));

    // Send widget file names
    res.json({
      list: widgetsName,
    });
  });
});

const notFoundMessage = (widgetName) => `
return (
  <div>
    <p style={{ fontWeight: 600, color: "#AB2E28", fontFamily: "Courier new" }}>
      The Widget <span
      style={{
        background: "#000",
        color: "#fff",
        padding: "2px",
      }}
    >
      ${widgetName}</span> was found.
    </p>
  </div>
);
`;

app.get("/widget/get/:widget", function (req, res) {
  const widget = req.params?.widget;

  if (!widget) {
    res.status(400).send();
    return;
  }

  const cachedWidget = `cache/${widget}.txt`;

  // Check if the cache file exists
  if (!fs.existsSync(cachedWidget)) {
    res.json({
      code: notFoundMessage(widget),
    });
    return;
  }

  // Serve cache file
  fs.readFile(cachedWidget, "utf8", (err, cacheContent) => {
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
