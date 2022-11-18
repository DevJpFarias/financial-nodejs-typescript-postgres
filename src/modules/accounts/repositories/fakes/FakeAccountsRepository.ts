import { User } from "../../../users/entity/User";
import { Account } from "../../entity/Account";
import { IAccountsRepository } from "../IAccountsRepository";
import { v4 as uuid } from 'uuid'
import { ICreateAccountDTO } from "../../dtos/ICreateAccountDTO";

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
}