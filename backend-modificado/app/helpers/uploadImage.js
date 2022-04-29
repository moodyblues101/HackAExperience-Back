"use strict";

const randomstring = require("randomstring");
const path = require("path");
const sharp = require("sharp");
const { ensureDir } = require("fs-extra");

async function uploadImage(imageExperience) {
  const { imageData, destination, width, height } = imageExperience;
  const uploadDirectory = path.join(__dirname, "../../public", destination);

  await ensureDir(uploadDirectory);
  const image = sharp(imageData);
  const randomName = randomstring.generate(10) + ".png";

  await image
    .resize(width, height)
    .toFormat("png")
    .composite([
      {
        input: path.join(__dirname, "../resources/hackaboss.png"),
        gravity: "southeast",
      },
    ])
    .toFile(path.join(uploadDirectory, randomName));

  return randomName;
}

module.exports = uploadImage;
