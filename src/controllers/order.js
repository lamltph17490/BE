import moment from "moment/moment";
import format from "date-format";
import Order from "../models/order";

export const list = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").sort({ status: 1 }).exec();
    res.json(orders);
  } catch (error) {
    res.status(400).json({
      message: "không hiển thị được dữ liệu",
    });
  }
};

export const read = async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(400).json({
      message: "không hiển thị được dữ liệu",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const orders = await Order.findOneAndDelete({ _id: req.params.id });
    res.json(orders);
  } catch (error) {
    res.status(400).json({
      message: "Không xóa được dữ liệu",
    });
  }
};
export const create = async (req, res) => {
  try {
    const orders = await new Order(req.body).save();
    res.json(orders);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm mơi được dữ liệu",
    });
  }
};
export const update = async (req, res) => {
  try {
    const orders = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(orders);
  } catch (error) {
    res.status(400).json({
      message: "Không cập nhật được dữ liệu",
    });
  }
};

export const getByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort("-createdAt").exec();

    res.json(orders);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
export const createPaymentUrl = async (req, res) => {
  try {
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = process.env.VNP_TMNCODE;
    var secretKey = process.env.VNP_HASHSECRET;
    var vnpUrl = process.env.VNP_URL;
    var returnUrl = process.env.VNP_RETURNURL;

    // console.log(tmnCode, secretKey, vnpUrl, returnUrl);

    var date = new Date();

    var createDate = format.asString("yyyyMMddhhmmss", date);
    var orderId = format.asString("HHmmss", date);
    var orderType = "fashion";

    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    var orderInfo = req.body.orderDescription;

    var locale = "vn";
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = '';
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }
    console.log(vnp_Params["vnp_BankCode"]);
    vnp_Params = sortObject(vnp_Params);
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.json(vnpUrl);
  } catch (error) {
    res.status(400).json({
      message: "Không tạo được đường dẫn thanh toán",
    });
  }
};
export const vnpayReturn = async (req, res) => {
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var tmnCode = process.env.VNP_TMNCODE;
  var secretKey = process.env.VNP_HASHSECRET;

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
};
export const vnpayIpn = async (req, res) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var secretKey = process.env.VNP_HASHSECRET;
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};
