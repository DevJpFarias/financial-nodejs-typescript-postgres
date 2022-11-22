import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { IFindTransactionsByDateDTO } from "../dtos/IFindTransactionsByDateDTO";
import { IFindTransactionsDTO } from "../dtos/IFindTransactionsDTO";
import { IGetTransactionsByDateDTO } from "../dtos/IGetTransactionsByDateDTO";
import { IGetTransactionsDTO } from "../dtos/IGetTransactionsDTO";
import { Transaction } from "../entity/Transaction";

export interface ITransactionsRepository {
  createTransaction({ debitedAccount, creditedAccount, value }: ICreateTransactionDTO): Promise<Transaction>
  getTransactions({ accountId }: IFindTransactionsDTO): Promise<Transaction[]>
  getTransactionsByCashIn({ accountId }: IFindTransactionsDTO): Promise<Transaction[]>
  getTransactionsByCashOut({ accountId }: IFindTransactionsDTO): Promise<Transaction[]>
  getTransactionsByDate({ accountId, createdAt }: IFindTransactionsByDateDTO): Promise<Transaction[]>
  getTransactionsByDateAndCashIn({ accountId, createdAt }: IFindTransactionsByDateDTO): Promise<Transaction[]>
  getTransactionsByDateAndCashOut({ accountId, createdAt }: IFindTransactionsByDateDTO): Promise<Transaction[]>
}