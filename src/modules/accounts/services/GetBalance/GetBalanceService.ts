import { IGetBalanceRequestDTO, IGetBalanceResponseDTO } from "../../dtos/IGetBalanceDTO";
import { Account } from "../../entity/Account";
import { AccountsRepository } from "../../repositories/AccountsRepository";
import { IAccountsRepository } from "../../repositories/IAccountsRepository";

export class GetBalanceService {
  private accountsRepository: IAccountsRepository

  constructor(accountsRepository: IAccountsRepository) {
    this.accountsRepository = accountsRepository

    if(!this.accountsRepository) this.accountsRepository = new AccountsRepository()
  }

  async execute({ userId }: IGetBalanceRequestDTO): Promise<Account> {
    const balance = await this.accountsRepository.getBalance({
      userId
    })

    return balance
  }
}