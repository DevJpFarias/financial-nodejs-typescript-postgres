import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTransaction1668525299678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'value',
            type: 'numeric',
          },
          {
            name: 'createdAt',
            type: 'timestamp'
          },
          {
            name: 'debitedAccountId',
            type: 'uuid'
          },
          {
            name: 'creditedAccountId',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'DebitTransactionAccount',
						referencedTableName: 'accounts',
						referencedColumnNames: ['id'],
						columnNames: ['debitedAccountId'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
          },
          {
            name: 'CreditedTransactionAccount',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['creditedAccountId'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions')
  }
}
