const express=require('express');
const { register } = require('../controller/user.controller');
const { demoRouter } = require('./demoRouter');
const { userRouter } = require('./userRouter');
const rootRouter=express.Router();


rootRouter.use("/demo",demoRouter);
rootRouter.use("/user",userRouter);


module.exports={
    rootRouter,

}