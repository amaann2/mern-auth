const connectionToDatabase = require("./Database/db");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

connectionToDatabase();

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
