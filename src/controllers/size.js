import Size from "../models/Size";
export const create = async (req, res) => {
  try {
    const sizename = await new Size(req.body).save();
    console.log(sizename);
    res.json(sizename);
  } catch (error) {
    res.status(400).json({
      message: "khong them duoc du lieu",
    });
  }
};
export const list = async (req, res) => {
  try {
    const getSize = await Size.find();
    res.json(getSize);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const read = async (req, res) => {
  try {
    const Size = await Size.findOne({ _id: req.params.id }).exec();
    res.json(Size);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const removeSize = await Size.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(removeSize);
  } catch (error) {
    res.status(400).json({
      message: "khong xoa",
    });
  }
};

/// chưa có update vào xem các file đã có thêm vào 
 