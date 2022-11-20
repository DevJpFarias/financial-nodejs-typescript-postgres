import { ICashInDTO, ICashOutDTO } from "../dtos/ICashDTO";
import { ICreateAccountDTO } from "../dtos/ICreateAccountDTO";
import { IGetBalanceRequestDTO, IGetBalanceResponseDTO } from "../dtos/IGetBalanceDTO";
import { Account } from "../entity/Account";

export interface IAccountsRepository {
  create({ user, userId }: ICreateAccountDTO): Promise<Account>
  cashIn({ userId, value }: ICashInDTO): Promise<Account>
  cashOut({ userId, value }: ICashOutDTO): Promise<Account>
  getBalance({ userId }: IGetBalanceRequestDTO): Promise<Account>
}