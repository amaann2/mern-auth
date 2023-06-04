const express = require("express");
const morgan = require("morgan");
const userRouter = require("./Routes/userRoute");
const cors = require("cors");
const appError = require("./Utils/appError");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1/user", userRouter);
app.use("*", (req, res, next) => {
    return next(new appError('Invalid url',400))
});
// app.use(globalErrorController);
module.exports = app;
