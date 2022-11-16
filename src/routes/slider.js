import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/slider";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.get("/slider", list);
router.get("/slider/:id", read);
router.delete("/slider/:id", remove);
router.post("/slider", create);
router.put("/slider/:id", update);

module.exports = router;
