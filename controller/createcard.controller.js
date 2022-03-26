const { createcard } = require("../models");
const { LikeCard } = require("../models");
const { CommentCard } = require("../models");
const { User } = require("../models");
const URL = "https://nt118.herokuapp.com/";

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
const putCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await createcard.findOne({
      where: {
        id,
      },
    });
    if (req.user.id === card.idUser) {
      const { dataMT, dataMS, status, name } = req.body;

      if (card) {
        card.dataMT = dataMT;
        card.dataMS = dataMS;
        card.status = status;
        card.name = name;
        await card.save();
        res.status(200).send({ card, mess: "Thành công" });
      } else res.status(404).send({ mess: "Thất bại" });
    } else res.status(404).send({ mess: "Không có quyền truy cập" });
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
const getCardIdCheckLike = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const data = await LikeCard.findOne({
      where: {
        idUserLike: user,
        idCardLike: id,
      },
    });

    if (!data) {
      res.status(200).send({ isLike: false });
    } else {
      res.status(200).send({ isLike: true });
    }
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getCardIdLike = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;
    const data = await LikeCard.findOne({
      where: {
        idUserLike: user,
        idCardLike: id,
      },
    });

    if (!data) {
      const getUser = await User.findOne({
        where: {
          id: user,
        },
      });
      const create = await LikeCard.create({
        idUserLike: user,
        idCardLike: id,
        nameUserComment: getUser.firstName + " " + getUser.lastName,
      });
      const datas = await LikeCard.findAll({
        where: {
          idCardLike: id,
        },
      });
      if (create)
        res.status(200).send({ datas, mess: "Thành công", isLike: true });
    } else {
      LikeCard.destroy({
        where: { id: data.id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Tutorial was deleted successfully!",
              isLike: false,
            });
          } else {
            res.send({
              message: `Cannot delete Tutorial with id=${data.id}. Maybe Tutorial was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete Tutorial with id=" + data.id,
          });
        });
    }
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getCardIdComment = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const { content } = req.body;
    const getUser = await User.findOne({
      where: {
        id: user,
      },
    });
    const create = await CommentCard.create({
      idUserComment: user,
      idCardComment: id,
      content,
      nameUserComment: getUser.firstName + " " + getUser.lastName,
    });

    if (create) {
      const datas = await CommentCard.findAll({
        where: {
          idCardComment: id,
        },
      });
      res.status(200).send({ datas, mess: "Thành công" });
    }
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getCardIdCommentDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const { idComment } = req.body;
    CommentCard.destroy({
      where: { id },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).send({ mess: "Thành công" });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id,
        });
      });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};

const getcard = async (req, res) => {
  const data = await createcard.findAll({
    where: {
      status: 1,
    },
  });
  // console.log(data);
  if (data) res.status(200).send({ data, mess: "Thành công" });
};
const getcardId = async (req, res) => {
  const { id } = req.params;
  const data = await createcard.findAll({
    where: {
      id,
    },
  });
  const like = await LikeCard.findAll({
    where: {
      idCardLike: id,
    },
  });
  const comment = await CommentCard.findAll({
    where: {
      idCardComment: id,
    },
  });
  if (data) res.status(200).send({ data, like, comment, mess: "Thành công" });
};
module.exports = {
  postCard,
  getCardMyList,
  getCardMyId,
  getcard,
  getcardId,
  putCard,
  getCardIdLike,
  getCardIdComment,
  getCardIdCommentDelete,
  getCardIdCheckLike,
};
