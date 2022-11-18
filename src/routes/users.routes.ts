import { Router } from "express";
import { CreateUserController } from "../modules/users/controllers/CreateUserController";

export const userRouter = Router()
const createUserController = new CreateUserController()

userRouter.post('/users', createUserController.handle)