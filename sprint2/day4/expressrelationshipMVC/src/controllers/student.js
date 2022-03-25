

const express = require("express");

const router = express.Router();

const Student = require("../models/studentModel"); 


router.post("", async(req, res)=>{


    try {
        
        const student = await Student.create(req.body);

        return res.status(201).send(student);
    } catch (e) {
        return res.status(500).send(e.message);
    }


})



router.get("", async(req, res)=>{


    try {
        
        const students = await Student.find().populate({ path:"evaluationIds", select: {topicName:1, marks:1}}).populate({path: "userId", select:{ firstName:1, lastName:1}}).lean().exec();

        return res.status(200).send(students);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

router.patch("/:id", async(req, res)=>{


    try {

        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();

        return res.status(200).send(student)

    } catch (e) {
        return res.status(500).send(e.message);
    }

})


module.exports = router;