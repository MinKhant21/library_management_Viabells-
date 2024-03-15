const { User } = require("../models");
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../helper/auth");
const { where } = require("sequelize");
const UserReposities = {
  create: async (data) => {
    const { name, email, password } = data;
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return {
        status: "404",
        message: "User already exists",
      };
    }

    try {
      // Create the user
      const hashedPassword = await hashPassword(password);
      const user = await User.create({ name, email, password: hashedPassword });

      return {
        status: "200",
        message: "User registered",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
  login: async (data) => {
    try {
      let { email, password } = data;
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        return {
          status: "404",
          message: "User not exists",
        };
      }
      let Token = await generateToken(user);
      let result = await comparePassword(password, user.password);
      if (result != true) {
        return {
          status: "503",
          message: "password mismatch",
        };
      }
      return {
        status: "200",
        message: "User Successfully Login",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: Token,
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
  getAll: async () => {
    try {
      let users = await User.findAll({
        where: { role: "user" },
        attributes: ["user_id", "name", "email"],
      });
      return {
        status: "200",
        message: "Users List",
        data: users,
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
};
module.exports = UserReposities;
