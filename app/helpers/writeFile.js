const fs = require("fs");
var shell = require("shelljs");

exports.WriteLogFile = (path, fileName, data) => {
  console.log("in write Log File " + data.length);

  fs.exists(path, (exists) => {
    if (exists) {
      
      fs.writeFile(path + fileName, data, (err) => {
        if (err) {
          console.log("error writing " + path + fileName + "  ", err);
          return false;
        } else {
          console.log(" writing " + path + fileName);
          return true;
        }
      });
    } else {
      console.log("original path not exist ... writing");
      shell.mkdir("-p", path);
      //fs.writeFileSync(path+fileName, buff);
      fs.exists(path + fileName, (exists) => {
        if (exists) {
          fs.appendFile(path + fileName, data, (err) => {
            if (err) {
              console.log(
                "error appending to file  " + path + fileName + " ",
                err
              );
              return false;
            } else {
              console.log("appending to file  " + path + fileName);
              return true;
            }
          });
        } else {
          fs.writeFile(path + fileName, data, (err) => {
            if (err) {
              console.log(
                "error writing new  file  " + path + fileName + " ",
                err
              );
              return false;
            } else {
              console.log("writing new  file  " + path + fileName + " ");
              return true;
            }
          });
        }
      });
    }
  });
};
