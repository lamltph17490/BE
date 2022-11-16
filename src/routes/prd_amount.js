import { Router } from "express";
import { create, list, read, remove } from "../controllers/prd_amount";

const router = Router();

router.get("/prd_amount", list);
router.get("/prd_amount/:id", read);
router.delete("/prd_amount/:id", remove);
router.post("/prd_amount", create);

module.exports = router;
