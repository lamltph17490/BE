import ProductSale from "../models/sale";
export const create = async (req, res) => {
  try {
    const sale = await new ProductSale(req.body).save();
    res.json(sale);
  } catch (error) {
    res.status(400).json({
      message: "khong them duoc du lieu",
    });
  }
};
export const list = async (req, res) => {
  try {
    const sale = await ProductSale.find();
    res.json(sale);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const read = async (req, res) => {
  try {
    const sale = await ProductSale.findOne({ _id: req.params.id }).exec();
    res.json(sale);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const sale = await ProductSale.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(sale);
  } catch (error) {
    res.status(400).json({
      message: "khong xoa",
    });
  }
};
export const update = async (request, response) => {
  try {
    const sale = await ProductSale.findOneAndUpdate({ _id: request.params.id },request.body,{ new: true }).exec();
    response.json(sale);
  } catch (error) {
    response.status(400).json({ message: 'Không sửa được data' });
  }
};
// edit?