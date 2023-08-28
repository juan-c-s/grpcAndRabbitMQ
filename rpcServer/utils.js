


const listFiles = (params,callback)=>{
    console.log("listingFiles")
    const fileNames = ["file1.txt", "file2.txt", "file3.zip", "file4.zip"];
    callback(null,{fileNames});
}

const findFile = (params,callback)=>{
    console.log("finding File: "  + params.request.fileName)
    const fileName = params.request.fileName;
    callback(null,{fileName});
}

module.exports={
    listFiles,
    findFile,
}