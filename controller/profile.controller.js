const { Profile } = require("../models");
const { sltruycap } = require("../models");

const postProfile = async (req, res) => {
  try {
    const {
      name,
      slug,
      idTemplate,
      avatarPublic,
      description,
      up,
      center,
      down,
      graphics,
      status,
    } = req.body;
    const idUser = req.user.id;
    const profile = await Profile.create({
      name,
      slug,
      idUser,
      idTemplate,
      avatarPublic,
      description,
      up,
      center,
      down,
      graphics,
      status,
    });
    if (profile) res.status(200).send({ profile, mess: "Thành công" });
    else res.status(500).send({ mess: "Thất bại" });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await Profile.findAll({
      where: {
        idUser: user,
      },
    });
    if (data) res.status(200).send({ data, mess: "Thành công" });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const getProfilePublic = async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await Profile.findOne({
      where: {
        slug: slug,
      },
    });
    if (data && data.status) {
      const count = await sltruycap.findOne({
        idProfile: data.id,
      });
      if (count) {
        count.sl++;
        const { name } = req.body;
        if (name) count.user += "," + name;
        count.save();
      } else {
        let sltruy = {
          idProfile: data.id,
          sl: 1,
          user: "",
        };
        const { name } = req.body;
        if (name) sltruy.user += name;
        await sltruycap.create({
          idProfile: sltruy.idProfile,
          sl: sltruy.sl,
          user: sltruy.user,
        });
      }
      res.status(200).send({ data, mess: "Thành công" });
    }
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};
const putProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({
      where: {
        id,
      },
    });
    if (req.user.id === profile.idUser) {
      const {
        name,
        slug,
        idTemplate,
        avatarPublic,
        description,
        up,
        center,
        down,
        graphics,
        status,
      } = req.body;

      if (profile) {
        profile.name = name;
        profile.slug = slug;
        profile.idTemplate = idTemplate;
        profile.avatarPublic = avatarPublic;
        profile.description = description;
        profile.up = up;
        profile.center = center;
        profile.down = down;
        profile.graphics = graphics;
        profile.status = status;
        await profile.save();
        res.status(200).send({ profile, mess: "Thành công" });
      } else res.status(404).send({ mess: "Thất bại" });
    } else res.status(404).send({ mess: "Không có quyền truy cập" });
  } catch (error) {
    res.status(500).send({ error, mess: "Thất bại" });
  }
};

module.exports = {
  postProfile,
  putProfile,
  getProfile,
  getProfilePublic,
};
