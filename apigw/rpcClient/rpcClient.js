const grpc =require( '@grpc/grpc-js');
const protoLoader =require( '@grpc/proto-loader');
//apigateway
require('dotenv').config();


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


 const findFile = (fileName)=>{
  const client = new fileManager(REMOTE_HOST,grpc.credentials.createInsecure());

  console.log("corriendo main")
  client.findFile({fileName}, (err, data) => {
    if(err){
      throw(err)
    } else {
      console.log('Response received from remote service:', data); // API response
    }
  }); 
}

 const listFiles = ()=>{
  const client = new fileManager(REMOTE_HOST,grpc.credentials.createInsecure());

  console.log("corriendo main")
  client.listFiles({}, (err, data) => {
    if(err){
      throw(err)
    } else {
      console.log('Response received from remote service:', data); // API response
    }
  }); 
}


module.exports ={
  listFiles,
  findFile,
}