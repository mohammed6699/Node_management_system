import { Schema, model } from "mongoose";
import { isEmail, isStrongPassword } from "validator";
import { hashSync } from "bcryptjs";
import { ADMIN, USER } from "../utils/UeerRole";

const UserModel = new Schema(
  {
    UserName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    FirstName: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    LastName: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
      unique: true,
      validate: [isStrongPassword, "weak password"],
    },
    role: {
      type: String,
      enum: [ADMIN, USER],
      default: USER,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
// hash the password
UserModel.pre("save", function () {
  const hash = hashSync(this.password, 8);
  this.password = hash;
});
export default model("User", UserModel);
