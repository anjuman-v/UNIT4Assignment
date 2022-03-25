const express = require("express");

const app = express();

app.use(express.json());

module.exports = app;


const userCont = require("./controllers/usercontrollers");

app.use("/users", userCont);


const galleryCont = require("./controllers/gallerycontrollers");

app.use("/gallery", galleryCont);