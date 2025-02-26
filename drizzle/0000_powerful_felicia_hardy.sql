CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role_id" integer
);
--> statement-breakpoint
CREATE TABLE "user_address" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer,
	"zip_code" varchar(255) NOT NULL,
	"city" varchar(255),
	"country" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "user_info" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer,
	"full_name" varchar(255) NOT NULL,
	"age" integer,
	"gender" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_user_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;