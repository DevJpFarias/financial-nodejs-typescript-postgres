import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entity/User";

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 100 })
  balance: number

  @OneToOne(() => User, user => user.account)
  @JoinColumn()
  user: User

  @Column()
  userId: string
}