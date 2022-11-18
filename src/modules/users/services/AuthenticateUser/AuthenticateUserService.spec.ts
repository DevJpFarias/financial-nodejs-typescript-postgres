import { AppError } from "../../../../shared/errors/AppError"
import { FakeAccountsRepository } from "../../../accounts/repositories/fakes/FakeAccountsRepository"
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository"
import { CreateUserService } from "../CreateUser/CreateUserService"
import { AuthenticateUserService } from "./AuthenticateUserService"

let fakeUsersRepository: FakeUsersRepository
let fakeAccountsRepository: FakeAccountsRepository
let createUserService: CreateUserService
let authenticateUserService: AuthenticateUserService

describe('Authenticate User Test', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeAccountsRepository = new FakeAccountsRepository()
    createUserService = new CreateUserService(fakeUsersRepository, fakeAccountsRepository)
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository)
  })

  it('Should not be able to authenticate an user with incorrect username', async () => {
    await createUserService.execute({
      username: 'Migufe',
      password: 'SuperPassword10@'
    })

    await expect(authenticateUserService.execute({
      username: 'Migufinho',
      password: 'SuperPassword10@'
    })).rejects.toEqual(new AppError('Incorrect username or password!'))
  })

  it('Should not be able to authenticate an user with incorrect password', async () => {
    await createUserService.execute({
      username: 'Migufe',
      password: 'SuperPassword10@'
    })

    await expect(authenticateUserService.execute({
      username: 'Migufe',
      password: 'SuperPassword11@'
    })).rejects.toEqual(new AppError('Incorrect username or password!'))
  })

  it('Should be able to authenticate an user', async () => {
    await createUserService.execute({
      username: 'Migufe',
      password: 'SuperPassword10@'
    })

    const login = await authenticateUserService.execute({
      username: 'Migufe',
      password: 'SuperPassword10@'
    })

    expect(login).toHaveProperty('token')
  })
})