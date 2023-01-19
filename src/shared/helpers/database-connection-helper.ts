import { DataSource } from 'typeorm'
import { PostgresDataSource } from '../database/data-source'

interface IDatabase {
	[key: string]: DataSource
}

const databases: IDatabase = {
	prod: PostgresDataSource
}

const environment = process.env.NODE_ENV || 'prod'

export const database = databases[environment]