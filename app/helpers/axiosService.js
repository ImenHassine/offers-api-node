var config = require("../config/key.config");
const util = require("../utils/Utils");
const axios = require('axios');
exports.postAxios =async(body,port,path,res)  =>{
    try {
      console.log("getAxios "+`http://localhost:${port}${path}`)
      console.log("body ",body)


           return await axios.post(`http://localhost:${port}${path}`, body)
        
      } catch (error) {
      console.log("error.response ",error.response.data)
       
      
        util.setError(400, "", error.response.data)
        return res.status(400).json(error.response.data);
      }
}
exports.getAxios =async(body,port,path,res,param) =>{
    try {
      console.log("getAxios "+`http://localhost:${port}${path}${param}`)
        return await axios.get(`http://localhost:${port}${path}${param}`, {
  params:body
        })
        
      } catch (error) {
       
        
        util.setError(400, "", error.response.data)
        return res.status(400).json(error.response.data);
      }
}
exports.putAxios =async(body,port,path,res,param) =>{
  try {
    console.log("putAxios "+`http://localhost:${port}${path}${param}`)
    
      return await axios.put(`http://localhost:${port}${path}${param}`,body)
      
    } catch (error) {
  
      
      util.setError(400, "", error.response.data)
      return res.status(400).json(error.response.data);
    }
}
exports.putAxiosW =async(body,port,path,res) =>{
  try {
    console.log("putAxios "+`http://localhost:${port}${path}`)
    
      return await axios.put(`http://localhost:${port}${path}`,body)
      
    } catch (error) {
  
      
      util.setError(400, "", error.response.data)
      return res.status(400).json(error.response.data);
    }
}
exports.patchAxios =async(body,port,path,res,param) =>{
  try {
    console.log("patchAxios "+`http://localhost:${port}${path}${param}`)

      return await axios.patch(`http://localhost:${port}${path}${param}`,body)
      
    } catch (error) {
  
      
      util.setError(400, "", error.response.data)
      return res.status(400).json(error.response.data);
    }
}
exports.deleteAxios =async(body,port,path,res,param) =>{
  try {
    console.log("deleteAxios "+`http://localhost:${port}${path}${param}`)

      return await axios.delete(`http://localhost:${port}${path}${param}`,{data:body})
      
    } catch (error) {
     
      util.setError(400, "", error.response.data)
      return res.status(400).json(error.response.data);
    }
}