const{CartProduct,Cart} =require('../models');
const addToCart=async (req,res)=>{
    const{userId,idProduct}=req.body;

    try {
        const amount= checkProduct(idProduct);
        
        const cart=await Cart.findOne({
            where:{
                idUser:userId,
            }
        });
        
        const newProduct=await CartProduct.create({
            idCart:cart.id,
            idProduct,
            amount,
    
        });
        res.status(200).send({message:"add to cart success"});
    
    } catch (error) {
        console.log(error);
    }
   



}
const checkProduct=async (id)=>{
    const product=await CartProduct.findOne({
        where:{
            idProduct:id,
        }
    });
   if(product){
      return product.amount++;
       
   }
   return 1;


}
module.exports={
    addToCart,
}