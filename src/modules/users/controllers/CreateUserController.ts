import { Request, Response } from "express";
import { AccountsRepository } from "../../accounts/repositories/AccountsRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { CreateUserService } from "../services/CreateUser/CreateUserService";

const usersRepository = new UsersRepository()
const accountsRepository = new AccountsRepository()

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createUserService = new CreateUserService(usersRepository, accountsRepository)

    const user = await createUserService.execute({
      username,
      password
    })

    return response.status(201).json(user)
  }
}