const express=require('express');
const { addCategory } = require('../controller/categoryController');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');

const categoryRouter=express.Router();

categoryRouter.post("/",authenticate,authorize(["Client"]),addCategory);



module.exports={
    categoryRouter,
}