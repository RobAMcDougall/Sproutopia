// @vitest-environment node
const app = require("./app");

const mockListen = vi.fn();
app.listen = mockListen;

afterEach(() => {
    vi.resetAllMocks();
});

it("should successfully start a backend server", async () => {
    require("./server");
    expect(mockListen.mock.calls.length).toBe(1);
    expect(mockListen.mock.calls[0][0]).toBe(process.env.PORT ?? 8080);
});
