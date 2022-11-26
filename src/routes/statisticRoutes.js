import { Router } from 'express';
import { requireSignin, isAuth, isAdmin } from "../middlewares/checkAuth"
import StatisticController  from "../controllers/statisticController";
const router = Router();

router.get('/statistic/dashboard', requireSignin, isAuth, isAdmin, StatisticController.dashboard);

module.exports = router;
