import { database } from './database-connection-helper'

export const connection = async () => await database.initialize().catch(error => console.error(error))