import { Request, Response } from "express";
import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository";
import { TransactionsRepository } from "../../repositories/TransactionsRepository";
import { GetTransactionsByDateService } from "../../services/GetTransactionsByDate/GetTransactionsByDateService";

const accountsRepository = new AccountsRepository()
const transactionsRepository = new TransactionsRepository()

export class GetTransactionsByDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const { date } = request.params

    const createdAt = new Date(date)

    const getTransactionsByDateService = new GetTransactionsByDateService(
      transactionsRepository,
      accountsRepository
    )

    const transactions = await getTransactionsByDateService.execute({
      userId: id,
      createdAt
    })

    return response.json(transactions)
  }
}