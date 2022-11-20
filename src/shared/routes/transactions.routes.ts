import { Router } from "express";
import { CashOutTransferController } from "../../modules/transactions/controllers/CashOutTransferController";
import { GetTransactionsController } from "../../modules/transactions/controllers/GetTransactionsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const transactionsRouter = Router()
const cashOutTransferController = new CashOutTransferController()
const getTransactionsController = new GetTransactionsController()

transactionsRouter.post('/transfer', ensureAuthenticated, cashOutTransferController.handle)
transactionsRouter.get('/transactions', ensureAuthenticated, getTransactionsController.handle)