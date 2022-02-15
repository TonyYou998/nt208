const express=require('express');
const { addTag } = require('../controller/tagController');

const tagRouter=express.Router();
tagRouter.post("/",addTag)


module.exports={
    tagRouter
}