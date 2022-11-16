import mongoose, { Schema, ObjectId } from "mongoose";
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
    },
    image: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    categoryId: {
      type: [ObjectId],
      ref: "Cateproduct",
    },
    sliderId: {
      type: ObjectId,
      ref: "Slider",
    },

    slug: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", ProductSchema);
