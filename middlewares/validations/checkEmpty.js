const checkEmptyRegister=(req,res,next)=>{
    const {email,password,firstName,lastName}=req.body;

    if(email==="")
        res.status(500).send({message:"email must not empty"});
    else if(password==="")
    res.status(500).send({message:"password must not empty"});
    else if(firstName===""){
        res.status(500).send({message:"first name must not empty"});
        console.log("run");
    }
  
    else if(lastName==="")
    res.status(500).send({message:"last name must not empty"});
    else
        next();
}
const checkEmptyLogin=(req,res,next)=>{
    const {email,password}=req.body;
    if(email !=="" && password!=="")
        next();
    else
        res.status(500).send({
            message:"email or password must not be empty",
        })

}
module.exports={
    checkEmptyRegister,
    checkEmptyLogin,
}