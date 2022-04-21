const { Image } = require("../models");
const URL = "https://nt118.herokuapp.com/";

const uploadImageDemo = async (req, res) => {
  const { file } = req;
  const urlImage = URL + `${file.path}`;

  const image = await Image.create({
    link: urlImage,
  });

  res.send(image);
};
module.exports = {
  uploadImageDemo,
};
