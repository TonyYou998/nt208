const express=require('express');
const { addCategory, getAllCategory } = require('../controller/categoryController');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');

const categoryRouter=express.Router();

categoryRouter.post("/",authenticate,authorize(["Client"]),addCategory);
categoryRouter.get("/",authenticate,authorize(["Client"]),getAllCategory);



module.exports={
    categoryRouter,
}