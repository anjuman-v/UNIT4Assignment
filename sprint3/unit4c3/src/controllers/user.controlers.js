const express = require("express")
const User = require("../models/user.model")

const User = require("../models/user.model");
const router = express.Router();

router.post("",
body("firstName").trim().not().isEmpty().withMessage("First Name cannot be empty").isLength({min:3,max:30}),
body("lastName").trim().not().isEmpty().withMessage("First Name cannot be empty").isLength({min:3,max:30}),
body("age").not().isEmpty().withMessage("Age cannot be empty").isNumeric().withMessage("Age must be a number between 1 to 150")
.custom((val) => {
    if(val < 1 || val>150){
        throw new Error("Incorrect age provided");
    }
    return true;
})



)

module.exports = router;


