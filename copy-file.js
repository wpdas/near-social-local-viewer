#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

const widgetFile = process.env.WIDGET;

if (!widgetFile) {
  throw new Error(
    "You must provide the widget`s path using WIDGET env. e.g: WIDGET=path/to/MyWidget.jsx"
  );
}

const widgetJSX = path.join(widgetFile);
const widgetTXT = path.join(__dirname, `cache.txt`);

fs.copyFile(widgetJSX, widgetTXT, (err) => {
  if (err) throw err;
});
