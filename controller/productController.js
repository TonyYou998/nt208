const  {Product}=require("../models");
const addProduct=async (req,res)=>{
    const {name,categoryId,idTypes,description,price}=req.body;
    const a="http://localhost:3000/cards/truoc.png";
    const b="http://localhost:3000/cards/sau.png";
    const c="http://localhost:3000/cards/truoc_1.png";
    const d="http://localhost:3000/cards/sau_1.png";
    const e="http://localhost:3000/cards/truoc_2.png";
    const f="http://localhost:3000/cards/sau_2.png";
    const g="http://localhost:3000/cards/truoc_3.png";
    const h="http://localhost:3000/cards/sau_3.png";
    // const image=`[{image:${a},imageSau:${b}},{image:${c},imageSau:${d}},{image:${e},imageSau:${f}},{image:${g},imageSau:${h}}]`;
    let image=
    {
        frontPic1:a,
        frontPic2:c,
        frontPic3:e,
        frontPic4:g,
        

    }
    let imageSau=
    {
        backPic1:b,
        backPic2:d,
        backPic3:f,
        backPic4:h,
        

    }
    image=JSON.stringify(image);
    imageSau=JSON.stringify(imageSau);
    console.log(image);
    try {
        const newProduct=await Product.create({
            name,
            categoryId,
            idTypes,
            description,
            price,
            rate:0,
            view:0,
            image,
            imageSau,
    
        });
    
   
    if(newProduct)
        res.status(201).send({
            message:"create success"
        });
   
    } catch (error) {
        console.log(error);     
        res.status(404).send({message:"create failed"});
    }
        


    

}
const getAllProducts=async (req,res)=>{

    const products=await Product.findAll({
        attributes:['id','name','image','idTypes','categoryId'],
    });
    if(products)
        res.status(200).send(products);
    else
        res.status(500).send({message:"empty"});

}
const getDetailProductById=async (req,res)=>{
    const {id}=req.params;
    
    try {
        const product=await Product.findOne({
            where:{
                id,
            }
        });
        ++product.view;
        product.save();
        if(product)
            res.status(200).send(product);
        else
        res.status(500).send({message:"item is not exist"});
    } catch (error) {
        console.log(err);
        
    }

}


module.exports={
    addProduct,
    getAllProducts,
    getDetailProductById,
}