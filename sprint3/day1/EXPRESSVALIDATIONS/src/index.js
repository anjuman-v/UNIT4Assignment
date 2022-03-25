const express = require("express")

const app = express();

app.use(express.json());

module.exports = app;

const userCont = require("./controllers/userCont")

app.use("/users",userCont);