const {User}=require('../../models');
const checkExistEmail=async (req,res,next)=>{

    const {email}=req.body;
    const user=await User.findOne({
        where:{
            email,
        }
    });
    
    if(user){
        res.status(500).send({message:"This email has been used"});
    }
    else
        next();

}
module.exports={
    checkExistEmail,
}