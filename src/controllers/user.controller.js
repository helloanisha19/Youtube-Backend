import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";

const registerUser = asyncHandler(async (req, res) => {
  // take entries from frontend
  //validate them
  //check for existing user
  //url check for avtar nd coverImage(optional) and upload on cloudinary
  //user create , insert entry in db
  //check for user creation ?
  // before returnign remove password nd refreshtoken
  // return response if created else return error.

  const { userName, email, fullName, password } = req.body;

  console.log(req.body);

  if (userName === "" || email === "" || fullName === "" || password === "")
    throw new apiError(400, "All fields are required");

  const emailexists = await User.findOne({ email });
  if (emailexists) throw new apiError(409, "This email is already in use");

  const userexists = await User.findOne({ userName });

  if (userexists) throw new apiError(409, " Username already taken");

  const avatarLocalPath = req.files?.avatar[0]?.path;

  console.log(req.files);

  if (!avatarLocalPath) throw new apiError(409, "Avatar is required");

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) throw new apiError(409, "Avatar is required");

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  let coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user = await User.create({
    userName,
    email,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log(createdUser);

  if (!createdUser)
    throw new apiError(
      500,
      "There is some server side error , Please try again later"
    );

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "Registration Successfull"));
});

export { registerUser };
