
const express = require("express");



//---------importing MODELS -----------



const Evaluation = require("./models/evalutionModel");




const userCont = require("./controllers/user");

const evalCont = require("./controllers/evaluationGiven");

const studentCont = require("./controllers/student");



const app = express();

module.exports = app;

app.use(express.json());

app.use("/users", userCont);

app.use("/evaluations", evalCont);

app.use("/students", studentCont);



//-------------------fetch all students who gave a particular evaluation-----

const D1 = require("./controllers/evalutionGiven/givenD1");


app.use("/evalGiven/D1", D1);


const D2 = require("./controllers/evalutionGiven/givenD2");


app.use("/evalutionGiven/D2", D2);



const C1 = require("./controllers/evalutionGiven/givenC1");


app.use("/evalGiven/C1", C1);


const C2 = require("./controllers/evalutionGiven/givenC2");


app.use("/evalGiven/C2", C2);



//---------------------fetch the student with his personal details who scored the highest mark in the evaluation--------


const HD1 = require("./controllers/highScore/evalD1");

app.use("/eval/HighestScore/D1", HD1)



const HD2 = require("./controllers/highScore/evalD2");

app.use("/eval/HighestScore/D2", HD2)




const HC1 = require("./controllers/highScore/evalC1");

app.use("/eval/HighestScore/C1", HC1)



const HC2 = require("./controllers/highScore/evalC2");

app.use("/eval/HighestScore/C2", HC2)








