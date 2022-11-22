import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository"
import { IAccountsRepository } from "../../../accounts/repositories/IAccountsRepository"
import { IGetTransactionsByDateDTO } from "../../dtos/IGetTransactionsByDateDTO"
import { Transaction } from "../../entity/Transaction"
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository"
import { TransactionsRepository } from "../../repositories/TransactionsRepository"

export class GetTransactionsByDateAndCashInService {
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

  async execute({ userId, createdAt }: IGetTransactionsByDateDTO): Promise<Transaction[]> {
    const account = await this.accountsRepository.getBalance({
      userId
    })

    const transactions = await this.transactionsRepository.getTransactionsByDateAndCashIn({
      accountId: account.id,
      createdAt
    })

    return transactions
  }
}