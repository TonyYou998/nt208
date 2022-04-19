const express = require("express");
const { rootRouter } = require("./routers/rootRouter");
const { sequelize } = require("./models");
const app = express();
// const app_chat=express();
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const http=require('http');
// https = require('https');
const server=http.createServer(app);
const socketio=require('socket.io');
const { join } = require("path");
const io=socketio(server);
const publicPathDirectory = path.join(__dirname, "./public");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["./routers/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(express.json());

app.use("/public", express.static(publicPathDirectory));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,PUT,GET,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/v1", rootRouter);




let port= process.env.PORT;

if(port==null||port==""){
  port=3000;
}

server.listen(port, "0.0.0.0",async () => {
  console.log(`server is running on port ${port}`);
  


  try {
    await sequelize.authenticate();
    console.log("success connect to dbs");
  } catch (error) {
    console.log("can't connect to dbs");
    console.log(error);
  }
});
io.on("connection",(socket)=>{
  console.log("co khach den :))");
  socket.on("join_room",(roomId)=>{
    console.log("client join room");
    console.log(roomId);
    socket.emit("send hello to new client");
    socket.join(roomId);
  
    socket.on("send_message_to_server",(username,message)=>{
      console.log(username);
      console.log(message);
      io.to(roomId).emit("send_message_to_client",{
        message,
      
      username,
    });  
  
    });

  });
 
  

})
