const express = require("express");

const router = express.Router();


const User = require("../models/usermodel");


router.get("", async(req, res)=>{


    try {
        const users = await User.find().lean().exec();

        return res.status(200).send(users);
        
    } catch (e) {
        return res.status(500).send(e.message)
    }

    
})



module.exports = router
