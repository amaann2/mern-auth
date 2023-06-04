const appError = require("../Utils/appError");
const User = require("./../Model/userModel");
const catchAsyncError = require("../Utils/catchAsyncError");

exports.signup = catchAsyncError(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new appError("There is no user with this email id", 400));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {});
exports.resetPassword = catchAsyncError(async (req, res, next) => {});
