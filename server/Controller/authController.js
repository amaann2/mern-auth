const appError = require("../Utils/appError");
const User = require("./../Model/userModel");
const catchAsyncError = require("../Utils/catchAsyncError");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../natours/utils/email");
const crypto = require("crypto");
const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
const sendToken = (user, res, statusCode) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

exports.signup = catchAsyncError(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  sendToken(user, res, 200);
});

exports.login = catchAsyncError(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new appError("Please provide the email and password", 400));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (
    !user ||
    !(await user.correctPassword(req.body.password, user.password))
  ) {
    return next(new appError("Incorrect Email and Password", 401));
  }

  sendToken(user, res, 200);
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new appError("there is no user with this email address", 401));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:3000/${user._id}/${resetToken}`;

  const message = `Forgot your Password? \n \n  Change Password here : ${resetUrl}. \n \n \n  If you didn't forget your password, please ignore this email!`;

  try {
    sendEmail({
      email: user.email,
      subject: "Your Password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token send to email",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetExpiresPassword = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new appError(
        "There was an error sending the email . Try again later!",
        500
      )
    );
  }
});
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetExpiresPassword: { $gt: Date.now() },
  });
  if (!user) {
    return next(new appError("Token is invalid or has expired", 400));
  }
  // 2) IF token has not expired , and there is user , set the new password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetExpiresPassword = undefined;
  await user.save();
  // 3) update changePasswordAt property for the user - implemented in the userschma.pre('save')  method
  // 4) Log the user in , send JWT

  sendToken(user, res, 200);
});
