import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { Transaction } from "../entity/Transaction";

export interface ITransactionsRepository {
  createTransaction({ debitedAccount, creditedAccount, value }: ICreateTransactionDTO): Promise<Transaction>
}