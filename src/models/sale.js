import mongoose, { Schema, ObjectId } from "mongoose";
const ProductSchema = new Schema(
  {
    code: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    percent: {
      type: Number,
      require: true,
    }, 
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

export default mongoose.model("Sale", ProductSchema);
