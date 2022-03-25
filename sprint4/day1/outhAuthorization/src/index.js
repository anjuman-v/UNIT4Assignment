const express = require("express");
require("dotenv").config();
const app = express();

module.exports = app;

app.use(express.json());


const { login, register} = require("./controllers/authCont");

const passport = require("./configs/passport");

app.post("/register", register)

app.post("/login", login)


const productCont = require("./controllers/productCont") 


app.use("/products", productCont);

app.use(passport.initialize());

passport.serializeUser(function({user, token}, callback){

  callback(null, {user, token})

})

passport.deserializeUser(function (user, callback) {
  callback(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    
    failureRedirect: "/auth/google/failure",
  }), (req, res)=>{

    
    return res.status(201).json({user: req.user.user, token: req.user.token})

  }
);


app.get("/auth/google/success", (req, res)=>{

    return res.send("success");

})

app.get("/auth/google/failure", (req, res) => {
  return res.send("failure");
});