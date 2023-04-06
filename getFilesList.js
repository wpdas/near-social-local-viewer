#! /usr/bin/env node

const fs = require("fs");

/**
 * Return Widgets files dir. e.g:
 * {
 *    "MyWidget.jsx": "/path/to/widget/MyWidget.jsx",
 *    "MyWidget2.jsx": "/path/to/widget/MyWidget2.jsx"
 *    ...
 * }
 * 
 * @param {*} widgetsFolder 
 * @returns 
 */
const getFilesList = (widgetsFolder) => {
  if (!widgetsFolder) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const widgetsList = {};
    fs.readdir(widgetsFolder, function (err, files) {
      // Handling error
      if (err) {
        reject("Unable to scan directory: " + err)
        return console.log("Unable to scan directory: " + err);
      }
      // Listing all files using forEach
      files.forEach(function (file) {
        widgetsList[file] = `${widgetsFolder}/${file}`;
      });

      resolve(widgetsList)
    })
  })
}

module.exports = getFilesList