const express=require('express');
const { createRoom, getAllUserContact } = require('../controller/messageController');
const messageRouter=express.Router();


messageRouter.post("/create",createRoom);
messageRouter.get("/:id",getAllUserContact);

module.exports={
    messageRouter,
}