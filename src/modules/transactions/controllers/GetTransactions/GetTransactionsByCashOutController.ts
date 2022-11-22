import { Request, Response } from "express";
import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository";
import { TransactionsRepository } from "../../repositories/TransactionsRepository";
import { GetTransactionsByCashOutService } from "../../services/GetTransactionsByCashOut/GetTransactionsByCashOutService";

const accountsRepository = new AccountsRepository()
const transactionsRepository = new TransactionsRepository()

export class GetTransactionsByCashOutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const getTransactionsByCashOutService = new GetTransactionsByCashOutService(
      transactionsRepository,
      accountsRepository
    )

    const transactions = await getTransactionsByCashOutService.execute({
      userId: id
    })

    return response.json(transactions)
  }
}