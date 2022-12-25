import Product from "../models/product";
import Order from "../models/order";
import OrderDetail from '../models/orderDetail'
import moment from "moment";
import { groupBy } from "lodash";

function getTotalSaleProducts(orders = []) {
  return orders.reduce((a, b) => a + b.orderDetails.reduce((x, y) => x + y.quantity, 0), 0)
}
function getTotalRevenue(orders = []) {
  return orders.reduce((a, b) => a + b.totalPrice, 0)
}

const StatisticController = {
  async dashboard(req, res) {
    try {
      const yearSelected = +req.query.year || moment().year();
      const startTime = moment(yearSelected, "YYYY").startOf("year").toDate();
      const endTime = moment(yearSelected, "YYYY").endOf("year").toDate();
      const products = await Product.find();
      const ordersCompleted = await Order.find({ status: 4, date: { $gte: startTime, $lte: endTime } });
      const orderDetails = await OrderDetail.find({ orderId: { $in: ordersCompleted.map(({ _id }) => _id)}})
      const orders = groupBy(ordersCompleted.map((i) => ({
        ...i.toObject(),
        month: moment(i.date).month() + 1,
      })), "month");
      const ordersDetail = groupBy(orderDetails, 'productId')

      const totalProducts = products.reduce((a, b) => a + b.colors.map(color => color.sizes.reduce((x, y) => x + y.amount, 0)).reduce((q, w) => q + w, 0), 0);

      const totalOrders = ordersCompleted.length;
      const totalSaleProducts = getTotalSaleProducts(ordersCompleted);
      const totalRevenue = getTotalRevenue(ordersCompleted);

      res.status(200).json({ total: { totalOrders, totalProducts, totalRevenue, totalSaleProducts }, orders, ordersDetail });
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  },
};

export default StatisticController;
