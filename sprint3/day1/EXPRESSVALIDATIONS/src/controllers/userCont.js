const express = require("express");

const { body, validationResult } = require("express-validator");
const { formatErrors } = require("../utils/validations");

const router = express.Router();

const User = require("../models/userModel");

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post(
  "",
  body("firstName").notEmpty().withMessage("Provide proper Name"),
  body("lastName").notEmpty().withMessage("Provide proper Name"),
  body("email").isEmail().withMessage("provide valid email"),
  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("provide valid pincode"),
  body("age").custom(value =>{

    if(value < 1 || value > 100) throw new Error("Please Enter valid age");

    return true;

  }),
  body("gender")
    .custom((value) => {
      if (value != "Male" && value != "Female" && value != "Others")
        throw new Error("Please enter valid gender");

      return true;
    }),
    
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: formatErrors(errors.array()) });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
);

module.exports = router;
