import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { LoginDto } from "../dtos/Auth/login.dto";
import { authentication } from "../middlewares/auth.middleware";

const router = Router();

router.post('/login', validateMiddleware(LoginDto), (req, res, next) => AuthController.login(req, res, next));
router.get('/user', authentication, (req, res, next) => AuthController.user(req, res, next));
router.post('/logout', authentication, (req, res, next) => AuthController.logout(req, res, next));
router.get('/refresh', authentication, (req, res, next) => AuthController.refresh(req, res, next));

export default router;