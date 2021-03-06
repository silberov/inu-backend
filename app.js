require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const mainRouter = require("./routes/");

const errorHandling = require("./middleware/error-handling.middleware");

// Automatically parses the body and makes it into a javascript object, if JSON.
app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: true }));
// welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Inu Health API" });
});

app.use("/api", mainRouter);

// app.use(userRouter);
// app.use(passwordRouter);

app.use("*", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(errorHandling);

module.exports = app;
