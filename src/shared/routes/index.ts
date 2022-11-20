import { Router } from "express";
import { accountsRouter } from "./accounts.routes";
import { transactionsRouter } from "./transactions.routes";
import { userRouter } from "./users.routes";

const router = Router();

router.use(accountsRouter)
router.use(userRouter)
router.use(transactionsRouter)

export { router }