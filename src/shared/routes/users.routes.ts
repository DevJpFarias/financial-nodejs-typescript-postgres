import { Router } from "express";
import { AuthenticateUserController } from "../../modules/users/controllers/AuthenticateUserController";
import { CreateUserController } from "../../modules/users/controllers/CreateUserController";

export const userRouter = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

userRouter.post('/register', createUserController.handle)
userRouter.post('/login', authenticateUserController.handle)