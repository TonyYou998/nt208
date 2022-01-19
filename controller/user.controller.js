"use strict";
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar-url");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const avatarUrl = gravatar(email);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      avartar: avatarUrl,
    });
   
    const url= createVerifyUrl(email);
    sendEmail(email,url);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createVerifyUrl=(email)=>{
  const emailToken = jwt.sign(
    {
      email,
    },
    "tanvuu998",
    {
      expiresIn: 60 * 5,
    }
  );
  const url=`http://localhost:3000/api/v1/user/confirmation/${emailToken}`;
  return url;
}
const sendEmail= async(email,url)=>{
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tinpetofficial@outlook.com", // generated ethereal user
      pass:"39272762Bell", // generated ethereal password
    },
  });
  // console.log(url);
  let info = await transporter.sendMail({
    from: '"Tinpet" <tinpetofficial@outlook.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "url", // plain text body
    html: `Please click on this url to active your account <a href="${url}">${url}</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const isAuth = bcrypt.compareSync(password, user.password);

    if (isAuth) {
      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified,
          isOtp: user.isOtp,
          avartar: user.avartar,
        },
        "tanvuu998",
        {
          expiresIn: 60 * 60,
        }
      );
      res.status(200).send({ token });
    } else {
      res.status(500).send("wrong pass");
    }
  } else {
    res.status(500).send("email is invalid");
  }
};
const activateAccount=async (req,res)=>{
    const token=req.params.token;
    try {
      const decode=jwt.verify(token,"tanvuu998");
      console.log(decode.email);
      
      const user=await User.update({emailVerified:true},{
        where:{
          email:decode.email,
        }
  
      });
      if(user){
        res.status(200).send({message:"Active success"});
      }
      else{
        res.status(500).send("activate faied");
      }   
    } catch (error) {
      res.status(500).send({message:"Your token has been expired"});
    }
   

    
   


}

module.exports = {
  register,
  login,
  activateAccount
};
