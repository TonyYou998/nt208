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
const getAllTag=async (req,res)=>{
    const tags=await Tag.findAll();
    if(tags)
        res.status(200).send(tags);
    else    
        res.status(400).send({message:"tag is empty"});

}

module.exports={addTag,getAllTag}