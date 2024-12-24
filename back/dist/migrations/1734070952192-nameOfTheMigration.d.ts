import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NameOfTheMigration1734070952192 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
