import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    roles: {
      user: {
        type: Number,
        default: 1001,
      },
      editor: Number,
      admin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
