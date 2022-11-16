import mongoose, { Schema, ObjectId } from "mongoose";
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Color", ProductSchema);
