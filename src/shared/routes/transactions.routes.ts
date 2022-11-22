import { Router } from "express";
import { CashOutTransferController } from "../../modules/transactions/controllers/CashOutTransferController";
import { GetTransactionsByCashInController } from "../../modules/transactions/controllers/GetTransactions/GetTransactionsByCashInController";
import { GetTransactionsByCashOutController } from "../../modules/transactions/controllers/GetTransactions/GetTransactionsByCashOutController";
import { GetTransactionsByDateAndCashInController } from "../../modules/transactions/controllers/GetTransactions/GetTransactionsByDateAndCashInController";
import { GetTransactionsByDateAndCashOutController } from "../../modules/transactions/controllers/GetTransactions/GetTransactionsByDateAndCashOutController";
import { GetTransactionsByDateController } from "../../modules/transactions/controllers/GetTransactions/GetTransactionsByDateController";
import { GetTransactionsController } from "../../modules/transactions/controllers/GetTransactions/GetTransactionsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const transactionsRouter = Router()
const cashOutTransferController = new CashOutTransferController()
const getTransactionsController = new GetTransactionsController()
const getTransactionsByCashInController = new GetTransactionsByCashInController()
const getTransactionsByCashOutController = new GetTransactionsByCashOutController()
const getTransactionsByDateController = new GetTransactionsByDateController()
const getTransactionsByDateAndCashIn = new GetTransactionsByDateAndCashInController()
const getTransactionsByDateAndCashOutController = new GetTransactionsByDateAndCashOutController()

transactionsRouter.post('/transfer', ensureAuthenticated, cashOutTransferController.handle)
transactionsRouter.get('/transactions', ensureAuthenticated, getTransactionsController.handle)
transactionsRouter.get('/transactions/cashIn', ensureAuthenticated, getTransactionsByCashInController.handle)
transactionsRouter.get('/transactions/cashOut', ensureAuthenticated, getTransactionsByCashOutController.handle)
transactionsRouter.get('/transactions/date/:date', ensureAuthenticated, getTransactionsByDateController.handle)
transactionsRouter.get('/transactions/date/:date/cashIn', ensureAuthenticated, getTransactionsByDateAndCashIn.handle)
transactionsRouter.get('/transactions/date/:date/cashOut', ensureAuthenticated, getTransactionsByDateAndCashOutController.handle)