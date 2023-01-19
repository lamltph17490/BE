import { Router } from "express";
import { getUserListNotificationApi, list, readNotification } from "../controllers/notification";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.get("/notification", list);
router.put("/read-notification/:id", readNotification);
router.get("/get-notification/:id", getUserListNotificationApi);
module.exports = router;
