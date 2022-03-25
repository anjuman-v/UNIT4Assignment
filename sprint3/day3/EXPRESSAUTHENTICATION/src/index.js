const express = require("express");

const app = express();

const { formatErrors } = require("./utils/validations");

const { body, validationResult } = require("express-validator");

app.use(express.json());

module.exports = app;

const { register, login } = require("./controllers/userControllers");

app.post(
  "/register",
  body("name").isLength({ min: 3 }).withMessage("Name is required & must be atleast 3 characters"),
  body("email").isEmail().withMessage("Please provied valid Email address"),
  body("password").isLength({min:5}).withMessage("Please set Strong Password"),
  register
);

app.post(
  "/login",
  body("email").isEmail().withMessage("Please provied valid Email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Please set Strong Password"),
  login
);



const userCont = require("./controllers/userControllers");

app.use("/users", userCont);


const postCont = require("./controllers/postControllers");

app.use("", postCont);