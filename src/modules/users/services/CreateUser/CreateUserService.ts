import { AppError } from "../../../../shared/errors/AppError";
import { PasswordValidation } from "../../../../shared/helpers/password-validation";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entity/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { hash } from 'bcrypt'
import { AccountsRepository } from "../../../accounts/repositories/AccountsRepository";
import { Account } from "../../../accounts/entity/Account";
import { IAccountsRepository } from "../../../accounts/repositories/IAccountsRepository";

interface IResponse {
  user: User
  account: Account
}

export class CreateUserService {
  private usersRepository: IUsersRepository
  private passwordValidation: PasswordValidation
  private accountsRepository: IAccountsRepository

  constructor(
    usersRepository: IUsersRepository,
    accountsRepository: IAccountsRepository
    ) {
    this.usersRepository = usersRepository
    this.accountsRepository = accountsRepository

    if(!this.usersRepository) this.usersRepository = new UsersRepository()
    if(!this.accountsRepository) this.accountsRepository = new AccountsRepository()

    this.passwordValidation = new PasswordValidation()
  }

  async execute({ username, password }: ICreateUserDTO): Promise<IResponse> {
    if(username.length < 3) throw new AppError('The username must be at least 3 characters long')

    const findUsername = await this.usersRepository.findUserByUsername({
      username
    })

    if(findUsername) throw new AppError('The username already be used!')

    if(password.length < 8) throw new AppError('The password must be at least 8 characters long')

    const verifyUpper = await this.passwordValidation.haveCapitalLetters(password)

    if(!verifyUpper) throw new AppError('The password must have a capital letter')

    const verifyNumber = await this.passwordValidation.haveNumbers(password)

    if(!verifyNumber) throw new AppError('The password must have a number')

    const verifySpecialCharacter = await this.passwordValidation.haveSpecialCharacters(password)

    if(!verifySpecialCharacter) throw new AppError('The password must have a special character')

    const hashedPassword = await hash(password, 10)

    const user = await this.usersRepository.create({
      username,
      password: hashedPassword
    })

    const account = await this.accountsRepository.create({
      user,
      userId: user.id
    })

    return {
      user,
      account
    }
  }
}