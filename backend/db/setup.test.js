// @vitest-environment node
const db = require("./db");
const fs = require("fs");

const mockQuery = vi.fn(() => Promise.resolve());
db.query = mockQuery;

afterEach(() => {
    vi.resetAllMocks();
});

it("should successfully query the database for initial setup", async () => {
    require("./setup");
    expect(mockQuery.mock.calls.length).toBe(1);
    
    const sql = fs.readFileSync(__dirname + "/setup.sql").toString();
    expect(mockQuery.mock.calls[0][0]).toBe(sql);
});
