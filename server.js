const express=require('express');
const { rootRouter } = require('./routers/rootRouter');
const {sequelize}=require("./models");
const app=express();
const path=require('path');
const publicPathDirectory=path.join(__dirname,"./public");
app.use(express.json());

app.use("/public",express.static(publicPathDirectory));
app.use((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods','POST,PUT,GET,DELETE');
        res.setHeader('Access-Control-Allow-Headers','*');
        next();
    })
app.use("/api/v1", rootRouter);

app.listen(3000,async ()=>{
    console.log("server is running on port 3000");

    try {
            await sequelize.authenticate();
            console.log("success connect to dbs");
    } catch (error) {
            console.log("can't connect to dbs");
            console.log(error);
    }
})