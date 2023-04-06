#! /usr/bin/env node

/**
 * Copy the Widget.jsx files as cache inside the near-social-local-viewer folder (cache)
 */

const fs = require("fs");
const path = require("path");
const getFilesList = require("./getFilesList");
const getWidgetsFolder = require("./getWidgetsFolder");

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

// Get widget files list and save cache files
getFilesList(widgetsFolder).then((widgetsList) => {
  const widgetKeys = Object.keys(widgetsList);

  widgetKeys.forEach((widgetKeyName) => {
    const widgetDir = widgetsList[widgetKeyName];

    // Change widget name from (e.g) Widget.jsx to Widget
    const finalCacheWidgetName = widgetKeyName.replace(".jsx", "");

    // Final name will be (e.g) Widget.txt
    const widgetCacheTxt = path.join(
      __dirname,
      "cache",
      `${finalCacheWidgetName}.txt`
    );

    // Check if widget file exists
    if (!fs.existsSync(widgetDir)) {
      throw new Error(`The widget file was not found! -> ${widgetJSXName}`);
    }

    // Copy cached file
    fs.copyFile(widgetDir, widgetCacheTxt, (err) => {
      if (err) throw err;
    });
  });
});
