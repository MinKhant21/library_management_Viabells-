const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = {
  verifyToken: (req, res, next) => {
    // Get token from request headers, query parameters, or cookies
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode the token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token" });
      }

      // Attach user information to the request object for easier access
      req.user = decoded;
      next();
    });
  },
  checkUserRole: (role) => {
    return function (req, res, next) {
      if (req.user.role !== role) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      next();
    };
  },
};

module.exports = authMiddleware
