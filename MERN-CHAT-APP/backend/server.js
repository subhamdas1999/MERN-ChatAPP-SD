const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./data/dummy_data');
const { param } = require('express/lib/request');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')

const app = express();

dotenv.config();

connectDB()

app.use(express.json());  // to accespt JSON data


app.get('/', (req, res) => {
  res.send('Home API is Running successfully ');
});



app.use('/api/user',userRoutes)

app.use('/api/chat',chatRoutes)



const port = process.env.PORT || 5000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});