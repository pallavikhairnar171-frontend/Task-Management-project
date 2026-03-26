import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/users.model.js";
import resend from "../config/nodemailer.js";

const register = async (req, res) => {
  const { name, email, password, role, themeId } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(404)
      .json({ succes: false, message: "Details missing !" });
  }

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .json({ succes: false, message: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.MODE_OF_NODE_ENV === "production",
      sameSite:
        process.env.MODE_OF_NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const mailUserOption = {
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to project",
      text: `Welcome ${name} your account has been created with email id:${email}`,
    };

    await resend.emails.send(mailUserOption);
    return res
      .status(201)
      .json({ succes: true, message: "User register successfully" });
  } catch (err) {
    res.json({ succes: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res
      .status(401)
      .json({ succes: false, message: "Email,Password and Role are requires" });
  }
  try {
    const user = await userModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(401).json({ succes: false, message: "Invalid email" });
    }
    const isPassMathch = await bcrypt.compare(password, user.password);
    if (!isPassMathch) {
      return res
        .status(401)
        .json({ succes: false, message: "Invalid password" });
    }
    if (user.role !== role) {
      return res.status(401).json({ succes: false, message: "Invalid Role" });
    }
    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.MODE_OF_NODE_ENV === "production",
      sameSite:
        process.env.MODE_OF_NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log(req.body, "login console");
    const data = {
      user: user,
      token: token,
    };
    return res
      .status(200)
      .json({ ...data, succes: true, message: "User logdin successfully" });
  } catch (err) {
    res.json({ succes: false, message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.MODE_OF_NODE_ENV === "production",
      sameSite:
        process.env.MODE_OF_NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json({ succes: true, message: "User Logged Out" });
  } catch (err) {
    return res.json({ succes: false, message: err.message });
  }
};

const sendVerificationCode = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById({ _id: userId });
    if (user.isVerifiredUser) {
      return res.status(409).json({
        succes: false,
        message: "Account is already verifired",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtpByEmail = otp;
    user.verifyOtpExpriredAt = Date.now() * 24 * 60 * 60 * 1000;
    user.save();
    console.log(process.env.SENDER_EMAIL_ID, user.email);
    const mailUserOption = {
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "OPT sent to verifiy account",
      text: `You have recived otp is ${otp} . Please verify your account has been created with email id:${user.email}`,
    };
    await resend.emails.send(mailUserOption);

    return res.status(202).json({
      succes: true,
      message: "Verification code is send on email",
    });
  } catch (err) {
    return res.json({ succes: false, message: err.message });
  }
};

const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res
      .status(400)
      .json({ succes: false, message: "Details are missing" });
  }
  try {
    const user = await userModel.findById({ _id: userId });
    console.log(user, "===");
    if (!user) {
      return res
        .status(404)
        .json({ succes: false, message: "user not found!" });
    }
    if (user.verifyOtpByEmail === "" || user.verifyOtpByEmail !== otp) {
      return res.status(401).json({ succes: false, message: "Invalid otp" });
    }
    if (user.verifyOtpExpriredAt < Date.now()) {
      return res.status(410).json({ succes: false, message: "Exprired OTP" });
    }
    user.isVerifiredUser = true;
    user.verifyOtp = "";
    user.verifyOtpExpriredAt = 0;
    await user.save();
    return res
      .status(204)
      .json({ succes: true, message: "Email verifired successfully" });
  } catch (err) {
    return res.json({ succes: false, message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    const newUser = [];
    users.forEach((el) => {
      const { name, role, email, _id } = el;
      let obj = {
        label: name,
        value: {
          name,
          role,
          email,
          _id,
        },
      };
      newUser.push(obj);
    });
    return res.status(200).json({
      success: true,
      message: "User List Faitch successfully",
      users: newUser,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export {
  register,
  login,
  logout,
  sendVerificationCode,
  verifyOtp,
  getAllUsers,
};
