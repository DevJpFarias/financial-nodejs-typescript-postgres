import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { Transaction } from "../../entity/Transaction";
import { ITransactionsRepository } from "../ITransactionsRepository";
import { v4 as uuid } from 'uuid'

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
}