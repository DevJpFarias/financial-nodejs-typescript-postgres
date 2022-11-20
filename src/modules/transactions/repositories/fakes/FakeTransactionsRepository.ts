import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { Transaction } from "../../entity/Transaction";
import { ITransactionsRepository } from "../ITransactionsRepository";
import { v4 as uuid } from 'uuid'
import { IGetTransactionsDTO } from "../../dtos/IGetTransactionsDTO";
import { IFindTransactionsDTO } from "../../dtos/IFindTransactionsDTO";

export class FakeTransactionsRepository implements ITransactionsRepository {
  private transactionsRepository: Transaction[] = []

  async createTransaction({ debitedAccountId, creditedAccountId, value }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction()

    Object.assign(transaction, {
      id: uuid(),
      debitedAccountId,
      creditedAccountId,
      value,
      createdAt: new Date()
    })

    this.transactionsRepository.push(transaction)

    return transaction
  }

  async getTransactions({ accountId }: IFindTransactionsDTO): Promise<Transaction[]> {
    return this.transactionsRepository.filter(transaction => transaction.creditedAccountId === accountId || transaction.debitedAccountId === accountId)
  }
}