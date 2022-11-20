import { AppError } from "../../../../shared/errors/AppError"
import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository"
import { IAccountsRepository } from "../../../accounts/repositories/IAccountsRepository"
import { IUsersRepository } from "../../../users/repositories/IUsersRepository"
import { UsersRepository } from "../../../users/repositories/UsersRepository"
import { ICreateCashOutDTO } from "../../dtos/ICreateCashOutDTO"
import { Transaction } from "../../entity/Transaction"
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository"
import { TransactionsRepository } from "../../repositories/TransactionsRepository"

export class CashOutTransferService {
  private accountsRepository: IAccountsRepository
  private usersRepository: IUsersRepository
  private transactionsRepository: ITransactionsRepository

  constructor(
    accountsRepository: IAccountsRepository,
    usersRepository: IUsersRepository,
    transactionsRepository: ITransactionsRepository
  ) {
    this.accountsRepository = accountsRepository
    this.usersRepository = usersRepository
    this.transactionsRepository = transactionsRepository

    if(!this.accountsRepository) this.accountsRepository = new AccountsRepository()
    if(!this.usersRepository) this.usersRepository = new UsersRepository()
    if(!this.transactionsRepository ) this.transactionsRepository = new TransactionsRepository()
  }

  async execute({ userId, debitedUserUsername, value }: ICreateCashOutDTO): Promise<Transaction> {
    const debitedUser = await this.usersRepository.findUserById({
      id: userId
    })

    if(debitedUserUsername === debitedUser.username) throw new AppError('You cannot transfer to yourself')

    const debitedAccount = await this.accountsRepository.getBalance({
      userId
    })

    if(debitedAccount.balance < value) throw new AppError('Insufficient funds')

    const creditedUser = await this.usersRepository.findUserByUsername({
      username: debitedUserUsername
    })

    if(!creditedUser) throw new AppError('User not found')

    await this.accountsRepository.cashOut({
      userId,
      value
    })

    await this.accountsRepository.cashIn({
      userId: creditedUser.id,
      value
    })

    const creditedAccount = await this.accountsRepository.getBalance({
      userId: creditedUser.id
    })

    const transaction = await this.transactionsRepository.createTransaction({
      debitedAccount,
      debitedAccountId: debitedAccount.id,
      creditedAccount,
      creditedAccountId: creditedAccount.id,
      value
    })

    return transaction
  }
}