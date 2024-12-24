"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Addrents1733898471813 = void 0;
class Addrents1733898471813 {
    constructor() {
        this.name = 'Addrents1733898471813';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "rents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "estate_id" uuid NOT NULL, "lodger_id" uuid NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "rent" integer NOT NULL, "charges" integer NOT NULL, CONSTRAINT "PK_43a9961f1448a8d75f9b25156ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0c22efc342731524622af376f0" ON "rents" ("estate_id", "lodger_id", "start_date", "end_date") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_0c22efc342731524622af376f0"`);
        await queryRunner.query(`DROP TABLE "rents"`);
    }
}
exports.Addrents1733898471813 = Addrents1733898471813;
//# sourceMappingURL=1733898471813-addrents.js.map