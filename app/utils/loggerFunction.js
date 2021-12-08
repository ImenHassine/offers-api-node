const log4j = require("../config/configLog4js.js");
const util = require("./Utils");
const {
    parse,
    stringify
  } = require('flatted');
exports.loggerFunction =(req,res)=>
{
    log4j.loggerdebug.info("call " + req.protocol + '://' + req.get('host') + req.originalUrl);
    if(Object.keys(req.body).length === 0){
     
    log4j.loggerdebug.info(`query : ${JSON.stringify(req.query)} `);}
    else{
      log4j.loggerdebug.info(`params : ${JSON.stringify(req.body)} `);
    }
    log4j.loggerdebug.info(`request data : ${stringify(req)} `);
    res.setTimeout(50000, function () {
      // call back function is called when request timed out.
      log4j.loggerwarn.warn(`Request timeout`);
  
      util.setError(408, "Request timeout ");
      return util.send(res);
    });
}