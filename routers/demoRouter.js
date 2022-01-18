const express=require('express');
const demoRouter=express.Router();
const {demoController}=require('../controller/demo.controller');
demoRouter.get("/",demoController);
module.exports={
    demoRouter,
}