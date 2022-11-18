import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAccount1668525120771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'balance',
            type: 'integer',
            default: 100
          },
          {
            name: 'userId',
            type: 'uuid'
          }
        ],
        foreignKeys: [
					{
						name: 'AccountUser',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['userId'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts')
  }
}
