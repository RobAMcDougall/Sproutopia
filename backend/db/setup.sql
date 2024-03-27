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
    "season" VARCHAR(20) NOT NULL,
    "soil" VARCHAR(100) NOT NULL,
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
    "plant_id" INTEGER NOT NULL REFERENCES "all_plants",
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
    ('Tomato',
    'Solanum lycopersicum',
    'Tomatoes are the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant.',
    'Summer',
    'Well-drained, fertile soil',
    2,
    'Harvest when the fruits are ripe.',
    '2024-03-01',
    '2024-04-15',
    '2024-04-15',
    '2024-05-15',
    '2024-06-15',
    '2024-09-15',
    7,
    14,
    'Store in a cool, dry place.',
    'Sow indoors in pots or trays.',
    'https://www.gardenersdream.co.uk/images/supersweet-tomato-plant-p6363-47040_image.jpg', 'https://i.ibb.co/vVFLNx3/tomato.png'
),
   ('Lettuce', 'Lactuca sativa', 'Lettuce is a leafy vegetable that is often used in salads.', 'Spring, Fall', 'Well-drained, loamy soil', 1, 'Harvest the outer leaves as needed.', '2024-02-15', '2024-03-15', '2024-03-15', '2024-04-15', '2024-04-15', '2024-05-30', 7, 10, 'Store in the refrigerator.', 'Sow directly into the garden bed.', 'https://cdn.pixabay.com/photo/2015/09/14/19/53/nature-940032_1280.jpg', 'https://i.ibb.co/yXCtW9t/lettuce.png'),
   ('Carrot', 'Daucus carota subsp. sativus', 'Carrot is a root vegetable known for its bright orange colour and sweet flavour.', 'Spring, Fall', 'Loose, well-drained soil free from rocks', 2, 'Harvest when roots reach desired size.', '2024-02-15', '2024-03-31', '2024-03-15', '2024-06-15', '2024-06-15', '2024-09-30', 10, 21, 'Store in a cool, humid environment or refrigerate.', 'Sow seeds directly into the garden bed.', 'https://cdn.pixabay.com/photo/2017/09/12/20/03/carrot-2743498_1280.jpg','https://i.ibb.co/YLKcLcR/carrot.png'),
   ('Spinach', 'Spinacia oleracea', 'Spinach is a leafy green vegetable rich in iron and vitamins.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest outer leaves as needed.', '2024-02-01', '2024-03-15', '2024-03-01', '2024-05-15', '2024-04-01', '2024-06-30', 5, 10, 'Store in the refrigerator.', 'Sow seeds directly into the garden bed.', 'https://cdn.pixabay.com/photo/2016/01/07/07/57/vegetables-1125420_1280.jpg', 'www.example.com'),
    ('Cucumber', 'Cucumis sativus', 'Cucumber is a refreshing vegetable often used in salads and pickles.', 'Spring, Summer', 'Well-drained, fertile soil', 3, 'Harvest when fruits are firm and dark green.', '2024-03-01', '2024-04-15', '2024-04-01', '2024-06-01', '2024-06-15', '2024-09-30', 7, 14, 'Store in the refrigerator.', 'Start seeds indoors or directly sow seeds outdoors after the last frost.', 'https://www.rootsplants.co.uk/cdn/shop/products/VEG0210-1.jpg?v=1676565455', 'www.example.com'), 
    ('Bell Pepper', 'Capsicum annuum', 'Bell pepper is a sweet pepper available in various colours, including red, green, and yellow.', 'Spring, Summer', 'Well-drained, fertile soil', 2, 'Harvest when fruits reach desired size and colour.', '2024-02-15', '2024-03-31', '2024-03-15', '2024-05-01', '2024-06-15', '2024-10-31', 7, 14, 'Store in the refrigerator.', 'Start seeds indoors before the last frost or directly sow seeds outdoors after the last frost.', 'https://www.thespruce.com/thmb/bcIgW0mHRMLXfu3Nc4tKM94tpCk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1323318476-ea577b06f3f5437da3999be527c458dc.jpg','https://i.ibb.co/pXsTTgn/bellpepper.png'),
    ('Broccoli', 'Brassica oleracea var. italica', 'Broccoli is a nutritious vegetable with green flower heads and stalks.', 'Spring, Fall', 'Well-drained, fertile soil rich in organic matter', 3, 'Harvest main head when compact and firm; side shoots will continue to produce.', '2024-02-01', '2024-03-15', '2024-03-01', '2024-05-15', '2024-06-15', '2024-10-31', 5, 10, 'Store in the refrigerator.', 'Start seeds indoors before the last frost or directly sow seeds outdoors after the last frost.', 'https://cdn.mos.cms.futurecdn.net/CEjc8EEuRtVQ52SXbDw4jZ-1280-80.jpg.webp', 'https://i.ibb.co/MpzzwJn/broccoli.png'),
    ('Courgette', 'Cucurbita pepo', 'Courgette is a summer squash with a tender texture and mild flavour.', 'Spring, Summer', 'Well drained, fertile soil', 1, 'Harvest when fruits are young and tender.', '2024-04-01', '2024-05-01', '2024-04-15', '2024-06-01', '2024-06-30', '2024-09-30', 5, 10, 'Store in the refrigerator.', 'Start seeds indoors or directly sow seeds outdoors after the last frost.', 'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2020/06/GettyImages-149402799_393337062_683500682-825x920.jpg','www.example.com'),
    ('Potato', 'Solanum tuberosum', 'Potato is a starchy tuber vegetable grown underground.', 'Spring, Summer', 'Well-drained, loose soil', 3, 'Harvest when plants start to die back; dig up tubers carefully.', '2024-03-01', '2024-04-15', '2024-04-01', '2024-05-15', '2024-07-01', '2024-09-30', 14, 21, 'Store in a cool, dark place away from light.', 'Plant whole or cut seed potatoes with eyes into the soil.', 'https://www.growlikegrandad.co.uk/wp-content/uploads/2019/07/flowers-on.jpg', 'www.example.com'),
    ('Radish', 'Raphanus sativus', 'Radish is a root vegetable known for its crisp texture and peppery flavour.', 'Spring, Fall', 'Well-drained, loose soil', 3, 'Harvest when roots reach desired size.', '2024-02-15', '2024-03-15', '2024-03-01', '2024-05-01', '2024-04-15', '2024-06-30', 3, 7, 'Store in the refrigerator.', 'Sow seeds directly into the garden bed.', 'https://www.thespruce.com/thmb/4jE9V2xk7AgcuGhkO5rphduGs3Q=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/growing-radishes-in-the-home-vegetable-garden-1403477-02-c295e04667df4c8fac380a5543b663e1.jpg','https://i.ibb.co/HKNjxnp/radish.png'), 
    ('Peas', 'Pisum sativum', 'Peas are sweet, tender legumes often eaten fresh or cooked.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest when pods are plump and peas are tender.', '2024-02-15', '2024-03-31', '2024-03-15', '2024-05-01', '2024-05-15', '2024-07-15', 7, 14, 'Store in the refrigerator.', 'Directly sow seeds outdoors after the last frost.', 'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2020/05/EC7B0T_390022011_674537121-scaled-e1589293391958-767x920.jpg','www.example.com'),
    ('Cabbage', 'Brassica oleracea var. capitata', 'Cabbage is a leafy vegetable with dense, compact heads.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest when heads are firm and solid.', '2024-02-01', '2024-03-15', '2024-03-01', '2024-05-01', '2024-06-15', '2024-10-31', 5, 10, 'Store in the refrigerator.', 'Start seeds indoors before the last frost or directly sow seeds outdoors after the last frost.', 'https://www.thespruce.com/thmb/zMuVL9LUjk1jPSFs_dAXXCrxhsA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-grow-cauliflower-1403494-hero-76cf5f524a564adabb1ac6adfa311482.jpg','https://i.ibb.co/x34R5cF/cabbage.png'),
    ('Onion', 'Allium cepa', 'Onion is a bulb vegetable with layers of pungent flesh.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest when tops begin to yellow and fall over.', '2024-02-15', '2024-03-31', '2024-03-15', '2024-05-01', '2024-07-01', '2024-09-30', 7, 14, 'Cure bulbs in a dry, ventilated area before storing in a cool, dark place.', 'Start seeds indoors or directly sow sets outdoors.', 'https://www.rootsplants.co.uk/cdn/shop/files/whiteonions.jpg?v=1709040901','www.example.com'),
    ('Spring Onion', 'Allium fistulosum', 'Spring onion, also known as scallion or green onion, is a type of onion with long, slender green stalks and small white bulbs.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest when stalks are about 6-8 inches tall; cut leaves as needed, leaving the bulb and roots intact for regrowth.', '2024-02-01', '2024-03-01', '2024-03-15', '2024-05-01', '2024-04-30', '2024-06-30',7, 14, 'Store unwashed in the refrigerator; use within a week for best flavour.', 'Directly sow seeds outdoors in rows, spacing them about 1 inch apart. Sow seed in succession every 2 to 3 weeks to have a regular supply throughout the summer', 'https://blog.stihl.co.uk/wp-content/uploads/2022/10/Spring_onions_growing_in_soil.jpg', 'www.example.com'),
    ('Garlic', 'Allium sativum', 'Garlic is a pungent bulb vegetable used for flavouring various dishes.', 'Fall', 'Well-drained, fertile soil', 3, 'Harvest when tops begin to yellow and fall over.', '2024-03-01', '2024-04-15', '2024-09-01', '2024-11-01', '2024-06-01', '2024-08-31', 14, 21, 'Cure bulbs in a dry, ventilated area before storing in a cool, dark place.', 'Plant individual cloves pointed end up, about 2 inches deep.', 'https://utgardens.tennessee.edu/wp-content/uploads/sites/220/2023/09/garlic.jpg','www.example.com'),
    ('Kale', 'Brassica oleracea var. acephala', 'Kale is a nutrient-rich leafy green with curly or flat leaves.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest outer leaves when young for tender greens.', '2024-02-01', '2024-03-15', '2024-03-01', '2024-05-01', '2024-04-15', '2024-11-30', 5, 10, 'Store in the refrigerator.', 'Start seeds indoors before the last frost or directly sow seeds outdoors after the last frost.', 'https://content.ces.ncsu.edu/media/images/bigstock-Kale-And-Cabbage-Plants-66770539.jpg','www.example.com'),
    ('Beetroot', 'Beta vulgaris', 'Beetroot is a root vegetable known for its deep red colour and earthy flavour.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest when roots reach desired size; leaves can also be harvested for greens.', '2024-02-15', '2024-03-31', '2024-03-15', '2024-05-15', '2024-06-15', '2024-10-31', 7, 14, 'Store roots in the refrigerator; greens can be stored separately.', 'Sow seeds directly into the garden bed.', 'https://plantura.garden/uk/wp-content/uploads/sites/2/2022/08/beetroot-in-ground.jpg','www.example.com'),
    ('Cauliflower', 'Brassica oleracea var. botrytis', 'Cauliflower is a cruciferous vegetable with a dense, white head.', 'Spring, Fall', 'Well-drained, fertile soil rich in organic matter', 3, 'Harvest when heads are compact and firm.', '2024-02-01', '2024-03-15', '2024-03-01', '2024-05-01', '2024-06-15', '2024-10-31', 5, 10, 'Store in the refrigerator.', 'Start seeds indoors before the last frost or directly sow seeds outdoors after the last frost.', 'https://www.thespruce.com/thmb/zMuVL9LUjk1jPSFs_dAXXCrxhsA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-grow-cauliflower-1403494-hero-76cf5f524a564adabb1ac6adfa311482.jpg','https://i.ibb.co/R4GySL2/cauliflower.png'),
 ('Asparagus', 'Asparagus officinalis', 'Asparagus is a perennial vegetable with tender, edible shoots.', 'Spring', 'Well-drained, sandy soil', 3, 'Harvest spears when they reach 6-8 inches tall.', '2024-02-01', '2024-03-01', '2024-03-15', '2024-05-01', '2024-04-15', '2024-06-15', 14, 56, 'Store in the refrigerator.', 'Plant crowns in prepared trenches, spaced 12-18 inches apart.', 'https://help.gardeningexpress.co.uk/wp-content/uploads/2023/04/Untitled-design-8-1536x864.png','www.example.com'),
 ('Corn', 'Zea mays', 'Corn, also known as maize, is a tall grain plant with large ears containing kernels.', 'Spring, Summer', 'Well-drained, fertile soil', 2, 'Harvest when kernels are plump and milky.', '2024-04-15', '2024-05-01', '2024-05-15', '2024-06-15', '2024-07-15', '2024-09-30', 18, 21, 'Consume fresh for best flavour; can also be frozen or canned.', 'Plant seeds directly in the soil after the last frost date, in blocks rather than rows for better pollination.', 'https://bonnieplants.com/cdn/shop/articles/BONNIE-PLANTS_corn-iStock-857670630-2400px_1ce4b5df-20b7-433c-acde-8703235c66be.jpg?v=1642542000&width=1000','www.example.com'),
 ('Artichoke', 'Cynara cardunculus var. scolymus', 'Artichoke is a thistle-like vegetable with edible flower buds.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest buds before they open; secondary buds may develop after the main harvest.', '2024-02-01', '2024-03-01', '2024-03-01', '2024-05-01', '2024-06-15', '2024-09-30', 15, 20, 'Store in the refrigerator.', 'Start seeds indoors in pots; transplant outdoors after the last frost.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Artichoke_J1.jpg/1024px-Artichoke_J1.jpg','www.example.com'),
 ('Rhubarb', 'Rheum rhabarbarum', 'Rhubarb is a perennial vegetable known for its tart-flavoured stalks, often used in desserts and jams.', 'Spring', 'Well-drained, fertile soil', 3, 'Harvest stalks when they reach 12-18 inches in length; do not consume leaves as they are toxic.', '2024-02-01', '2024-03-01', '2024-03-15', '2024-05-01', '2024-04-15', '2024-06-30', 7, 14, 'Store harvested stalks in the refrigerator for up to two weeks.', 'Plant crowns or divisions in well-prepared soil, spaced 3-4 feet apart.', 'https://cdn.shopify.com/s/files/1/0573/3993/6868/t/6/assets/rhubarb---victoria-leaves-garden-1703878142220_1400x.jpg?v=1703878143','www.example.com'),
 ('Pumpkin', 'Cucurbita pepo', 'Pumpkin is a large, round squash with orange flesh, often used in cooking and for decorative purposes.', 'Spring, Summer', 'Well-drained, fertile soil',2, 'Harvest when the skin hardens and turns orange; cut with a sharp knife leaving a few inches of stem attached.', '2024-04-01', '2024-05-01', '2024-04-15', '2024-06-01', '2024-09-01', '2024-10-31', 7, 14, 'Store in a cool, dry place; can last for several months if properly cured and stored.', 'Plant seeds directly in the soil after the last frost date, in hills with several seeds per hill.', 'https://www.thespruce.com/thmb/VtJarYMPycPhExh6NQ5zjL31dSg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-147003040-86f76dfc543d4a719eed6ccd3395c2b7.jpg','www.example.com'),
 ('Bok Choy', 'Brassica rapa subsp. chinensis', 'Bok choy, also known as pak choi, is a type of Chinese cabbage with dark green leaves and white stalks.', 'Spring, Fall', 'Well-drained, fertile soil', 3, 'Harvest when leaves are large and crisp, before they start to flower.', '2024-02-01', '2024-03-01', '2024-03-15', '2024-05-01', '2024-05-15', '2024-07-15', 7, 10, 'Store unwashed in the refrigerator; use within a week for best flavor.', 'Directly sow seeds outdoors in rows or plant seedlings, spacing them about 6 inches apart.', 'https://cdn.mos.cms.futurecdn.net/LGpyymNag8VYynQRNgSMqZ-1280-80.jpg.webp','www.example.com'),
 ('Aubergine', 'Solanum melongena', 'Aubergine, also known as eggplant, is a versatile vegetable with glossy, purple skin and creamy flesh, commonly used in various cuisines.', 'Spring, Summer', 'Well-drained, fertile soil', 3, 'Harvest when fruits are glossy and firm, but still immature; overripe fruits may taste bitter.', '2024-01-01','2024-03-01', '2024-04-01', '2024-06-01', '2024-07-15', '2024-10-15', 7, 21, 'Store in the refrigerator; consume fresh for best flavour.', 'Start seeds indoors in pots before the last frost date; transplant seedlings outdoors after the last frost.', 'https://media.prod.bunnings.com.au/api/public/content/62cd290b41cd4f508a07d25aa0eed53b?v=f7ec37f4&t=w800dpr2','www.example.com'),
 ('Strawberry', 'Fragaria × ananassa', 'Strawberries are sweet, juicy fruits that are widely appreciated for their bright red color and distinct flavor.', 'Spring, Summer', 'Well-drained, fertile soil', 3, 'Harvest when fruits are fully red and ripe.', '2024-01-01','2024-03-01', '2024-03-01', '2024-06-30', '2024-05-01', '2024-08-31', 7, 21, 'Store in the refrigerator; consume fresh for best flavor.', 'Plant bare-root or potted plants in the ground with the crown at soil level; space plants 12-18 inches apart in rows.', 'https://cdn.mos.cms.futurecdn.net/gsyHgga9RwgXSVBPujwmmg-1920-80.jpg.webp','https://i.ibb.co/myJ5Bcd/strawberry.png'),
 ('Raspberry', 'Rubus idaeus', 'Raspberries are delicious, sweet-tart berries that grow on thorny bushes.', 'Summer', 'Well-drained, fertile soil', 3, 'Harvest when berries are fully ripe and easily detach from the plant.', '2024-01-01','2024-03-01', '2024-03-01', '2024-05-31', '2024-07-01', '2024-08-31', 11, 21, 'Store in the refrigerator; consume fresh for best flavor.', 'Plant raspberries in a sunny location with well-drained soil, spacing plants 2-3 feet apart in rows.', 'https://cdn.mos.cms.futurecdn.net/rNnx8ohc9Uo9enajsmZrRY-1920-80.jpg.webp','www.example.com'),  ('Blueberry', 'Vaccinium corymbosum', 'Blueberries are small, sweet berries with a deep blue color, commonly enjoyed fresh or in baked goods.', 'Spring, Summer', 'Acidic, well-drained soil with high organic content', 2, 'Harvest when berries are fully ripe and easily detach from the bush.', '2024-02-01', '2024-03-30', '2024-04-01', '2024-06-30', '2024-07-01', '2024-09-30', 28, 56, 'Store in the refrigerator; consume fresh or freeze for longer storage.', 'Plant blueberries in acidic soil enriched with organic matter; space plants 4-6 feet apart in rows.', 'https://www.thespruce.com/thmb/0k8tYA_KxsO4IMlmiep1KclB2UQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/blueberries-vaccinium-spp-3269245-01-42fb9fde200d4c05a2a5d3c6e94a0bf2.jpg','www.example.com'),
  ('Mint', 'Mentha', 'Mint is a fragrant herb with bright green leaves and a refreshing flavor, commonly used in teas, desserts, and savory dishes.', 'Spring, Summer', 'Well-drained, moist soil', '2', 'Harvest leaves as needed; prune regularly to encourage bushy growth.', '2024-02-01', '2024-03-01', '2024-04-01', '2024-06-01', '2024-05-01', '2024-09-30', 10, 14, 'Store freshly harvested leaves in the refrigerator; can also be dried or frozen for longer storage.', 'Directly sow seeds outdoors in containers or in the ground; mint can also be propagated from cuttings.', 'https://images.herzindagi.info/image/2023/Jun/how-to-grow-mint-plant-at-home-from-cuttings-seeds.jpg','www.example.com'),('Basil', 'Ocimum basilicum', 'Basil is a fragrant herb with bright green leaves and a sweet, slightly peppery flavor, commonly used in Italian and Mediterranean cuisines.', 'Spring, Summer', 'Well-drained, fertile soil', '2', 'Harvest leaves regularly to promote bushy growth; pinch off flower buds to prevent bitterness.', '2024-02-01', '2024-03-01', '2024-04-01', '2024-06-01', '2024-05-01', '2024-09-30', 10, 14, 'Store freshly harvested leaves in the refrigerator; can also be frozen or made into pesto for longer storage.', 'Start seeds indoors in pots before the last frost date; transplant seedlings outdoors after the last frost.', 'https://lawn.com.au/wp-content/uploads/2022/08/how-to-grow-basil-1.jpg', 'www.example.com');



INSERT INTO planted_veg ("user", "plant_id", "growth_stage", "date_planted")
VALUES
    (2, 1, 1, '2024-03-27'),
    (2, 3, 1, '2024-03-20'),
    (2, 6, 1, '2024-03-28'),
    (2, 7, 1, '2024-03-28'),
    (2, 10, 1, '2024-03-28'),
    (2, 12, 1, '2024-03-28'),
    (2, 26, 1, '2024-03-28');