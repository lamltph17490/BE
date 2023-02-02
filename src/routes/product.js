import { Router } from "express";
import {
  create,
  getComment,
  list,
  read,
  remove,
  search,
  update,
  getRelated,
  getBySlug,
  updateAmount,
  productFilter,
  productSearch,
} from "../controllers/product";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.get("/product", list);
router.get("/product/:id/comment", getComment);
router.get("/product/:slug/getRelated", getRelated);
router.get("/product/:slug/getBySlug", getBySlug);
router.get("/product/search", search);
router.get("/product/:id", read);
router.delete("/product/:id", requireSignin, isAuth, isAdmin, remove);
router.post("/product", create);
router.put("/product/:id", requireSignin, isAuth, isAdmin, update);
router.put('/product/:id/updateAmount', requireSignin, isAuth, isAdmin, updateAmount);
router.post('/product-filter', productFilter);
router.get('/product-search', productSearch);

module.exports = router;
