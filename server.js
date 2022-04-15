const express = require("express");
const { rootRouter } = require("./routers/rootRouter");
const { sequelize } = require("./models");
const app = express();
const app_chat=express();
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const http=require('http');
const server_chat=http.createServer(app_chat);
const socketio=require('socket.io');
const io=socketio(server_chat);
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

io.on("connection",(socket)=>{
  console.log("co khach den :))");

})


let port= process.env.PORT;
let chat_port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}
if(chat_port==null|| chat_port==""){
  chat_port=3001;
}
app.listen(port, async () => {
  console.log("server is running on port 3000");



  try {
    await sequelize.authenticate();
    console.log("success connect to dbs");
  } catch (error) {
    console.log("can't connect to dbs");
    console.log(error);
  }
});
server_chat.listen(chat_port,()=>{
  console.log("chat server is running on port 3001");
});
