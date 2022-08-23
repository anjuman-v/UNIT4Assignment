
const express = require("express");

const router = express.Router();

const Evaluation = require("../models/evalModel");

router.post("", async(req, res)=>{


    try {
        
        const eval = await Evaluation.create(req.body);

        return res.status(201).send(eval);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})



router.get("", async(req, res)=>{

    try {
        
        const evals = await Evaluation.find().populate({path:"userId", select: {firstName: 1, lastName:1, _id:0}}).lean().exec();

        return res.status(200).send(evals);

    } catch (e) {
        return res.status(500).send(e.message);
    }

})


router.delete("/:id", async(req, res)=>{

    try {
        
        const eval = await Evaluation.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(eval);
    } catch (e) {
        return res.status(500).send(e.message);
    }

})


module.exports = router;