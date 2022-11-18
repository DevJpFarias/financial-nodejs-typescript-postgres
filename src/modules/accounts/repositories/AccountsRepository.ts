import { Repository } from "typeorm";
import { database } from "../../../shared/helpers/database-connection-helper";
import { ICreateAccountDTO } from "../dtos/ICreateAccountDTO";
import { Account } from "../entity/Account";
import { IAccountsRepository } from "./IAccountsRepository";

export class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Account>

  constructor() {
    this.ormRepository = database.getRepository(Account)
  }

  async create({ user, userId }: ICreateAccountDTO): Promise<Account> {
    const accountInstance = this.ormRepository.create({
      user,
      userId
    })

    await this.ormRepository.save(accountInstance)
    
    return accountInstance
  }
}