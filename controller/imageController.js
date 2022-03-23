const {Image} = require("../models");


const uploadImageDemo=async (req,res)=>{
    const {file}=req;
    const urlImage=`  https://nt118.herokuapp.com/${file.path}`;

    const image=await Image.create({
        link:urlImage,
    });

    res.send(image);
}
module.exports={
    uploadImageDemo,
}