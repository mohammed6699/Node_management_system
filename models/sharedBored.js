import { Schema, model } from "mongoose";
const sharedBoredModel = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  title: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  ],
});
