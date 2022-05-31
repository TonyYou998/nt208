const { param } = require("express/lib/request");
const {Contact}=require("../models");
const createRoom=async (req,res)=>{
    const {user1Id,user2Id}=req.body;

    if(contactIsExist){
        res.status(204).send({message:"room is existed"});
    }
       
    const newContact=await Contact.create({
        user1Id,
        user2Id,
    });



    if(newContact){
        res.status(201).send(newContact);
    }
    else{
        res.status(500).send({message:"cannot create contact"});
    }


}
const contactIsExist=(userId1,userId2)=>{
    const contact=Contact.findAll({
        where:{
            userId1,
            userId2,
        }
    });
    if(contact)
        return true;
    return false;


}
const getAllUserContact= async(req,res)=>{
    const {id}=req.params;
    console.log(`day la id=${id}`);

    const listContact=await Contact.findAll({
        where:{
            user1Id:id,
        }
    });
    if(listContact){
        res.status(200).send(listContact);
    }
    else{res.status(404).send({message:"not found any contact"});}


}
module.exports={
    createRoom,
    getAllUserContact,
}