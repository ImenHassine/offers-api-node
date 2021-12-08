const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  // let token = req.headers["x-access-token"];
  if(!req.headers.authorization){
    return res.status(403).send({
      message: "No token provided!"
    });

  }
  let token = (req.headers.authorization).replace("Bearer ", "");
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    req.body.createdBy = decoded.id;
    req.body.updatedBy = decoded.id;
    req.body.deletedBy = decoded.id;
    req.body.userId = decoded.id;



    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isUserOrAdminOrVisitor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if ((roles[i].name === "user")||(roles[i].name === "visitor")||(roles[i].name === "admin")) {
          next();
          return;
        }
       
      }

      res.status(403).send({
        message: "Require Admin or User or visitor Role!"
      });
      return;
    });
  });
};

isVisitor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "visitor") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Visitor Role!"
      });
    });
  });
};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isVisitor: isVisitor,
  isUserOrAdminOrVisitor:isUserOrAdminOrVisitor
};
module.exports = authJwt;
