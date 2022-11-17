import mongoose, { Schema, ObjectId } from "mongoose";
const ProductSchema = new Schema(
  {
    prd_id: {
      type: mongoose.ObjectId,
      ref: "Product",
    },
    size_id: {
      type: mongoose.ObjectId,
      ref: "Size",
    },
    color: {
      type: mongoose.ObjectId,
      ref: "Color",
    },
    amount: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ProductAmout", ProductSchema);
