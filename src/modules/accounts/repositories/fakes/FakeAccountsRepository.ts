import { User } from "../../../users/entity/User";
import { Account } from "../../entity/Account";
import { IAccountsRepository } from "../IAccountsRepository";
import { v4 as uuid } from 'uuid'
import { ICreateAccountDTO } from "../../dtos/ICreateAccountDTO";
import { IGetBalanceRequestDTO, IGetBalanceResponseDTO } from "../../dtos/IGetBalanceDTO";
import { ICashInDTO, ICashOutDTO } from "../../dtos/ICashDTO";

export class FakeAccountsRepository implements IAccountsRepository {
  private accountsRepository: Account[] = []

  async create({ user, userId }: ICreateAccountDTO): Promise<Account> {
    const account = new Account()

    Object.assign(account, {
      id: uuid(),
      balance: 100,
      user,
      userId,
    })

    this.accountsRepository.push(account)

    return account
  }

  async getBalance({ userId }: IGetBalanceRequestDTO): Promise<Account> {
    const account = this.accountsRepository.find(account => account.userId === userId)

    return account
  }

  async cashIn({ userId, value }: ICashInDTO): Promise<Account> {
    const account = this.accountsRepository.find(account => account.userId === userId)

    account.balance += value

    return account
  }

  async cashOut({ userId, value }: ICashOutDTO): Promise<Account> {
    const account = this.accountsRepository.find(account => account.userId === userId)

    account.balance -= value

    return account
  }
}