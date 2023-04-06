const path = require("path");

/**
 * Return the dir to the widgets folder (folder path only, widgets files not included). E.g:
 * path/to/list/of/widgets/
 * 
 * @param {*} WIDGETS_FOLDER 
 * @param {*} PROJECT_DIR 
 * @returns 
 */
const getWidgetsFolder = (WIDGETS_FOLDER, PROJECT_DIR) => {
  // Remove last slash if present
  const filteredWidgetsFolder = WIDGETS_FOLDER.at(-1) === '/' ? WIDGETS_FOLDER.slice(0, WIDGETS_FOLDER.length - 1) : WIDGETS_FOLDER;
  const widgetsFolder = path.join(PROJECT_DIR, filteredWidgetsFolder);

  return widgetsFolder
}

module.exports = getWidgetsFolder