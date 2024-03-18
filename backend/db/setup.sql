DROP TABLE IF EXISTS "planted_veg";
DROP TABLE IF EXISTS "all_plants";
DROP TABLE IF EXISTS "auth_session";
DROP TABLE IF EXISTS "user";


CREATE TABLE "user"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "username" VARCHAR(24) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "preferences" JSON NULL
);

CREATE TABLE "auth_session"(
    "token" CHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    "user" INTEGER NOT NULL REFERENCES "user"
);

CREATE TABLE "all_plants"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(24) NOT NULL,
    "latin_name" VARCHAR(48) NOT NULL,
    "description" TEXT NOT NULL,
    "season" CHAR(6) NOT NULL,
    "soil" VARCHAR(24) NOT NULL,
    "watering_freq" INTEGER NOT NULL,
    "harvesting" TEXT NOT NULL,
    "sow_indoors_start" DATE NOT NULL,
    "sow_indoors_end" DATE NOT NULL,
    "sow_outdoors_start" DATE NOT NULL,
    "sow_outdoors_end" DATE NOT NULL,
    "harvest_start" DATE NOT NULL,
    "harvest_end" DATE NOT NULL,
    "germination_min" INTEGER NOT NULL,
    "germination_max" INTEGER NOT NULL,
    "storage" TEXT NOT NULL,
    "sow_and_plant_info" TEXT NOT NULL
);

CREATE TABLE "planted_veg"(
    "id" INTEGER NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "user" INTEGER NOT NULL REFERENCES "user",
    "plant_id" INTEGER NOT NULL REFERENCES all_plants,
    "growth_stage" INTEGER NOT NULL,
    "date_planted" DATE NOT NULL
);