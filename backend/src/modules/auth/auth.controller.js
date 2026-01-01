import { registerValidator, loginValidator } from "./auth.validator.js";
import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { error, value } = registerValidator.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const user = await registerUser(value);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { error, value } = loginValidator.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const result = await loginUser(value);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};