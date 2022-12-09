import Product from '../models/product'

const StatisticController = {
  async dashboard(req, res) {
    try {
      const products = await Product.find().exec();
      const totalProduct = products.reduce((a, b) => a + b.colors.map(color => color.sizes.reduce((x, y) => x + y.amount, 0)).reduce((q, w) => q + w, 0), 0);
      res.status(200).json({ totalProduct })
    } catch (e) {
      console.error(e);
      res.status(500)
    }
  }
}

export default StatisticController;
