import { compare } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../entity/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { sign } from 'jsonwebtoken'

interface IRequest {
  username: string
  password: string
}

interface IResponse {
  user: User,
  token: string
}

export class AuthenticateUserService {
  private usersRepository: IUsersRepository

  constructor(repository: IUsersRepository) {
    this.usersRepository = repository

    if(!this.usersRepository) {
      this.usersRepository = new UsersRepository()
    }
  }

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserByUsername({
      username
    })

    if(!user) throw new AppError('Incorrect username or password!')

    const comparePassword = await compare(password, user.password)

    if(!comparePassword) throw new AppError('Incorrect username or password!')

    const token = sign({}, '9a995dcc78cda3b260931850c486a6ba', {
			subject: user.id,
			expiresIn: '1d'
		})

    return {
      user,
      token
    }
  }
}