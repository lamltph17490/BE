import { Router } from 'express';
import { requireSignin, isAuth, isAdmin } from "../middlewares/checkAuth"
import StatisticController  from "../controllers/statisticController";
const router = Router();

router.post('/statistic/dashboard', requireSignin, isAuth, isAdmin, StatisticController.dashboard);

module.exports = router;
