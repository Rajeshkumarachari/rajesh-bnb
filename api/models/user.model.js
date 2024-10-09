import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require,
      unique: true,
    },
    email: {
      type: String,
      require,
      unique: true,
    },
    password: { type: String, require },
  },
  { timestamps: true }
);
const User = mongoose("User", userSchema);

export default User;
