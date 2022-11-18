import 'reflect-metadata'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { userRouter } from './routes/users.routes'
import { AppError } from './errors/AppError'
import { connection } from './helpers/connection-helper'

connection()

const app = express()

app.use(express.json())

app.use(userRouter)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if(err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		})
	}

	console.log(err)

	return response.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	})
})

export { app }