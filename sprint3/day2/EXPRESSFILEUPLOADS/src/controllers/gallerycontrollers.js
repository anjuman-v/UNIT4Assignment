const express = require("express");

const router = express.Router();

const Gallery = require("../model/galleryModel");


var fs = require("fs");

const {uploadPict} = require("../middelware/uploade");



router.get("", async (req, res) => {
  try {
    const gallery = await Gallery.find().lean().exec();

    return res.status(200).send(gallery);
  } catch (err) {
    return res.status(500).send(err);
  }
});


router.post("", uploadPict, async(req,res)=>{

    try {
        const filePaths = req.files.map((file)=> file.path);

        const gallery = await Gallery.create({
          userId: req.body.userId,
          pictures: filePaths

        });

        return res.status(200).send(gallery);
    } catch (e) {
        return res.status(500).send(e.message)
    }

});


router.delete("/:id", async(req, res)=>{

  try {
    const {pictures, _id} = await Gallery.findOne({userId: {$eq: req.params.id}});

    pictures.map((el)=>{

      fs.unlinkSync(el);
    
    })

    const galleryD = await Gallery.findByIdAndDelete(_id).lean().exec();

    return res.status(200).send(galleryD);

    // console.log(pictures);
    
  } catch (err) {
    return res.status(500).send(err.message);
  }

})

module.exports = router;
