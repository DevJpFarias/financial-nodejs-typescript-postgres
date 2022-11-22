import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository";
import { TransactionsRepository } from "../../repositories/TransactionsRepository";
import { GetTransactionsService } from "../../services/GetTransactions/GetTransactionsService";

const transactionsRepository = new TransactionsRepository()
const accountsRepository = new AccountsRepository()

export class GetTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const getTransactionsService = new GetTransactionsService(
      transactionsRepository, accountsRepository
    )

    const transactions = await getTransactionsService.execute({
      userId: id
    })

    return response.json(instanceToInstance(transactions))
  }
}