import { addHours } from "date-fns";
import { Between, Repository } from "typeorm";
import { database } from "../../../shared/helpers/database-connection-helper";
import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { IFindTransactionsByDateDTO } from "../dtos/IFindTransactionsByDateDTO";
import { IFindTransactionsDTO } from "../dtos/IFindTransactionsDTO";
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

  async getTransactions({ accountId }: IFindTransactionsDTO): Promise<Transaction[]> {
    return this.ormRepository.find({
      where: [
        {
          creditedAccountId: accountId
        },
        {
          debitedAccountId: accountId
        }
      ]
    })
  }

  async getTransactionsByCashIn({ accountId }: IFindTransactionsDTO): Promise<Transaction[]> {
    return this.ormRepository.find({
      where: {
        creditedAccountId: accountId
      }
    })
  }

  async getTransactionsByCashOut({ accountId }: IFindTransactionsDTO): Promise<Transaction[]> {
    return this.ormRepository.find({
      where: {
        debitedAccountId: accountId
      }
    })
  }

  async getTransactionsByDate({ accountId, createdAt }: IFindTransactionsByDateDTO): Promise<Transaction[]> {
    return this.ormRepository.find({
      where: [
        {
          createdAt: Between(
            createdAt,
            addHours(createdAt, 24)
          ),
          creditedAccountId: accountId
        },
        {
          createdAt: Between(
            createdAt,
            addHours(createdAt, 24)
          ),
          debitedAccountId: accountId
        }
      ]
    })
  }

  async getTransactionsByDateAndCashIn({ accountId, createdAt }: IFindTransactionsByDateDTO): Promise<Transaction[]> {
    return this.ormRepository.find({
      where: {
        creditedAccountId: accountId,
        createdAt: Between(
          createdAt,
          addHours(createdAt, 24)
        ),
      }
    })
  }

  async getTransactionsByDateAndCashOut({ accountId, createdAt }: IFindTransactionsByDateDTO): Promise<Transaction[]> {
    return this.ormRepository.find({
      where: {
        debitedAccountId: accountId,
        createdAt: Between(
          createdAt,
          addHours(createdAt, 24)
        ),
      }
    })
  }
}