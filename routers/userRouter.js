const express=require('express');
const { register, login, activateAccount } = require('../controller/user.controller');
const { authorize } = require('../middlewares/auth/authorize');
const { checkEmptyRegister, checkEmptyLogin } = require('../middlewares/validations/checkEmpty');
const { checkExistEmail } = require('../middlewares/validations/checkExist');
const userRouter=express.Router();
userRouter.post("/register",checkEmptyRegister,checkExistEmail,register);


userRouter.post("/login",checkEmptyLogin,login);
userRouter.get("/confirmation/:token",activateAccount);

module.exports={
    userRouter,
}
