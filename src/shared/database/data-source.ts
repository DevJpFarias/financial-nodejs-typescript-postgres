import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "../../modules/accounts/entity/Account"
import { Transaction } from "../../modules/transactions/entity/Transaction"
import { User } from "../../modules/users/entity/User"

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "ng-challenge",
    entities: [Account, Transaction, User],
    migrations: [
        'src/migrations/*.ts'
    ]
})
