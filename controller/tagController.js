const {Tag}=require("../models");
const addTag= async(req,res)=>{
    const {name,description}=req.body;


    const newTag=await Tag.create({
        name,
        description,
    })
    if(newTag){
        res.status(201).send({message:"create success"});
    }
    else{
        res.status(500).send({
            message:"failed",
        });
        
    }

}

module.exports={addTag,}