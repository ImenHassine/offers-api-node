require('dotenv/config');

const HOST_ADMIN = process.env.HOST_ADMIN || "localhost:3000";
const HOST_USER = process.env.HOST_USER || "localhost:3000";
const HOST_SERVER = process.env.HOST_SERVER || "localhost";
const USR = process.env.USR ;
const PASSWORD = process.env.PASSWORD ;
const EMAIL = process.env.EMAIL ;




module.exports = {
    HOST_ADMIN: HOST_ADMIN,
    HOST_USER: HOST_USER,
    HOST_SERVER: HOST_SERVER,
    USERNAME: USR,
    PASSWORD: PASSWORD,
    EMAIL: EMAIL,

  };
