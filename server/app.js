const express = require("express");
const morgan = require("morgan");
const userRouter = require("./Routes/userRoute");
const cors = require("cors");
const appError = require("./Utils/appError");
const globalErrorController = require("./Controller/globalErrorController");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/user", userRouter);

app.use("*", (req, res, next) => {
  return next(new appError("Invalid url", 400));
});

app.use(globalErrorController);

module.exports = app;
