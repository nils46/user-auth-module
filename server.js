const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "sessionsecret123",
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static("public"));

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
