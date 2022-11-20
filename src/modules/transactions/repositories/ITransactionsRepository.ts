import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { IFindTransactionsDTO } from "../dtos/IFindTransactionsDTO";
import { IGetTransactionsDTO } from "../dtos/IGetTransactionsDTO";
import { Transaction } from "../entity/Transaction";

export interface ITransactionsRepository {
  createTransaction({ debitedAccount, creditedAccount, value }: ICreateTransactionDTO): Promise<Transaction>
  getTransactions({ accountId }: IFindTransactionsDTO): Promise<Transaction[]>
}