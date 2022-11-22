import { format } from "date-fns";
import { Request, Response } from "express";
import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository";
import { TransactionsRepository } from "../../repositories/TransactionsRepository";
import { GetTransactionsByDateAndCashInService } from "../../services/GetTransactionsByDateAndCashIn/GetTransactionsByDateAndCashInService";

const accountsRepository = new AccountsRepository()
const transactionsRepository = new TransactionsRepository()

export class GetTransactionsByDateAndCashInController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const { date } = request.params

    const createdAt = new Date(date)

    const getTransactionsByDateAndCashInService = new GetTransactionsByDateAndCashInService(
      transactionsRepository,
      accountsRepository
    )

    const transactions = await getTransactionsByDateAndCashInService.execute({
      userId: id,
      createdAt
    })

    return response.json(transactions)
  }
}