import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddUserIdInRents1734759227117 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
