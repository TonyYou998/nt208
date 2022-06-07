const { Product, Tag, Category,User } = require("../models");
const updateProductImage=async (req,res)=>{
  const {productId}=req.body;
  
  console.log(productId);
  const {file}=req;
  const URL = "http://localhost:3000/";
  try {
    const urlImage=URL+`${file.path}`;
    const productFound=await Product.findOne({
      where:{
        id:productId,
      }
    });
    console.log(productFound);
    if(productFound){
      productFound.image=urlImage;
      productFound.save();
      res.status(201).send(productFound);
    }
  
  } catch (error) {
    console.log(error);
    res.status(400).send({message:"loi"});
  }
 

}
const addProduct = async (req, res) => {
  const { name, categoryId, idTypes, description, price } = req.body;
  const a = "https://nt118.herokuapp.com/cards/truoc.png";
  const b = "https://nt118.herokuapp.com/cards/sau.png";
  const c = "https://nt118.herokuapp.com/cards/truoc_1.png";
  const d = "https://nt118.herokuapp.com/cards/sau_1.png";
  const e = "https://nt118.herokuapp.com/cards/truoc_2.png";
  const f = "https://nt118.herokuapp.com/cards/sau_2.png";
  const g = "https://nt118.herokuapp.com/cards/truoc_3.png";
  const h = "https://nt118.herokuapp.com/cards/sau_3.png";
  // const image=`[{image:${a},imageSau:${b}},{image:${c},imageSau:${d}},{image:${e},imageSau:${f}},{image:${g},imageSau:${h}}]`;
  let image = {
    frontPic1: a,
    frontPic2: c,
    frontPic3: e,
    frontPic4: g,
  };
  let imageSau = {
    backPic1: b,
    backPic2: d,
    backPic3: f,
    backPic4: h,
  };
  image = JSON.stringify(image);
  imageSau = JSON.stringify(imageSau);

  try {
    const newProduct = await Product.create({
      name,
      categoryId,
      idTypes,
      description,
      price,
      rate: 0,
      view: 0,
      image,
      imageSau,
    });

    if (newProduct)
      res.status(201).send({
        message: "create success",
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "create failed" });
  }
};
const getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    attributes: [
      "id",
      "name",
      "price",
      "image",
      "imageSau",
      "description",
      "rate",
    ],
    include: [
      {
        model: Tag,
        as: "tag",
        attributes: ["id", "name", "description"],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "image", "description"],
      },
    ],
  });
  if (products) res.status(200).send(products);
  else res.status(500).send({ message: "empty" });
};
const getDetailProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    ++product.view;
    product.save();
    if (product) res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "product not found" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getDetailProductById,
  updateProductImage,
};
