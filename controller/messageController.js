
const {Contact,User}=require("../models");
const {Op}=require('sequelize');
const createRoom=async (req,res)=>{
    const {user1Id,user2Id}=req.body;


    const newContact=await Contact.create({
        user1Id,
        user2Id,
    });

    if(newContact){
        res.status(201).send("success");
    }
    else{
        res.status(500).send({message:"cannot create contact"});
    }


}
const getAllUserContact= async(req,res)=>{
    const {id}=req.params;
    console.log(`day la id=${id}`);

    const listContact=await Contact.findAll({
        where:{
            [Op.or]:[{user1Id:id},{user2Id:id}]
        },
        include:[{
            model:User,
            as:"user2",
            attributes:[
                "id",
                "username",
            ]
        },
    {
        model:User,
        as:"user1",
        attributes:[
            "id",
            "username",
        ]
    }]
    });
  console.log(listContact);
    if(listContact){

        res.status(200).send(listContact);
    }
    else{res.status(404).send({message:"not found any contact"});}


}
module.exports={
    createRoom,
    getAllUserContact,
}