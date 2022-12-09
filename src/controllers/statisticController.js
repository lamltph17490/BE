
const StatisticController = {
  async dashboard(req, res) {
    try {
      // const products = await ProductAmount.find().populate("prd_id").populate("size_id").populate("color").exec();
      // const totalProduct = products.filter((item) => item.amount && item.prd_id).reduce((a, b) => a + b.amount, 0);
      res.status(200).json({ totalProduct: 0 })
    } catch (e) {
      console.error(e);
      res.status(500)
    }
  }
}

export default StatisticController;
