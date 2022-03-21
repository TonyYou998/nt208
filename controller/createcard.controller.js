const { createcard } = require("../models");

const req = require("express/lib/request");
const res = require("express/lib/response");

const postCard = async (req, res) => {
  try {
    const { dataMT, dataMS, status, name } = req.body;
    const idUser = req.user.id;
    const card = await createcard.create({
      idUser,
      viewer: 0,
      status,
      name,
      dataMT,
      dataMS,
    });
    if (card) res.status(200).send({ card, mess: "Thành công" });
    else res.status(500).send({ mess: "Thất bại" });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getCardMyList = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await createcard.findAll({
      where: {
        idUser: user,
      },
    });
    if (data) res.status(200).send({ data, mess: "Thành công" });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getCardMyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;
    const data = await createcard.findAll({
      where: {
        idUser: user,
        id,
      },
    });
    if (data) res.status(200).send({ data, mess: "Thành công" });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getcard = async (req, res) => {
  const data = await createcard.findAll({});
  if (data) res.status(200).send({ data, mess: "Thành công" });
};
const getcardId = async (req, res) => {
  const { id } = req.params;
  const data = await createcard.findAll({
    where: {
      id,
    },
  });
  if (data) res.status(200).send({ data, mess: "Thành công" });
};
module.exports = {
  postCard,
  getCardMyList,
  getCardMyId,
  getcard,
  getcardId,
};
