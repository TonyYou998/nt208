"use strict";
const { User,Cart } = require("../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar-url");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const URL = "https://spacezuit.herokuapp.com/";
const config=require("../config/config.json");
const client=require("twilio")(config.sms.accountSID,config.sms.authToken);

const register = async (req, res) => {
  try {
    const { firstName, email, username, lastName, password,phone } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const avatarUrl = gravatar(email);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashPassword,
      avartar: avatarUrl,
      phone,
    });

    try {
      const newCart=await Cart.create({
        idUser:newUser.id,
      })
    } catch (error) {
      console.log(error);
    }
   
  

    const url = createVerifyUrl(email);
    sendEmail(email, url);
    res.status(201).send({ newUser, mess: "Thành công" });
  } catch (error) {
    console.log(error);

    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const createVerifyUrl = (email) => {
  console.log("create");
  const emailToken = jwt.sign(
    {
      email,
    },
    "tanvuu998",
    {
      expiresIn: 60 * 5,
    }
  );
  const url = `https://nt118.herokuapp.com/api/v1/user/confirmation/${emailToken}`;
  return url;
};
const sendEmail = async (email, url) => {
  console.log("send");
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "spacez_official@outlook.com", // generated ethereal user
      pass: "39272762Bell", // generated ethereal password
    },
  });
  // console.log(url);
  let info = await transporter.sendMail({
    from: '"SpaceZ" <spacez_official@outlook.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "url", // plain text body
    html: `Please click on this url to active your account <a href="${url}">${url}</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({
      where: {
        email,
      },
     
    });
   

    if (user) {
      const isAuth = bcrypt.compareSync(password, user.password);
      if(user.emailVerified!==true){
        return res.status(500).send({message:"email not verified"});

      }
     

      if (isAuth && user.isOtp===false) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            emailVerified: user.emailVerified,
            isOtp: user.isOtp,
            avartar: user.avartar,
            phone:user.phone,
          },
          "tanvuu998",
          {
            expiresIn: 60000000000 * 60000000000,
          }
        );
        res
          .status(200)
          .send({
            token,
            userId:user.id,
            mess: "Thành công",
            firstName: user.firstName,
            lastName: user.lastName,
            userName:user.username,
            email:user.email,
            

          });
      }
      else if(isAuth && user.isOtp===true){
        
        client
        .verify
        .services(config.sms.serviceID)
        .verifications
        .create({
          to:`+84${user.phone.slice(1,user.phone.length)}`,
          channel:"sms",
        })
        .then(data=>{
        
          res.status(200).send({
            mess:"Verification is sent!!",
            phone:user.phone,
            email:user.email,
            data
          });
        })
        .catch((err)=>{
          res.status(500).send(err);

        })
      }
       else {
        res.status(500).send({ mess: "wrong pass" });
      }
    } else {
      res.status(500).send({ mess: "User không tồn tại" });
    }
  } catch (error) {
    res.status(500).send({ mess: "User không tồn tại" });
  }
};
const activateAccount = async (req, res) => {
  const token = req.params.token;
  try {
    const decode = jwt.verify(token, "tanvuu998");
    console.log(decode.email);

    const user = await User.update(
      { emailVerified: true },
      {
        where: {
          email: decode.email,
        },
      }
    );
    if (user) {
      res.status(200).send({ message: "Active success" });
    } else {
      res.status(500).send("activate faied");
    }
  } catch (error) {
    res.status(500).send({ message: "Your token has been expired" });
  }
};
const getUserInformation=async (req,res)=>{
  const id=req.params.id;
 
  try {
    const userInfo=await User.findOne({
      where:{
        id,
      },
      attributes:["firstName","lastName","userName","email","isOtp","avartar","phone"]
    });
    if(userInfo){
      res.status(200).send(userInfo);
    }
  } catch (error) {
    res.status(404).send({message:"loi"});
  }
    
}
const uploadUserAvatar=async (req,res)=>{
  const {file}=req;
  const {user}=req;

 
  try {
    const urlImage=URL+`${file.path}`;
    const userFound=await User.findOne({
      where:{
        id:user.id,
      },
      attributes:["avartar","id"]
    });

    if(userFound){
      userFound.avartar=urlImage;
      userFound.save();
      res.status(201).send(userFound);
    }
  } catch (error) {
    res.status(404).send({message:"not found"});
  }
  


}
const changeUserInformation=async (req,res)=>{
  const {email,username,firstName,lastName,phone}=req.body;
  const {user}=req;
  try {
    const existUser=await User.findOne({
      where:{
          id:user.id,
  
      },
      attributes:["id","email","username","firstName","lastName","phone"]
    });
    existUser.email=email;
    existUser.username=username;
    existUser.firstName=firstName;
    existUser.lastName=lastName;
    existUser.phone=phone;
    existUser.save();
    res.status(201).send({message:"change success"});
  } catch (error) {
      res.status(404).send({message:error});
  }
  

  


}
const active2FA=async (req,res)=>{
  const {user}=req;
  try {
    const existUser=await User.findOne({
      where:{
        id:user.id,
      }
    });
    existUser.isOtp!==true?existUser.isOtp=true:existUser.isOtp=false;
    existUser.save();
    res.status(200).send(existUser);


  } catch (error) {
    console.log(error);
  }

}
const verifyCode=async (req,res)=>{
  const{otpCode,phone,email}=req.body;
  client
  .verify
  .services(config.sms.serviceID)
  .verificationChecks
  .create({
    to:`+84${phone.slice(1,phone.length)}`,
    code:otpCode,
  })
  .then(async (data)=>{
    const user=await User.findOne({
      where:{
        email,
      }
    });
    
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        emailVerified: user.emailVerified,
        isOtp: user.isOtp,
        avartar: user.avartar,
        phone:user.phone,
      },
      "tanvuu998",
      {
        expiresIn: 60000000000 * 60000000000,
      }
    );
    res.status(200).send({
      token,
      userId:user.id,
      mess: "Thành công",
      firstName: user.firstName,
      lastName: user.lastName,
      userName:user.username,
      email:user.email,
    });

  })
  .catch(err=>{
    res.status(500).send(err);
  });

}



module.exports = {
  register,
  login,
  activateAccount,
  getUserInformation,
  uploadUserAvatar,
  changeUserInformation,
  active2FA,
  verifyCode
};
