const authorize=(arrType)=>(req,res,next)=>{
    // console.log("run");
    const {user}=req;
    // console.log(user);
    if(arrType.findIndex((ele)=>ele===user.role)>-1){
        
        next();
    }
    else{
        res.status(403).send({message:"Forbident"});
    }

}

module.exports={
    authorize,
}