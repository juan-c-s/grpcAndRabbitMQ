
const {getFiles,getFile} = require('../utils')

const path = '../files'
const listFiles = (params,callback)=>{
    console.log("listingFiles")
    const fileNames = getFiles(path);
    callback(null,{fileNames});
}


const findFile = (params,callback)=>{
    const fileName = params.request.fileName;
    console.log("finding File: "  + fileName)
    const exists = getFile(path,fileName)
    callback(null,{fileName:exists});

}

module.exports={
    listFiles,
    findFile,
}