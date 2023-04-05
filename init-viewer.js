#! /usr/bin/env node

var shell = require("shelljs");
const path = require("path");

// Args
const [, , ...args] = process.argv;

const _widgetFile = args[0];
const _projectDir = process.env.PWD;
const _widgetJSX = path.join(_projectDir, _widgetFile);
const mainModulePath = process.mainModule.path;

// Copy the widget as txt and...
const watchJSXFileCommand = `WIDGET=${_widgetJSX} nodemon --watch ${_widgetJSX} ./copy-file.js`;
// ...Serve the cache.txt file. Then
const serveCacheCommand = "node serve.js";
// ...Serve the viewer app and...
const viewerPort = process.env.VIEWER_PORT || 3001;
const openViewerCommand = `serve -s dist -l ${viewerPort}`;
//...open the browser after 1.5sec (time to render the viewer)
const openBrowserCommand = `sleep 1.5; open http://localhost:${viewerPort}`;
const concurrentlyCommand = `yarn concurrently "${watchJSXFileCommand}" "${serveCacheCommand}" "${openViewerCommand}" "${openBrowserCommand}"`;

shell.exec(`cd ${mainModulePath}; ${concurrentlyCommand}`);
