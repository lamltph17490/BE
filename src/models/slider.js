import mongoose, { Schema } from "mongoose";
const SliderSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      minlength: 3,
    },
    url1: {
      type: String,
      require: true,
    },
    url2: {
      type: String,
      require: true,
    },
    url3: {
      type: String,
      require: true,
    },
    url4: {
      type: String,
    },
    url5: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Slider", SliderSchema);
