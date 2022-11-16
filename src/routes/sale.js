import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/sale";

const router = Router();

router.get("/sales", list);
router.get("/sales/:id", read);
router.delete("/sales/:id", remove);
router.post("/sales", create);
router.put('/sales/:id', update);

module.exports = router;
