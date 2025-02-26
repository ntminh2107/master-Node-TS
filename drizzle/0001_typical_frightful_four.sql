CREATE TABLE "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_role_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;