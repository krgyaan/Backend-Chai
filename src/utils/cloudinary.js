import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFile) => {
    try {
        if (!localFile) return null;
        // Upload image to cloudinary
        const response = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto",
        });
        // If file is uploaded successfully
        console.log("File uploaded successfully", response.url);
        return response;
    } catch (error) {
        // If file upload failed, remove locally saved file
        fs.unlinkSync(localFile);
        console.error("Error uploading file to cloudinary", error);
        return null;
    }
}

export { uploadOnCloudinary };