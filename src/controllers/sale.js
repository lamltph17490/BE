import moment from "moment/moment";
import Order from "../models/order";
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
    const sale = await ProductSale.findById(req.params.id).exec();
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


// use
export let useVoucher = async (req, res) => {
  const now = moment().unix()

  const { id } = req.params;
  const { code } = req.body;
  try {
    const order = await Order.findOne({ _id: id }).exec();
    const voucher = await ProductSale.findOne({ code }).exec();
    if (!voucher) {
      return res.status(400).json({
        message: "Voucher không hợp lệ.",
      });
    }
    const expire = moment(voucher.time)
    if (now > expire) {
      return res.status(400).json({
        message: "Voucher đã hết hạn sử dụng.",
      });
    }
    if (voucher.amount < 1) {
      return res.status(400).json({
        message: "Voucher đã hết lượt sử dụng.",
      });
    }
    if (order) {
      order.totalPrice = order.totalPrice - ( order.totalPrice / 100) * voucher.percent;
    }
    else {
      return res.status(400).json({
        message: "Đơn đặt hàng không tồn tại"
      })
    }
    return res.json(order);
  } catch (error) {
    return res.json(error.message);
  }
};