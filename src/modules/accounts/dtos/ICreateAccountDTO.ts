import { User } from "../../users/entity/User";

export interface ICreateAccountDTO {
  user: User,
  userId: string
}