const express = require('express')
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('',  (req, res) => {
  res.status(201).send('success');
});


const port = 80;
app.listen(port, () => console.log('Running on port ', port));

