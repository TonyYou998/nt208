const express=require('express');
const { register } = require('../controller/user.controller');
const { demoRouter } = require('./demoRouter');
const { profileRouter } = require('./profileRouter');
const { userRouter } = require('./userRouter');
const rootRouter=express.Router();


rootRouter.use("/demo",demoRouter);
rootRouter.use("/user",userRouter);
rootRouter.use("/profile", profileRouter);


module.exports={
    rootRouter,

}