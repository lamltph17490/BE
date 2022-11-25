import { Router } from "express";
import { create, list, read, remove ,update} from "../controllers/prd_amount";

const router = Router();

router.get("/prd_amount", list);
router.get("/prd_amount/:id", read);
router.put("/prd_amount/:id", update);
router.delete("/prd_amount/:id", remove);
router.post("/prd_amount", create);

module.exports = router;
