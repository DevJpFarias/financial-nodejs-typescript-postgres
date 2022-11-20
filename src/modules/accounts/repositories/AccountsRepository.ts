import { Repository } from "typeorm";
import { database } from "../../../shared/helpers/database-connection-helper";
import { ICashInDTO, ICashOutDTO } from "../dtos/ICashDTO";
import { ICreateAccountDTO } from "../dtos/ICreateAccountDTO";
import { IGetBalanceRequestDTO, IGetBalanceResponseDTO } from "../dtos/IGetBalanceDTO";
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

  async getBalance({ userId }: IGetBalanceRequestDTO): Promise<Account> {
    const account = await this.ormRepository.findOne({
      where: {
        userId
      }
    })

    return account
  }

  async cashIn({ userId, value }: ICashInDTO): Promise<Account> {
    const account = await this.ormRepository.findOne({
      where: {
        userId
      }
    })

    account.balance += value
    await this.ormRepository.save(account)

    return account
  }

  async cashOut({ userId, value }: ICashOutDTO): Promise<Account> {
    const account = await this.ormRepository.findOne({
      where: {
        userId
      }
    })

    account.balance -= value
    await this.ormRepository.save(account)

    return account
  }
}