const{CartProduct,Cart,Product} =require('../models');
const addToCart=async (req,res)=>{
    const{userId,idProduct}=req.body;

    try {
       
     
        const cart=await Cart.findOne({
            where:{
                idUser:userId,
            }
        });
        let amount=await productAmount(idProduct,cart.id);
        
        if(amount===-1){
            const newProduct=await CartProduct.create({
                idCart:cart.id,
                idProduct,
                amount:1,
        
            });
        }
        else{
            amount++;
            const updateProduct=await CartProduct.update({
                    amount,
            },{
                    where:{
                        idProduct,
                        idCart:cart.id,
                    }
            })
        }
       
        res.status(200).send({message:"add to cart success"});
    
    } catch (error) {
        console.log(error);
    }
   



}
const getCart= async(req,res)=>{
    const {userId}=req.params;
    console.log("userId:",userId);
    console.log(typeof(userId));
    const cart=await Cart.findOne({
        where:{
            idUser:userId,
        }
    });
    try {
        const products=await CartProduct.findAll({
            where:{
                idCart:cart.id,
            },
            include:[
                {
                    model:Product,
                    as:"product",
                    attributes:["id","name","image"],

                }
            ]
        });
        res.status(200).send(products);

    } catch (error) {
        res.status(404).send({message:"empty"});
        console.log(error);
    }
    


}

const productAmount=async (id,idCart)=>{
    
    const product=await CartProduct.findOne({
        where:{
            idProduct:id,
            idCart,
        
        }
    });
  
   if(product)
    return product.amount
   return -1;


}
module.exports={
    addToCart,
    getCart,
}