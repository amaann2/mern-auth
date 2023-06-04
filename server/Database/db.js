const mongoose = require("mongoose");

const connectionToDatabse = () => {
  mongoose
    .connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database is connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectionToDatabse;
