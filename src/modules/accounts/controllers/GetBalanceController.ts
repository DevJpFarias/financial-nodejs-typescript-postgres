import { Request, Response } from "express";
import { AccountsRepository } from "../repositories/AccountsRepository";
import { GetBalanceService } from "../services/GetBalance/GetBalanceService";
import { instanceToInstance } from 'class-transformer'

const accountsRepository = new AccountsRepository()

export class GetBalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const getBalanceService = new GetBalanceService(accountsRepository)

    const account = await getBalanceService.execute({
      userId: id
    })

    return response.json(instanceToInstance(account))
  }
}