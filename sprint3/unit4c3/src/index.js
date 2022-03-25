const express = require ("express");


const app=express();
app.use(express.json());
const userController = require("./controllers/user.controller")

app.use("/users",userController);

const BookController = require("./controllers/book.controllers.js")


app.use("/books",BookController);


const PublicationController = require("./controllers/publication.controllers")

app.use("/publications",PublicationController);


const CommentController = require("./controllers/comment.controllers.js")

app.use("/comment",CommentController);


app.post("/register",register);
app.post("/login",login);



module.exports= app;