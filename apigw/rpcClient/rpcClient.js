const grpc =require( '@grpc/grpc-js');
const protoLoader =require( '@grpc/proto-loader');
//apigateway
require('dotenv').config();
const {publishMessage}=require('../momClient/producer')

const {PROTO_PATH,REMOTE_HOST} = process.env

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

console.info("grpc Producer service is started...");

const fileManager = grpc.loadPackageDefinition(packageDefinition).FileManager;


 const findFile = (fileName,email)=>{
  const client = new fileManager(REMOTE_HOST,grpc.credentials.createInsecure());

  console.log("corriendo main")
  client.findFile({fileName}, (err, data) => {
    if(err){
      console.log("Error Found: ",err);
      console.log("running mom");
      console.log("<=============>");
      const obj = {
          method : "findFile",
          fileName: fileName,
          email,
      }
      publishMessage(JSON.stringify(obj))
    } else {
      console.log('Response received from remote service:', data); // API response
    }
  }); 
}

 const listFiles =  (email)=>{
  const client = new fileManager(REMOTE_HOST,grpc.credentials.createInsecure());

  console.log("corriendo main")
  try{
    client.listFiles({}, (err, data) => {
      if(err){
        console.log("Error Found: ",err);
        console.log("running mom");
        console.log("<=============>");
        const obj = {
            method : "listFiles",
            email
        }
         publishMessage(JSON.stringify(obj))
      } else {

        console.log('Response received from remote service:', data); // API response
      }
    }); 
  }catch(e){
    console.log("sizsas");
    // throw e
  }
}


module.exports ={
  listFiles,
  findFile,
}