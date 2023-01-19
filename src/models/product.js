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
      type: ObjectId,
      ref: "Cateproduct",
    },
    sliderId: {
      type: ObjectId,
      ref: "Slider",
    },
    content: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
    },
    subImage : {
      type : Array
    },
    colors: [{
      colorName: {
        type: String,
        required: true,
      },
      sizes: [{
        sizeName: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true
        }
      }]
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
);

export default mongoose.model("Product", ProductSchema);
