import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { CreateUserDto } from "../dtos/User/create-user.dto";
import { UpdateUserDto } from "../dtos/User/update-user.dto";

const router = Router();

router.get('/', (req, res, next) => UserController.index(req, res, next));
router.get('/:id', (req, res, next) => UserController.show(req, res, next));
router.post('/', validateMiddleware(CreateUserDto), (req, res, next) => UserController.store(req, res, next));
router.put('/:id', validateMiddleware(UpdateUserDto), (req, res, next) => UserController.update(req, res, next));
router.delete('/:id', (req, res, next) => UserController.delete(req, res, next));

export default router;