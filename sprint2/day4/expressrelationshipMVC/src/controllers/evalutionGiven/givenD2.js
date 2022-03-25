
const express = require("express");

const router = express.Router();

const Evaluation = require("../../models/evalModel");

router.get("", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D2"}).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (err) {
        return res.status(500).send(err.message);
    }

})


module.exports = router;