import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnDeleteUser1684887441462 implements MigrationInterface {
    name = 'AddColumnDeleteUser1684887441462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
