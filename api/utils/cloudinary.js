require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const uploadImages = async (images) => {
  const imageUrls = await Promise.all(
    images.map((image) => uploadImage(image))
  );
  return imageUrls;
};

const uploadImage = async (image) => {
  image = `data:text/jbj;base64,${image}`;
  const result = await cloudinary.uploader.upload(image);
  return result.secure_url;
};

module.exports = uploadImages;
