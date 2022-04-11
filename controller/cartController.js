const{CartProduct} =require('../models');
const addToCart=async (req,res)=>{
    const{userId,idProduct}=req.body;

    try {
    //    checkProduct(idProduct);

        const newProduct=await CartProduct.create({
            idCart:userId,
            idProduct,
            amount:1,
    
        });
        res.status(200).send(newProduct);
    
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