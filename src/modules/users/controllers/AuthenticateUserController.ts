import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { AuthenticateUserService } from "../services/AuthenticateUser/AuthenticateUserService";

const usersRepository = new UsersRepository()

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const authenticateUserService = new AuthenticateUserService(usersRepository)

    const { user, token } = await authenticateUserService.execute({
      username,
      password
    })

    return response.json(instanceToInstance({ user, token }))
  }
}