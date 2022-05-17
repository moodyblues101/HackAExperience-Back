"use strict";

const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findUserById,
  uploadUserImage,
} = require("../../repositories/users-repository");
const { HTTP_SERVER, PATH_USER_IMAGE } = process.env;

const validExtensions = [".jpg", ".jpeg", ".png"];

async function uploadImageProfile(req, res) {
  try {
    const { id } = req.auth;
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No se ha seleccionado ningún fichero");
    }
    const { profileImage } = files;
    // console.log("profileImage", profileImage); //!delete
    const { name } = profileImage;
    const extension = path.extname(name);
    if (!validExtensions.includes(extension)) {
      throwJsonError(
        400,
        "Formato no válido, únicamente puede subir archivos con extensión .jpg, .jpeg o .png"
      );
    }
    const user = await findUserById(id);
    const { profilePic } = user;

    const pathProfileImage = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;

    if (profilePic) {
      fs.unlink(`${pathProfileImage}/${profilePic}`, () => {
        console.log("Imagen borrada correctamente");
      });
    }

    const randomName = randomstring.generate(10);
    const imageName = `${id}-${randomName}${extension}`;
    const pathImage = `${pathProfileImage}/${imageName}`;

    profileImage.mv(pathImage, async function (err) {
      if (err) throwJsonError(500, err.message);
      await uploadUserImage(id, imageName);

      res
        .status(201)
        .send({ url: `${HTTP_SERVER}/${PATH_USER_IMAGE}/${imageName}` });
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadImageProfile;
