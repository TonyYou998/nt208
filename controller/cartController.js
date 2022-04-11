const{CartProduct,Cart} =require('../models');
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
}