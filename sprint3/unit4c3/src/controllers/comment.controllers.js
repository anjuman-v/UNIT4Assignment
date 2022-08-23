const express = require ("express");
const {body, validationResult}= require("express-validator");
const Comment = require("../models/comment.model");
const router = express.Router();


module.exports = router;