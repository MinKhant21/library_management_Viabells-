const { User } = require("../models");
const { hashPassword } = require("../helper/auth");
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
};
module.exports = UserReposities;
