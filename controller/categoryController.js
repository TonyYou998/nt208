const {Category}=require("../models");
const category = require("../models/category");
const addCategory=async (req,res)=>{
    const {name,image,description}=req.body;

   

    const newCategory=await Category.create({
        name,
        image,
        description,
        
    })
    if(category)
        res.status(201).send({
            message:"create success",
        })
    else
        res.status(500).send({message:"create failed"})



    

}


module.exports={addCategory,}