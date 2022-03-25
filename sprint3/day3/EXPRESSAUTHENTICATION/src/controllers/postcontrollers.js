const  express = require("express");

const router = express.Router();


const Post = require("../models/postmodel");

const authenticate = require("../middelware/authentication");


router.post("/post", authenticate, async(req, res)=>{

    // res.send("post");

    try {

        const post = await Post.create(req.body)

        return res.status(500).send(post);
        
    } catch (e) {
        return res.status(500).send(e.message)
    }

})

module.exports = router;
