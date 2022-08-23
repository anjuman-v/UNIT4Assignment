
const express = require("express")

const app = express()

app.use(express.json()); 

module.export = app;
const userControls = require("./controller/userCont");

app.use("/.users",userConts);