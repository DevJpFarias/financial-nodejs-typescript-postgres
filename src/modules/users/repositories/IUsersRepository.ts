import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IFindUserByIdDTO } from "../dtos/IFindUserByIdDTO";
import { IFindUserByUsernameDTO } from "../dtos/IFindUserByUsernameDTO";
import { User } from "../entity/User";

export interface IUsersRepository {
  create({ username, password }: ICreateUserDTO): Promise<User>
  findUserByUsername({ username }: IFindUserByUsernameDTO): Promise<User>
  findUserById({ id }: IFindUserByIdDTO): Promise<User>
}