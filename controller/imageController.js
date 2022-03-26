const { Image } = require("../models");
const URL = "http://192.168.2.186:3000/";

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
