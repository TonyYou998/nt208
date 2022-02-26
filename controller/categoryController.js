const {Category}=require("../models");
const category = require("../models/category");
const addCategory=async (req,res)=>{
    const {name,image,description}=req.body;
    const newCategory=await Category.create({
        name,
        image,
        description,
        
    })
    if(newCategory)
        res.status(201).send({
            message:"create success",
        })
    else
        res.status(500).send({message:"create failed"})
}

const getAllCategory=async (req,res)=>{
    const categories=await Category.findAll();

    if(categories)
        res.status(200).send(categories);
    else
        res.status(500).send({message:"category is empty"});

}
module.exports={addCategory,
    getAllCategory,
}