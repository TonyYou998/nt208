const express=require('express');
const { register, login, activateAccount, getUserInformation, uploadUserAvatar, changeUserInformation, active2FA, verifyCode } = require('../controller/user.controller');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const { uploadImage } = require('../middlewares/upload/upload-image');
const { checkEmptyRegister, checkEmptyLogin } = require('../middlewares/validations/checkEmpty');
const { checkExistEmail } = require('../middlewares/validations/checkExist');
const userRouter=express.Router();
userRouter.post("/register",checkEmptyRegister,checkExistEmail,register);

userRouter.get("/otp",authenticate,active2FA);
userRouter.post("/login",checkEmptyLogin,login);
userRouter.get("/confirmation/:token",activateAccount);
userRouter.get("/:id",getUserInformation);
userRouter.post("/upload-avatar",authenticate,uploadImage("avatar"),uploadUserAvatar);
userRouter.post("/update",authenticate,changeUserInformation);
userRouter.post("/verify",verifyCode);

module.exports={
    userRouter,
}
