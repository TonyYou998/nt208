const express=require('express');
const { uploadImageDemo } = require('../controller/imageController');
const { authenticate } = require('../middlewares/auth/authenticate');
const { uploadImage } = require('../middlewares/upload/upload-image');
const imageRouter=express.Router();
imageRouter.post("/",authenticate,uploadImage("image_demo"),uploadImageDemo);
module.exports={
    imageRouter,
}