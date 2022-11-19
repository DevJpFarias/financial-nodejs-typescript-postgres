import { Router } from "express";
import { accountsRouter } from "./accounts.routes";
import { userRouter } from "./users.routes";

const router = Router();

router.use(accountsRouter)
router.use(userRouter)

export { router }