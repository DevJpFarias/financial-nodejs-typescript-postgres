import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entity/User";
import { IUsersRepository } from "../IUsersRepository";
import { v4 as uuid } from 'uuid'
import { IFindUserByUsernameDTO } from "../../dtos/IFindUserByUsernameDTO";
import { IFindUserByIdDTO } from "../../dtos/IFindUserByIdDTO";

export class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = []

  async create({ username, password }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      username,
      password
    })

    this.usersRepository.push(user)

    return user
  }

  async findUserByUsername({ username }: IFindUserByUsernameDTO): Promise<User> {
    return this.usersRepository.find(user => user.username === username)
  }

  async findUserById({ id }: IFindUserByIdDTO): Promise<User> {
    return this.usersRepository.find(user => user.id === id)
  }
}