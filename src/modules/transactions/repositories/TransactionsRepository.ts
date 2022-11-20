import { Repository } from "typeorm";
import { database } from "../../../shared/helpers/database-connection-helper";
import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { Transaction } from "../entity/Transaction";
import { ITransactionsRepository } from "./ITransactionsRepository";

export class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>

  constructor() {
    this.ormRepository = database.getRepository(Transaction)
  }

  async createTransaction({ debitedAccountId, creditedAccountId, value }: ICreateTransactionDTO): Promise<Transaction> {
    const transactionInstance = this.ormRepository.create({
      debitedAccountId,
      creditedAccountId,
      value
    })

    await this.ormRepository.save(transactionInstance)

    return transactionInstance
  }
}