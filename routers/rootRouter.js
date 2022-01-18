const express=require('express');
const { demoRouter } = require('./demoRouter');
const rootRouter=express.Router();


rootRouter.use(demoRouter);


module.exports={
    rootRouter,

}