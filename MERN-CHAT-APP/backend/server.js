const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./data/dummy_data');
const { param } = require('express/lib/request');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');


const app = express();
dotenv.config();
connectDB()
app.use(express.json());  // to accespt JSON data


app.get('/', (req, res) => {
  res.send('Home API is Running successfully ');
});


app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000



const server = app.listen(port, () => { console.log(`Example app listening on port ${port}`);});


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});



io.on("connection", (socket) => {
  console.log("Connected to socket.io");

socket.on("setup", (userData) => {

        //creating a new room with the ID of the userData
        // Room will be unique for that user only 
            socket.join(userData._id);
            // console.log(userData._id);
            socket.emit("connected");
          });
        
          // When we click on any of the chat bellow code( L 61 – L 65 )
          //  should create a room with that particular user and when other
          //   user joins It will that to this particular room 

          socket.on("join chat", (room) => {
            socket.join(room);
            console.log("User Joined Room: " + room);
          });


          socket.on("new message", (newMessageRecieved) => {
            
              var chat = newMessageRecieved.chat;

              if (!chat.users) return console.log("chat.users not defined");

              chat.users.forEach((user) => {
                if (user._id == newMessageRecieved.sender._id) return;
          
                socket.in(user._id).emit("message recieved", newMessageRecieved);

              });

          });


          socket.off("setup", () => {
            console.log("USER DISCONNECTED");
            socket.leave(userData._id);

          });
 
  });


 





