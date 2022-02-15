const jwt=require('jsonwebtoken');
const authenticate=(req,res,next)=>{
    try {
        const token=req.header("token");
        const decode=jwt.verify(token,"tanvuu998");
        if (decode){
            req.user=decode;
            
            next();
        }
        else{
            res.status(401).send({
                message:"not login",
            })
        }      
    } catch (error) {
        res.status(401).send(error);
    }
  

}
module.exports={
    authenticate,
}