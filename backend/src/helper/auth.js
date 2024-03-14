const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const bcryptFormat = process.env.BCRYPT_ROUND;

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 1 * 12);
};


exports.comparePassword = async (password, hashPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

exports.generateToken = (data) => {
     let user = {
          name : data.name,
          email : data.name,
          role : data.role
     }
  return jwt.sign(user, process.env.TOKEN_SECRET_KEY);
};
