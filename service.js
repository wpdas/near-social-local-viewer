#! /usr/bin/env node

// const fs = require("fs");
// const path = require("path");

// console.log("AAAA", process.argv);
// console.log("BBBB", process.env.PWD);

// const projectDir = process.env.PWD;

// const widgetFile = process.argv[process.argv.length - 1];
// // const finalFileName = widgetFile.replace("jsx", "txt").replace("js", "txt");
// const paths = widgetFile.split("/");
// paths[paths.length - 1] = "cache.dat";
// const finalFileName = paths.join("/");
// console.log("Final:", finalFileName);

// const widgetJSX = path.join(projectDir, widgetFile);
// console.log(widgetJSX);
// const widgetTXT = path.join(projectDir, `${finalFileName}`);

// // File destination.txt will be created or overwritten by default.
// fs.copyFile(widgetJSX, widgetTXT, (err) => {
//   if (err) throw err;
// });

const fs = require("fs");
const path = require("path");

// Args
const [, , ...args] = process.argv;
console.log(args);

return;

const _widgetFile = args[0];
const _projectDir = process.env.PWD;

// Widget file
const _widgetJSX = path.join(_projectDir, _widgetFile);
console.log("WIDGET FILE", _widgetJSX);

// Destination
const _widgetTXT = path.join(__dirname, "cache.txt");
console.log("DESTINATION FILE", _widgetTXT);

// Copy widget as cache.txt
fs.copyFile(_widgetJSX, _widgetTXT, (err) => {
  if (err) throw err;
});

// return;

// const projectDir = process.env.PWD;

// const widgetFile = process.argv[process.argv.length - 1];
// // const finalFileName = widgetFile.replace("jsx", "txt").replace("js", "txt");
// const paths = widgetFile.split("/");
// paths[paths.length - 1] = "cache.dat";
// const finalFileName = paths.join("/");
// console.log("Final:", finalFileName);

// const widgetJSX = path.join(projectDir, "../../", widgetFile);
// console.log(widgetJSX);
// const widgetTXT = path.join(projectDir, "../../", `${finalFileName}`);

// // File destination.txt will be created or overwritten by default.
// fs.copyFile(widgetJSX, widgetTXT, (err) => {
//   if (err) throw err;
// });
