import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IFindUserByUsernameDTO } from "../dtos/IFindUserByUsernameDTO";
import { User } from "../entity/User";

export interface IUsersRepository {
  create({ username, password }: ICreateUserDTO): Promise<User>
  findUserByUsername({ username }: IFindUserByUsernameDTO): Promise<User>
}