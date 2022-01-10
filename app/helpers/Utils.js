const db = require("../models");
const currentPath = require("../config/logs.config.js");

const fs = require("fs");
const Document = db.documents;

// var shell = require('shelljs');

const d = new Date();
const fDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const getDirName = require("path").dirname;

exports.setSuccess = (statusCode, message, data) => {
  this.statusCode = statusCode;
  this.message = message;
  this.data = data;
  this.type = "success";
};

exports.setError = (statusCode, message, code) => {
  this.statusCode = statusCode;
  this.message = message;
  this.code = code;
  this.type = "error";
};

exports.send = (res) => {
  const result = {
    status: this.type,
    message: this.message,
    data: this.data,
  };

  if (this.type === "success") {
    return res.status(this.statusCode).json(result);
  }
  return res.status(this.statusCode).json({
    status: this.type,
    message: this.message,
    code: this.code,
  });
};

exports.isEmpty = (str) => {
  if (str == undefined) return true;
  if (!str.length) {
return true;
} return false;
};

exports.upload = (document, userID, type, index) => {
  const base64String = document;
  let documentPath;
  const message = {
    etat: "echec",
    message: "",
  };
  if (!document) {
    message.etat = "vide";
    return message;
  } else {

    const base64Image = base64String.split(";base64,").pop();
    console.log(
      "base64String.split(';base64,')",
      base64String.split(";base64,")
    );

    if (base64String.startsWith("data:document/")) {
      try {
        // Remove header
        const ext = base64String.split(";base64,")[0].split("/")[1];
        console.log("ext", ext);
        if (ext == "png" || ext == "jpg" || ext == "jpeg") {
          const myDocument = base64String.split(";base64,").pop();
          let path = null;
            path = currentPath.document;
          // var tempsEnMs = new Date().toISOString().substr(11, 8);
          let tempsEnMs = new Date().toISOString();

          documentPath = `${path + userID}_${tempsEnMs}_${index}.${ext}`;
          console.log("myDocument *************************"); // data stored in assets

          console.log(`myDocument ${documentPath}`); // data stored in assets

          console.log("myDocument *************************"); // data stored in assets
          console.log("getDirName", getDirName(documentPath));
          if (!fs.existsSync(getDirName(documentPath))) {
            fs.mkdirSync(getDirName(documentPath));
          }
          tempsEnMs = new Date().toISOString().substr(11, 8);

          fs.writeFile(
            documentPath,
            myDocument,
            { encoding: "base64" },
            function (err) {
              console.log("File created err ", err);
            }
          );
          console.log("File created documentPath ", documentPath);

          // writeFile(documentPath,myDocument)
          message.etat = "success";
          message.message = documentPath;
          return message;
        } else {
          console.log("aaaaaaaaa");
          message.message =
            "Error uploading document || supported format : png , jpeg , jpg";
          return message;
        }
      } catch (error) {
        console.log("bbbbbbbbb");

        message.message = `Error uploading document || supported format : png , jpeg , jpg ${error}`;
        return message;
      }
    } else {
      console.log("dddddddddd");

      message.message =
        "Error uploading document || supported format : png , jpeg , jpg";

      return message;
    }
  }
};

exports.uploadDocument = (documentArray, label, type) => {
  const imagedata = [];
  let size = 0;
  const message = {
    etat: "empty",
    info: "",
    data: [],
  };
  if (!this.isEmpty(documentArray)) {
    size = documentArray.length;
    let i = 0;
    for (let index = 0; index < size; index++) {
      const element = documentArray[index];
      console.log("*******************************");
      console.log("documents cin index", index);
      console.log("*******************************");

      const response = this.upload(element, label, type, i);
      i++;
      if (response.etat == "success") {
        imagedata.push(response.message);
        message.etat = "success";
      } else if (response.etat == "echec") {
        message.etat = "echec";
        message.info = response.message;
        index = size;
      }
    }
    if (message.etat == "success") {
      message.data = imagedata;
      return message;
    }
    return message;
  }
};
