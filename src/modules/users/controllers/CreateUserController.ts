import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { CreateUserService } from "../services/CreateUser/CreateUserService";

const usersRepository = new UsersRepository()

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createUserService = new CreateUserService(usersRepository)

    const user = await createUserService.execute({
      username,
      password
    })

    return response.status(201).json(user)
  }
}