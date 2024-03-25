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
    "season" VARCHAR(12) NOT NULL,
    "soil" VARCHAR(50) NOT NULL,
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
    "sow_and_plant_info" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL
);

CREATE TABLE "planted_veg"(
    "id" INTEGER NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "user" INTEGER NOT NULL REFERENCES "user",
    "plant_id" INTEGER NOT NULL REFERENCES all_plants,
    "growth_stage" INTEGER NOT NULL,
    "date_planted" DATE NOT NULL
);

INSERT INTO "user" ("username", "password", "email")
VALUES 
    ('john_doe', 'hashed_password_123', 'john@example.com'),
    ('jane_smith', 'hashed_password_456', 'jane@example.com'),
    ('bob_jackson', 'hashed_password_789', 'bob@example.com');

INSERT INTO all_plants ("name", "latin_name", "description", "season", "soil", "watering_freq", "harvesting", "sow_indoors_start", "sow_indoors_end", "sow_outdoors_start", "sow_outdoors_end", "harvest_start", "harvest_end", "germination_min", "germination_max", "storage", "sow_and_plant_info", "image_url", "icon_url")
VALUES 
    ('Tomato', 'Solanum lycopersicum', 'Tomatoes are the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant.', 'Summer', 'Well-drained, fertile soil', 2, 'Harvest when the fruits are ripe.', '2024-03-01', '2024-04-15', '2024-04-15', '2024-05-15', '2024-06-15', '2024-09-15', 7, 14, 'Store in a cool, dry place.', 'Sow indoors in pots or trays.', 'https://example.com/tomato.jpg', 'https://i.ibb.co/3BbZpgb/tomato.png'),
    ('Lettuce', 'Lactuca sativa', 'Lettuce is a leafy vegetable that is often used in salads.', 'Spring, Fall', 'Well-drained, loamy soil', 1, 'Harvest the outer leaves as needed.', '2024-02-15', '2024-03-15', '2024-03-15', '2024-04-15', '2024-04-15', '2024-05-30', 7, 10, 'Store in the refrigerator.', 'Sow directly into the garden bed.', 'https://example.com/lettuce.jpg', 'https://example.com/lettuce.jpg');


INSERT INTO planted_veg ("user", "plant_id", "growth_stage", "date_planted")
VALUES
    (1, 1, 2, '2024-03-05'),
    (2, 2, 1, '2024-03-10');