import { Repository } from "typeorm"
import { PostgresDataSource } from "../../../shared/database/data-source"
import { database } from "../../../shared/helpers/database-connection-helper"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { IFindUserByIdDTO } from "../dtos/IFindUserByIdDTO"
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
    return await this.ormRepository.findOne({
      where: {
        username
      }
    })
  }

  async findUserById({ id }: IFindUserByIdDTO): Promise<User> {
    return await this.ormRepository.findOne({
      where: {
        id
      }
    })
  }
}