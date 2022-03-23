const { Ordercreatecard } = require("../models");
const postOrderCard = async (req, res) => {
  try {
    const { idCard, name, address } = req.body;
    const idUser = req.user.id;
    const card = await Ordercreatecard.create({
      idCard,
      name: name,
      address,
      idUser,
    });
    if (card) res.status(200).send({ card, mess: "Thành công" });
    else res.status(500).send({ mess: "Thất bại" });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getOrderCardList = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await Ordercreatecard.findAll({
      where: {
        idUser: user,
      },
    });
    if (data) res.status(200).send({ data, mess: "Thành công" });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
module.exports = {
  postOrderCard,
  getOrderCardList,
};
