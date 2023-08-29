const fs = require('fs');

const getFiles = (path)=>{
    return fs.readdirSync(path)
}

const getFile = (path,fileName)=>{
    const fileNames = fs.readdirSync(path)
    if(fileNames.includes(fileName)){
        return "File Does Exist"
    }else return "File Does Not Exist"

}


module.exports ={
    getFiles,
    getFile,
}