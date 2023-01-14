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
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      const startOfYear = moment(yearSelected, "YYYY").startOf("year").toDate();
      const endOfYear = moment(yearSelected, "YYYY").endOf("year").toDate();
      let startTime = startOfYear;
      let endTime = endOfYear;
      // const startOfDay = moment().startOf('day').toDate();
      // const endOfDay = moment().endOf('day').toDate();

      if (startDate && endDate) {
        startTime = moment(startDate).toDate();
        endTime = moment(endDate).toDate();
      }

      const products = await Product.find();
      // const ordersToday = await Order.find({ status: 4, date: { $gte: startOfDay, $lte: endOfDay } })
      const ordersCompleted = await Order.find({ status: 4, date: { $gte: startTime, $lte: endTime } });
      const ordersInYear = await Order.find({ status: 4, date: { $gte: startOfYear, $lte: endOfYear } });
      const orderDetails = await OrderDetail.find({ orderId: { $in: ordersCompleted.map(({ _id }) => _id)}})
      const orders = groupBy(ordersInYear.map((i) => ({
        ...i.toObject(),
        month: moment(i.date).month() + 1,
      })), "month");
      const ordersDetail = groupBy(orderDetails, 'productId._id');
      const populateProducts = Object.keys(ordersDetail).map(productId => {
        const firstOrder = ordersDetail[productId][0]
        const find = products.find(({ _id }) => _id.toHexString() === productId)
        if (!find) {
          return null
        }
        return { ...find.toObject(), quantity: ordersDetail[productId].reduce((a, b) => a + b.quantity, 0), month: moment(firstOrder.createdAt).month() + 1 }
      }).filter(i => i).sort((a, b) => b.quantity - a.quantity)

      const totalProducts = products.reduce((a, b) => a + b.colors.map(color => color.sizes.reduce((x, y) => x + y.amount, 0)).reduce((q, w) => q + w, 0), 0);

      const totalOrders = ordersCompleted.length;
      const totalSaleProducts = getTotalSaleProducts(ordersCompleted);
      const totalRevenue = getTotalRevenue(ordersCompleted);
      // const ordersToday = ordersCompleted

      res.status(200).json({ total: { totalOrders, totalProducts, totalRevenue, totalSaleProducts }, allOrders: orders, populateProducts, orders: ordersCompleted });
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  },
};

export default StatisticController;
