const express = require("express");

const Product = require("../models/productModel");

const router = express.Router();

const { uploadSingle, uploadMultiple } = require("../middelware/upload");



const authenticate = require("../middelware/Authenticate");

const { authorise, deleteAuth } = require("../middelware/authorise");

router.get("", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post(
  "/single",
  authenticate,
  authorise(["seller", "admin"]),
  uploadSingle,
  async (req, res) => {
    try {
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        imgUrl: req.file.path,
      });

      return res.status(200).send(product);
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

router.post("/multiple", authenticate, uploadMultiple, async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      imgUrl: filePaths,
    });

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send(e);
  }
});


// router.delete(
//   "/:id",
//   authenticate,
//   deleteAuth(["seller", "admin"]),
//   async (req, res) => {

//     res.send("delete")

//   }
// );


module.exports = router;
