import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository";
import { IAccountsRepository } from "../../../accounts/repositories/IAccountsRepository";
import { IGetTransactionsDTO } from "../../dtos/IGetTransactionsDTO";
import { Transaction } from "../../entity/Transaction";
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { TransactionsRepository } from "../../repositories/TransactionsRepository";

export class GetTransactionsService {
  private transactionsRepository: ITransactionsRepository
  private accountsRepository: IAccountsRepository

  constructor(
    transactionsRepository: ITransactionsRepository,
    accountsRepository: IAccountsRepository
    ) {
    this.transactionsRepository = transactionsRepository
    this.accountsRepository = accountsRepository

    if(!this.transactionsRepository) this.transactionsRepository = new TransactionsRepository()
    if(!this.accountsRepository) this.accountsRepository = new AccountsRepository()
  }

  async execute({ userId }: IGetTransactionsDTO): Promise<Transaction[]> {
    const account = await this.accountsRepository.getBalance({
      userId
    })

    const transactions = await this.transactionsRepository.getTransactions({
      accountId: account.id
    })

    return transactions
  }
}