import slugify from "slugify";
import Product from "../models/product";
import Comment from "../models/comment";
import mongoose from "mongoose";

export const create = async (req, res) => {
  const slug = slugify(req.body.name, {
    lower: true,
    locale: "vi",
  });
  req.body.slug = slug;
  try {
    const products = await new Product(req.body).save();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "khong them duoc du lieu",
    });
  }
};
export const list = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).sort("-createdAt").populate("categoryId").populate('colors').exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const read = async (req, res) => {
  try {
    console.log('mongoose', req.params.id);
    const product = await Product.findOne({ _id: req.params.id, isDeleted: false }).exec();
    res.json(product);
  } catch (error) {
    console.log('error read', error);
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const products = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true }).exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "khong xoa",
    });
  }
};
export const update = async (req, res) => {
  const slug = slugify(req.body.name, {
    lower: true,
    locale: "vi",
  });
  req.body.slug = slug;
  try {
    const products = await Product.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, { new: true }).exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "khong cap nhat duoc du lieu",
    });
  }
};
export const search = async (req, res) => {
  try {
    const conditions = { name: { $regex: req.query.key, $options: "i" }, isDeleted: false };
    const products = await Product.find(conditions);
    res.json(products);
  } catch (error) {
    res.status(400).json({
      error: "Không timf được sản phẩm",
    });
  }
};
export const getComment = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    const comments = await Comment.find({ productId: product._id });
    res.json({
      product,
      comments,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị được danh sách",
    });
  }
};

export const getRelated = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug, isDeleted: false }).exec();
    if (!product) {
      return res.json([])
    }
    const productRelated = await Product.find({ slug: { $ne: slug }, catygoryId: product.catygoryId })
      .limit(4)
      .sort("-createdAt")
      .exec();

    res.json(productRelated);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const products = await Product.findOne({ slug: req.params.slug, isDeleted: false }).exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};

export const updateAmount = async (req, res) => {
  try {
    const data = req.body;
    const product = await Product.findByIdAndUpdate(data.product_id, { colors: data.colors }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error
    })
  }
}
