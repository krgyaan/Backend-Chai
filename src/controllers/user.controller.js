import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    // step 1: get user details from frontend
    // step 2: validation (not empty)
    // step 3: check if user already exists (udername, email)
    // step 4: check for image and avatar
    // step 5: upload them on cloudinary
    // step 6: create user object - create entry in db
    // step 7: remove password and refresh token field from the response
    // step 8: check if user is created
    // step 9: return response


    const { username, email, password } = req.body;

    if (
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Please fill in all fields");
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0].path;
    const coverLocalPath = req.files?.cover?.[0].path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Please provide avatar and cover images");
    }

    const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
    const coverUrl = await uploadOnCloudinary(coverLocalPath);

    if (!avatarUrl) {
        throw new ApiError(500, "Failed to upload avatar image");
    }

    const user = await User.create({
        fullName,
        username: username.lowercase(),
        email,
        password,
        avatar: avatarUrl.url,
        cover: coverUrl?.url || "",
    });

    const createdUser = User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, "User created", createdUser)
    );
})


export { registerUser }