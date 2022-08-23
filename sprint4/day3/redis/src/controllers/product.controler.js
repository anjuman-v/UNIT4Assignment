const express = require("express");

const router = express.Router();

const Product = require("../model/product.model");

const redis = require("../configs/redis");


router.post("", async(req, res)=>{

    try {
        
        const product = await Product.create(req.body);

        const products = await Product.find().lean().exec(); 

        redis.set("products", JSON.stringify(products)); //setting all products in redis

        return res.status(201).send(product);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})

//FLUSHALL=> to delete all keys;
//KEYS * => to get all the keys;
//GET nameOfKeys => to get all data inside the key a perticular key



router.get("",  (req, res) => {
  try {
    redis.get("products", async function(err, products){  
        //getting  products

      if(err) return res.status(500).send({message: err.message});

      if (products) {
        const allProducts = JSON.parse(products); 
        //if products is present then get all products and parse them

        return res.status(200).send({ products: allProducts, redis: true }); // if redis is true then all the products are comming from redis
      } else {
        const products = await Product.find().lean().exec(); 
        //else first we find all the products


        redis.set("products", JSON.stringify(products)); 
        //then set to redis
        
        return res.status(200).send({ products: products, redis: false }); 
        //then show the products from the db and here redis is false means data is shown from database not from redis
      }

    })
  } catch (e) {
    return res.status(500).send(e.message);
  }
});



router.get("/:id",  (req, res) => {
  try {

      redis.get(`products:${req.params.id}`, async function(err, product){

        if(err) console.log(err.message);

        if(product){
          const fetchproduct = JSON.parse(product);
          return res.status(200).send({product: fetchproduct, redis:true})
        }else{

          try {
            const product =  await Product.findById(req.params.id).lean().exec();
            redis.set(`products:${req.params.id}`, JSON.stringify(product));

            return res.status(200).send({product:product, redis:false})
            
          } catch (e) {
              console.log(e.message);
          }


        }

      })
  } catch (e) {
    return res.status(500).send(e.message);
  }
});


router.patch("/:id", (req, res) => {
  try {

    redis.get(`products:${req.params.id}`, async function(err, fetchproduct){

      if(err) console.error(err.message);

      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();

      redis.set(`products.${req.params.id}`, JSON.stringify(product));

      const products = await Product.find().lean().exec();

      redis.set("posts", JSON.stringify(products))
      return res.status(201).send(product);

    })
  } catch (e) {
    return res.status(500).send(e.message);
  }
});


router.delete("/:id",  (req, res) => {
  try {

    redis.get(`products.${req.params.id}`, async function(err, fetchproduct){


      if(err) console.error(err.message);

      const product = await Product.findByIdAndDelete(req.params.id);

      redis.del(`products:${req.params.id}`);

      const products = await product.find().lean().exec();

      redis.set("products", JSON.stringify(products));

      return res.status(200).send(product)

    })

  } catch (e) {
    return res.status(500).send(e.message);
  }
});






module.exports = router;
