import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1659539006027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'username',
            type: 'varchar'
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'accountId',
            type: 'uuid'
          }
        ],
        foreignKeys: [
					{
						name: 'UserAccount',
						referencedTableName: 'accounts',
						referencedColumnNames: ['id'],
						columnNames: ['accountId'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
