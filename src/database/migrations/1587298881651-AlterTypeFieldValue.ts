import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTypeFieldValue1587298881651
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'transactions',
      'value',
      new TableColumn({
        name: 'value',
        type: 'double precision',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'transactions',
      'value',
      new TableColumn({
        name: 'value',
        type: 'decimal',
      }),
    );
  }
}
