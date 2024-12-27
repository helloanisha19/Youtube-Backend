import { v2 as cloudinary } from "cloudinary";
import fs from " fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const upload = async (Path) => {
  try {
    if (!Path) return null;
    const result = await cloudinary.uploader.upload(Path, {
      resource_type: auto,
    });

    console.log(result);
    fs.unlinkSync(Path);
    return result;
  } catch (error) {
    fs.unlinkSync(Path);
    console.log("upload on cloudinery failed", error.message);
    return null;
  }
};

export { upload };
