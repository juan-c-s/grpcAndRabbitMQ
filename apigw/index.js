const express = require('express')
const app = express();
const cors = require('cors');

const {listFiles,findFile} = require('./rpcClient/rpcClient.js')
const{publishMessage} = require('./momClient/producer.js')

app.use(express.json());
app.use(cors());

app.post('/listFiles', async (req, res) => {
  const body = req.body;
    try{
        listFiles(body.email);
    }catch(e){
       console.error(e)
    }
  res.status(201).send('success');
});

app.post('/findFile', async (req, res) => {
    const body = req.body;
    console.log(body.fileName);
    try{
        findFile(body.fileName, body.email);
    }catch(e){
        console.log(e)
    }
  res.status(201).send('success');
});



const port = 80;
app.listen(port, () => console.log('Running on port ', port));

