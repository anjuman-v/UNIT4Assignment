
require("dotenv").config();

const User = require("../models/usermodel");

const jwt = require("jsonwebtoken");

const newToken = (user)=>{

    return jwt.sign({ user: user }, `${process.env.JWT_SECRET_KEY}`);


}

const register = async (req, res)=>{

    try {

        //first check if the email provided is already given to another user

        let user = await User.findOne({email: req.body.email}).lean().exec();

        //if yes then throw an error 400 Bad requset

        if(user) return res.status(400).send({ message: "User with that email is already exists"})

        // if Not then we will create the user
        // we will hash the password for the user

        user = await User.create(req.body);


        //we will create the token for the user

        const token = newToken(user);


        //return the token and the user details

        return res.status(201).send({user, token});
        
    } catch (e) {
        return res.status(500).send(e.message)
    }



}


const login = async (req, res)=>{

    // return res.send("login");

    try {

        //first we will find the user with the email

        let user = await User.findOne({ email: req.body.email});


        //if user is not found throw an error 400 Bad Req

        if(!user) return res.status(400).send({message: "Either email or Password is incorrect"});

        //if user found then try to maatch the password provided with the password in db

        const match = user.checkPassword(req.body.password);

        // if not match then throw an error 400 Bad Request

        if(!match) return res.status(400).send({message: "Either Email or Password is incorrect"})

        //if password also matches then create a token

        const token = newToken(user);

        //return the token and the details

        return res.status(201).send({user, token});
        
    } catch (e) {
        return res.status(500).send(e.message)
    }

}


module.exports = { register, login}