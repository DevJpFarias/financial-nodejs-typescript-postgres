import { Exclude } from "class-transformer"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "../../accounts/entity/Account"

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  @Exclude()
  password: string

  @OneToOne(() => Account, account => account.id)
  account: Account
}