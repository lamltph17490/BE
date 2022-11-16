import mongoose, { Schema, ObjectId } from "mongoose";
const ProductSizeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Size", ProductSizeSchema);
