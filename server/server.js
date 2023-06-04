const connectionToDatabase = require("./Database/db");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

connectionToDatabase();

const PORT = process.env.PORT || 1337
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
