import mongoose, { Schema, ObjectId } from "mongoose";
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
    },
    prd_id: {
      type: ObjectId,
      ref: "Product",
    },
    size_id: {
      type: ObjectId,
      ref: "Size",
    },
    color: {
      type: ObjectId,
      ref: "Color",
    },
    amount: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ProductAmout", ProductSchema);
