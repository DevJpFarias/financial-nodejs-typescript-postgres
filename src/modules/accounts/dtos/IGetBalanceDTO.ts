import { User } from "../../users/entity/User";

export interface IGetBalanceRequestDTO {
  userId: string
}

export interface IGetBalanceResponseDTO {
  balance: number
}