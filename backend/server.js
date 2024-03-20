const app = require("./app");
require("dotenv").config({
    path: [".env", "../.env"]
});

const port = process.env.PORT ?? 8080;
app.listen(port, () => console.log(`Server listening on port ${port}.`));
