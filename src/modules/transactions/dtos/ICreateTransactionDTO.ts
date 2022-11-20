import { Account } from "../../accounts/entity/Account"

export interface ICreateTransactionDTO {
  debitedAccount: Account
  debitedAccountId: string
  creditedAccount: Account
  creditedAccountId: string
  value: number
}