"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserIdInRents1734759227117 = void 0;
class AddUserIdInRents1734759227117 {
    constructor() {
        this.name = 'AddUserIdInRents1734759227117';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_0c22efc342731524622af376f0"`);
        await queryRunner.query(`ALTER TABLE "rents" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1bdd408f7900b431b68ebf94e" ON "rents" ("user_id", "estate_id", "lodger_id", "start_date", "end_date") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_f1bdd408f7900b431b68ebf94e"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP COLUMN "user_id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0c22efc342731524622af376f0" ON "rents" ("estate_id", "lodger_id", "start_date", "end_date") `);
    }
}
exports.AddUserIdInRents1734759227117 = AddUserIdInRents1734759227117;
//# sourceMappingURL=1734759227117-addUserIdInRents.js.map