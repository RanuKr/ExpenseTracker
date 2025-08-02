// Models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,        // Add unique constraint for email
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
