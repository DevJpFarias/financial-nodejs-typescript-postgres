import { Repository } from "typeorm"
import { database } from "../../../helpers/database-connection-helper"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { IFindUserByUsernameDTO } from "../dtos/IFindUserByUsernameDTO"
import { User } from "../entity/User"
import { IUsersRepository } from "./IUsersRepository"

export class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>

	constructor() {
		this.ormRepository = database.getRepository(User)
	}

  async create({ username, password }: ICreateUserDTO): Promise<User> {
    const userInstance = this.ormRepository.create({
      username,
      password
    })

    await this.ormRepository.save(userInstance)

    return userInstance
  }

  async findUserByUsername({ username }: IFindUserByUsernameDTO): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: {
        username
      }
    })

    return user
  }
}