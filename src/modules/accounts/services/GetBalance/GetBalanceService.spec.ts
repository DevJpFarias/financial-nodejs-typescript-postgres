import { FakeUsersRepository } from "../../../users/repositories/fakes/FakeUsersRepository"
import { CreateUserService } from "../../../users/services/CreateUser/CreateUserService"
import { IGetBalanceRequestDTO } from "../../dtos/IGetBalanceDTO"
import { FakeAccountsRepository } from "../../repositories/fakes/FakeAccountsRepository"
import { GetBalanceService } from "./GetBalanceService"

let fakeUsersRepository: FakeUsersRepository
let fakeAccountsRepository: FakeAccountsRepository
let createUserService: CreateUserService
let getBalanceService: GetBalanceService

describe('Get Balance Test', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeAccountsRepository = new FakeAccountsRepository()
    createUserService = new CreateUserService(fakeUsersRepository, fakeAccountsRepository)
    getBalanceService = new GetBalanceService(fakeAccountsRepository)
  })

  it('Should be able to get a balance of user', async () => {
    const user = await createUserService.execute({
      username: 'Migufe',
      password: 'SuperPassword10@'
    })

    const account = await getBalanceService.execute({
      userId: user.user.id
    })

    expect(account).toHaveProperty('balance')
  })
})