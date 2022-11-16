import { Router } from "express";
import { create, list, read, remove } from "../controllers/size";

const router = Router();

router.get("/size", list);
router.get("/size/:id", read);
router.delete("/size/:id", remove);
router.post("/size", create);

module.exports = router;
