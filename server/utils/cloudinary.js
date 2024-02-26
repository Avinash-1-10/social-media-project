// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
import cloudinary from "cloudinary"
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return null;
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      console.log("File is uploaded on Cloudinary", response.url);
      // Optionally, you can remove the local file after uploading to Cloudinary
      fs.unlinkSync(localFilePath);
      return response;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      fs.unlinkSync(localFilePath);
      return null;
    }
  };
  
export { uploadOnCloudinary };
