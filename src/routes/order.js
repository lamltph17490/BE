import { Router } from "express";
import {
  create,
  list,
  read,
  remove,
  update,
  getByUser,
  createPaymentUrl,
  vnpayReturn,
  vnpayIpn,
} from "../controllers/order";

const router = Router();

router.get("/order", list);
router.get("/order/getByUser/:userId", getByUser);
router.get("/order/:id", read);
router.delete("/order/:id", remove);
router.post("/order", create);
router.put("/order/:id", update);
router.post("/order/create_payment_url", createPaymentUrl);
router.get("/order/vnpay_return", vnpayReturn);
router.get("/order/vnpay_ipn", vnpayIpn);

module.exports = router;
