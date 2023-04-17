#! /usr/bin/env node

var shell = require("shelljs");
const path = require("path");

// Args
const [, , ...args] = process.argv;

// Is testnet?
const isTestnet = args[1] && args[1] === "--testnet" ? true : false;

// Widgets folder
const _widgetsFolder = args[0];
// Remove last slash if present
const filteredWidgetsFolder =
  _widgetsFolder.at(-1) === "/"
    ? _widgetsFolder.slice(0, _widgetsFolder.length - 1)
    : _widgetsFolder;

const projectDir = process.env.PWD;
const widgetsFolder = path.join(projectDir, filteredWidgetsFolder);
const mainModulePath = process.mainModule.path;

const main = async () => {
  // SHELL

  // Copy all the widgets as txt and...
  const watchJSXFileCommand = `WIDGETS_FOLDER=${_widgetsFolder} PROJECT_DIR=${projectDir} nodemon --watch ${widgetsFolder} -e jsx,js,tsx,ts ./copy-file.js`;
  // ...Serve the cache files. Then
  const serveCacheCommand = `WIDGETS_FOLDER=${_widgetsFolder} PROJECT_DIR=${projectDir} node serve.js`; // Serve Widget cache codes (port 9000)
  // ...Serve the viewer app and...
  const viewerPort = process.env.VIEWER_PORT || 3001;
  const openViewerCommand = `serve -s dist -l ${viewerPort}`;
  //...open the browser after 1.5sec (time to render the viewer)
  const openBrowserCommand = isTestnet
    ? `sleep 1.5; open http://127.0.0.1:${viewerPort}`
    : `sleep 1.5; open http://localhost:${viewerPort}`;
  const concurrentlyCommand = `yarn concurrently "${watchJSXFileCommand}" "${serveCacheCommand}" "${openViewerCommand}" "${openBrowserCommand}"`;
  shell.exec(`cd ${mainModulePath}; ${concurrentlyCommand}`);
};

main();
