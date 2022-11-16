import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "../../accounts/entity/Account"

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @OneToOne(() => Account, account => account.id)
  @JoinColumn()
  account: Account

  @Column('uuid')
  accountId: string
}