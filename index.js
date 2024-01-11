require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 8000;
const app = express();

const authMiddleware = require("./middlewares/authMiddleware");
const rootRoutes = require("./routes/root");
const secureRoutes = require("./routes/secure");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", rootRoutes);
app.use("/secure", authMiddleware, secureRoutes);

app.listen(port, () => {
  console.log(`Server heard on  http://localhost:${port}`);
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Database connected");
  });
});
