import { AppError } from "../../../../AppError"
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository"
import { CreateUserService } from "./CreateUserService"

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService

describe('Create User Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(fakeUsersRepository)
  })

  it('Should not be able to create an user with an username with less than 3 characters', async () => {
    await expect(createUserService.execute({
      username: 'Jp',
      password: 'superPassword1'
    })).rejects.toEqual(new AppError('The username must be at least 3 characters long'))
  })

  it('Should not be able to create a new user if username already exists', async () => {
    await createUserService.execute({
      username: 'Migufe',
      password: 'superPassword1!'
    })

    await expect(createUserService.execute({
      username: 'Migufe',
      password: 'superPassword1'
    })).rejects.toEqual(new AppError('The username already be used!'))
  })

  it('Should not be able to create a new user with a password with less than 8 characters', async () => {
    await expect(createUserService.execute({
      username: 'Migufe',
      password: 'sp9'
    })).rejects.toEqual(new AppError('The password must be at least 8 characters long'))
  })

  it('Should not be able to create a new user with a password without a capital letter', async () => {
    await expect(createUserService.execute({
      username: 'Migufe',
      password: 'superpassword1!'
    })).rejects.toEqual(new AppError('The password must have a capital letter'))
  })

  it('Should not be able to create a new user with a password without a number', async () => {
    await expect(createUserService.execute({
      username: 'Migufe',
      password: 'superPassword!'
    })).rejects.toEqual(new AppError('The password must have a number'))
  })

  it('Should not be able to create a new user with a password without a special character', async () => {
    await expect(createUserService.execute({
      username: 'Migufe',
      password: 'superPassword9'
    })).rejects.toEqual(new AppError('The password must have a special character'))
  })

  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      username: 'Migufe',
      password: 'superPassword1!'
    })

    expect(user).toHaveProperty('id')
  })
})