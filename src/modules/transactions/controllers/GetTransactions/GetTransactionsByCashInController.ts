import { Request, Response } from "express";
import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository";
import { TransactionsRepository } from "../../repositories/TransactionsRepository";
import { GetTransactionsByCashInService } from "../../services/GetTransactionsByCashIn/GetTransactionsByCashInService";

const accountsRepository = new AccountsRepository()
const transactionsRepository = new TransactionsRepository()

export class GetTransactionsByCashInController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const getTransactionsByCashInService = new GetTransactionsByCashInService(
      transactionsRepository,
      accountsRepository
    )

    const transactions = await getTransactionsByCashInService.execute({
      userId: id
    })

    return response.json(transactions)
  }
}