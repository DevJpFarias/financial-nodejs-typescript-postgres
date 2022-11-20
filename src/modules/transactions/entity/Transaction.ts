import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "../../accounts/entity/Account";

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Account, account => account.id)
  debitedAccount: Account

  @Column('uuid')
  debitedAccountId: string

  @ManyToOne(() => Account, account => account.id)
  creditedAccount: Account

  @Column('uuid')
  creditedAccountId: string

  @Column()
  value: number
  
  @CreateDateColumn()
  createdAt: string
}