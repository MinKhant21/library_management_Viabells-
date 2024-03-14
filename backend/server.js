const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/user");
const booksRoutes = require("./src/routes/books");
const {verifyToken,checkUserRole} = require("./src/middleware/authMiddleware");
dotenv.config();
const port = process.env.PORT || 8000;

let app = express();

// Other middleware
app.use(morgan(`:date[clf] :method :url :status :response-time ms`));
// Uncomment the cors middleware
app.use(cors());

// Set up body-parser middleware to parse application/x-www-form-urlencoded and application/json

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api/books", verifyToken,booksRoutes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
