import { Request, Response } from "express";
import { format } from 'date-fns'
import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository";
import { TransactionsRepository } from "../../repositories/TransactionsRepository";
import { GetTransactionsByDateAndCashOutService } from "../../services/GetTransactionsByDateAndCashOut/GetTransactionsByDateAndCashOutService";

const accountsRepository = new AccountsRepository()
const transactionsRepository = new TransactionsRepository()

export class GetTransactionsByDateAndCashOutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const { date } = request.params

    const createdAt = new Date(date)

    const getTransactionsByDateAndCashOutService = new GetTransactionsByDateAndCashOutService(
      transactionsRepository,
      accountsRepository
    )

    const transactions = await getTransactionsByDateAndCashOutService.execute({
      userId: id,
      createdAt,
    })

    return response.json(transactions)
  }
}