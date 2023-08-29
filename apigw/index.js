const express = require('express')
const app = express();
const cors = require('cors');

const {listFiles,findFile} = require('./rpcClient/rpcClient.js')
const{publishMessage} = require('./momClient/producer.js')

app.use(express.json());
app.use(cors());

app.get('/listFiles', async (req, res) => {
    try{
        listFiles();
    }catch(e){
        const obj = {
            method : "listFiles"
        }
        await publishMessage(JSON.stringify(obj))
        console.log("Error Found: ",e);
    }
  res.status(201).send('success');
});
// app.get('/listFiles', async (req, res) => {
//     try{
//         const obj = {
//             method : "listFiles"
//         }
//         await publishMessage(JSON.stringify(obj))

//     }catch(e){
//         const obj = {
//             method : "listFiles"
//         }
//         await publishMessage(JSON.stringify(obj))
//         console.log("Error Found: ",e);
//     }
//   res.status(201).send('success');
// });

app.post('/findFile', async (req, res) => {
    const body = req.body;
    console.log(body.fileName);
    try{
        findFile(body.fileName);
    }catch(e){
        console.log("Error Found: ",e);
        const obj = {
            method : "findFile",
            fileName : body.filename
        }
        await publishMessage(JSON.stringify(obj))

    }
  res.status(201).send('success');
});
// app.post('/findFile', async (req, res) => {
//     const body = req.body;
//     console.log( body.fileName);
//     try{

//         const obj = {
//             method : "findFile",
//             fileName : body.fileName
//         }
//         console.log(obj);
//         console.log(JSON.stringify(obj));
//         await publishMessage(JSON.stringify(obj))

//     }catch(e){
//         console.log("Error Found: ",e);
//         const obj = {
//             method : "findFile",
//             fileName : body.filename
//         }
       
//         await publishMessage(JSON.stringify(obj))

//     }
//   res.status(201).send('success');
// });




const port = 80;
app.listen(port, () => console.log('Running on port ', port));

