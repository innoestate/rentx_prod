"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameOfTheMigration1734070952192 = void 0;
class NameOfTheMigration1734070952192 {
    constructor() {
        this.name = 'NameOfTheMigration1734070952192';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "docs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "rents_google_sheet_id" character varying NOT NULL, CONSTRAINT "PK_3a13e0daf5db0055b25d829f2f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7bd4d5e18d4af496ad3c77e618" ON "docs" ("user_id") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_7bd4d5e18d4af496ad3c77e618"`);
        await queryRunner.query(`DROP TABLE "docs"`);
    }
}
exports.NameOfTheMigration1734070952192 = NameOfTheMigration1734070952192;
//# sourceMappingURL=1734070952192-nameOfTheMigration.js.map