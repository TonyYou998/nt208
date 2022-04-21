const express=require('express');
const { addTag, getAllTag } = require('../controller/tagController');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');

const tagRouter=express.Router();
tagRouter.post("/",authenticate,authorize(["Client"]),addTag);
tagRouter.get("/",authenticate,authorize(["Client"]),getAllTag);


module.exports={
    tagRouter,
    
}