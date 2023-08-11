const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./data/dummy_data');
const { param } = require('express/lib/request');
const connectDB = require('./config/db')

const app = express();

dotenv.config();

connectDB()


app.get('/', (req, res) => {
  res.send('Home API is Running successfully ');
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
  });
  


  app.get('/api/chat/:id', (req, res) => {

    const singlechat = chats.find((c)=>c._id === req.params.id)
    //console.log(singlechat);
    res.send(singlechat);
    
  });


const port = process.env.PORT || 5000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});