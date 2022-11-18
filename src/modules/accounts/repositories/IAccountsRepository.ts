import { User } from "../../users/entity/User";
import { ICreateAccountDTO } from "../dtos/ICreateAccountDTO";
import { Account } from "../entity/Account";

export interface IAccountsRepository {
  create({ user, userId }: ICreateAccountDTO): Promise<Account>
}