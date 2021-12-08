var path = require("path");
// var appDir = path.dirname(require.main.filename);
var appDir = ".";
var d = new Date();
var dirName = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

module.exports = {
  document: appDir + "/documents/" + dirName + "/",
  logs: appDir + "/logs/" + dirName + "/",
  csv: appDir + "/csv_File/",

};
