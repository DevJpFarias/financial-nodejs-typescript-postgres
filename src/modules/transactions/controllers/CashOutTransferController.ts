import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { AccountsRepository } from "../../accounts/repositories/AccountsRepository";
import { UsersRepository } from "../../users/repositories/UsersRepository";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { CashOutTransferService } from "../services/CashOutTransfer/CashOutTransferService";

const accountsRepository = new AccountsRepository()
const usersRepository = new UsersRepository()
const transactionsRepository = new TransactionsRepository()

export class CashOutTransferController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const { username: debitedUserUsername, value } = request.body

    const cashOutTransferService = new CashOutTransferService(
      accountsRepository,
      usersRepository,
      transactionsRepository
    )

    const transaction = await cashOutTransferService.execute({
      userId: id,
      debitedUserUsername,
      value
    })

    return response.json(instanceToInstance(transaction))
  }
}