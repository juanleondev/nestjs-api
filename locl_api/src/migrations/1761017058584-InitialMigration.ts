import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1761017058584 implements MigrationInterface {
    name = 'InitialMigration1761017058584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "communities_original_creator_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "communities_place_id_fkey"`);
        await queryRunner.query(`DROP INDEX "public"."communities_description_trgm"`);
        await queryRunner.query(`DROP INDEX "public"."communities_name_trgm"`);
        await queryRunner.query(`DROP INDEX "public"."idx_communities_place_id"`);
        await queryRunner.query(`DROP INDEX "public"."communities_tag_ids_idx"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "place_id"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "banned"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "deleted"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "disabled"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "banner_image"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "draft"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "draft_has_about"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "draft_has_location_and_socials"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "draft_has_privacy"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "headline"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "internal_update_id"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "original_creator_id"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "visibility"`);
        await queryRunner.query(`DROP TYPE "public"."community_visibility"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "read_only"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "socials"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."community_type"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "stats"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "communities_firestore_id_key"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "firestore_id"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "domain_name"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "tag_ids"`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "location" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "tag_ids" uuid array DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "domain_name" text`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "firestore_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "communities_firestore_id_key" UNIQUE ("firestore_id")`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "stats" jsonb`);
        await queryRunner.query(`CREATE TYPE "public"."community_type" AS ENUM('UNKNOWN_COMMUNITY_TYPE', 'HEALTH_AND_WELLNESS', 'FOOD_AND_DRINK', 'BUSINESS_AND_NETWORKING', 'NON_PROFIT', 'CREATIVE', 'CLUBS_AND_GATHERINGS', 'TECHNOLOGY_AND_DESIGN', 'FAMILY_AND_PARENTING', 'ADVOCACY', 'SPORTS_AND_RECREATION', 'FAITH_AND_SPIRITUALITY', 'NEIGHBORHOODS', 'EDUCATION_AND_LEARNING', 'ENTERTAINMENT', 'HOBBIES_AND_INTERESTS', 'POLITICS_AND_CIVICS')`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "type" "public"."community_type" NOT NULL DEFAULT 'UNKNOWN_COMMUNITY_TYPE'`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'utc')`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "socials" jsonb`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "read_only" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."community_visibility" AS ENUM('public', 'private', 'hidden')`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "visibility" "public"."community_visibility" NOT NULL DEFAULT 'public'`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "original_creator_id" uuid`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "internal_update_id" smallint DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "headline" text`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "draft_has_privacy" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "draft_has_location_and_socials" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "draft_has_about" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "draft" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "banner_image" jsonb`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "disabled" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "deleted" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "banned" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "place_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "communities_tag_ids_idx" ON "communities" ("tag_ids") `);
        await queryRunner.query(`CREATE INDEX "idx_communities_place_id" ON "communities" ("place_id") `);
        await queryRunner.query(`CREATE INDEX "communities_name_trgm" ON "communities" ("name") `);
        await queryRunner.query(`CREATE INDEX "communities_description_trgm" ON "communities" ("description") `);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "communities_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "communities_original_creator_id_fkey" FOREIGN KEY ("original_creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
