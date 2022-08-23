
const express = require("express");

const router = express.Router();

const Evaluation = require("../../models/evalModel");

router.get("", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "C1"}).sort({marks:-1}).limit(1).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

module.exports = router;