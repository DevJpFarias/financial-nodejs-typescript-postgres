import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '../../modules/users/repositories/UsersRepository'

interface IPayload {
	sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization

	if(!authHeader) throw new AppError('Token Missing!', 401)

	const [, token] = authHeader.split(' ')

	try {
		const { sub: userId } = verify(token, '9a995dcc78cda3b260931850c486a6ba') as IPayload
		
		const usersRepository = new UsersRepository()
		const user = await usersRepository.findUserById({
      id: userId
    })

		if(!user) throw new AppError('User not exists!')

		request.user = {
			id: userId
		}

		return next()
	} catch (error) {
		throw new AppError('Invalid Token!')
	}	
}