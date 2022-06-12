const express=require("express");
const app=express();

const config = require("./config");

const client=require("twilio")(config.accountSID,config.authToken);
app.get('/login', (req,res) => {
    if (req.query.phonenumber) {
       client
       .verify
       .services(config.serviceID)
       .verifications
       .create({
           to: `+84${req.query.phonenumber}`,
           channel: req.query.channel==='call' ? 'call' : 'sms' 
       })
       .then(data => {
           res.status(200).send({
               message: "Verification is sent!!",
               phonenumber: req.query.phonenumber,
               data
           })
       }) 
    } else {
       res.status(400).send({
           message: "Wrong phone number :(",
           phonenumber: req.query.phonenumber,
           data
       })
    }
});
app.get("/verify",(req,res)=>{
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to:`+84${req.query.phonenumber}`,
            code:req.query.code,
        })
        .then((data)=>{
            res.status(201).send(data);


        })
        .catch((err)=>{
            res.status(500).send(err);

        })

})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});