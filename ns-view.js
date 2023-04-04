#! /usr/bin/env node

var shell = require("shelljs");
const path = require("path");

// Args
const [, , ...args] = process.argv;

const _widgetFile = args[0];
const _projectDir = process.env.PWD;
const _widgetJSX = path.join(_projectDir, _widgetFile);
const mainModulePath = process.mainModule.path;

const serveCacheCommand = "node serve.js";
const watchJSXFileCommand = `WIDGET=${_widgetJSX} yarn nodemon --watch ${_widgetJSX} ./copy-file.js`;
const openViewerCommand = "serve -s dist -l 3001";
const concurrentlyCommand = `yarn concurrently "${serveCacheCommand}" "${watchJSXFileCommand}" "${openViewerCommand}"`;

shell.exec(`cd ${mainModulePath}; ${concurrentlyCommand}`);
