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
    const size = await Size.findOne({ _id: req.params.id }).exec();
    res.json(size);
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

export const update = async (request, response) => {
  try {
    const size = await Size.findOneAndUpdate({ _id: request.params.id },request.body,{ new: true }).exec();
    response.json(size);
  } catch (error) {
    response.status(400).json({ message: 'Không sửa được data' });
  }
};
 