import OrderDetail from "../models/orderDetail";
import Product from '../models/product';

export const create = async (req, res) => {
  try {
    const orderdetails = await new OrderDetail(req.body).save();
    const { color, productId, quantity, size } = req.body
    const product = await Product.findById(productId._id);
    if (product) {
      const newColors = product.colors.map((iColor) => {
        if (iColor._id.toHexString() === color._id) {
          return { ...iColor.toObject(), sizes: iColor.sizes.map((iSize) => {
              if (iSize._id.toHexString() === size._id) {
                return { ...iSize.toObject(), amount: iSize.amount - quantity }
              }
              return iSize
            })
          }
        }
        return iColor
      })
      product.colors = newColors
      await product.save()
    }
    res.json(orderdetails);
  } catch (error) {
    res.status(400).json({
      message: "không thêm được dữ liệu",
    });
  }
};
export const list = async (req, res) => {
  try {
    const orderdetails = await OrderDetail.find().populate("orderId").populate("productId");
    res.json(orderdetails);
  } catch (error) {
    res.status(400).json({
      message: "không hiển thị được dữ liệu",
    });
  }
};
export const read = async (req, res) => {
  try {
    const orderdetails = await OrderDetail.findById(req.params.id);
    res.json(orderdetails);
  } catch (error) {
    res.status(400).json({
      message: "không hiển thị được dữ liệu",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const orderdetails = await OrderDetail.findOneAndDelete({ _id: req.params.id });
    res.json(orderdetails);
  } catch (error) {
    res.status(400).json({
      message: "Không xóa được dữ liệu",
    });
  }
};
export const update = async (req, res) => {
  try {
    const orderdetails = await OrderDetail.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
    res.json(orderdetails);
  } catch (error) {
    res.status(400).json({
      message: "không cập nhật được ",
    });
  }
};
