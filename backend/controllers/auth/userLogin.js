import AppError from "../../error/appError.js";
import User from "../../models/userModel.js";
import { generateToken } from "../../utils/token.js";

// Request type: POST
// To: /api/v1/auth/signin
// Desc: to login a user
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next(new AppError("email is required!", 400));
    }
    if (!password) {
      return next(new AppError("password is required!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("Invalid email or password!", 400));
    }

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return next(new AppError("Invalid email or password!", 400));
    }
  } catch (error) {
    return next(error);
  }
};

export default signIn;
