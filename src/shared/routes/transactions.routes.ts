import { Router } from "express";
import { CashOutTransferController } from "../../modules/transactions/controllers/CashOutTransferController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const transactionsRouter = Router()
const cashOutTransferController = new CashOutTransferController()

transactionsRouter.post('/transfer', ensureAuthenticated, cashOutTransferController.handle)