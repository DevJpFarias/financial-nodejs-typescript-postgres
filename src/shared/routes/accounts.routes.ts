import { Router } from "express";
import { GetBalanceController } from "../../modules/accounts/controllers/GetBalanceController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const accountsRouter = Router()
const getBalanceController = new GetBalanceController()

accountsRouter.get('/balance', ensureAuthenticated, getBalanceController.handle)