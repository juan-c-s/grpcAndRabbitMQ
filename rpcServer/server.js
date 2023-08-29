const grpc =require( '@grpc/grpc-js');
const protoLoader =require( '@grpc/proto-loader');

const { findFile,listFiles } = require('./utils');

require( 'dotenv').config();
const {PROTO_PATH} = process.env

async function getServer() {
  const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

  console.info("grpc Consumer service is started...");


  const fileManager = grpc.loadPackageDefinition(packageDefinition).FileManager;
  var server = new grpc.Server();
  server.addService(fileManager.service, {
    findFile,
    listFiles,
  });
  server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
getServer()