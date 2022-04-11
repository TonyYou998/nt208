const{CartProduct,Cart} =require('../models');
const addToCart=async (req,res)=>{
    const{userId,idProduct}=req.body;

    try {
    //    checkProduct(idProduct);
        const cart=await CartProduct.findOne({
            where:{
                idUser:userId,
            }
        });
        console.log(cart.id);
        const newProduct=await CartProduct.create({
            idCart:cart.id,
            idProduct,
            amount:1,
    
        });
        res.status(200).send({message:"add to cart success"});
    
    } catch (error) {
        console.log(error);
    }
   



}
// const checkProduct=async (id)=>{
//     const product=await CartProduct.findOne({
//         where:{
//             idProduct:id,
//         }
//     });
//     console.log(product.idProduct);


// }
module.exports={
    addToCart,
}