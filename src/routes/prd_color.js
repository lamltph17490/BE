import { Router } from "express";
import { create, list, read, remove } from "../controllers/prd_color";

const router = Router();

router.get("/prd_color", list);
router.get("/prd_color/:id", read);
router.delete("/prd_color/:id", remove);
router.post("/prd_color", create);

module.exports = router;
