
const authorise = (permittedRoles)=>{ //permittedRoles = {"seller", "admin"}

    return (req, res, next)=>{

        const user = req.user;

        let isAllowed = false;

        for(var i = 0; i < user.roles.length; i++){

             if( permittedRoles.includes(user.roles[i])) {

                isAllowed = true;

                break;
             }
        }

        if( isAllowed){

            next();

        }else{
            return res.status(403).send({message: "permission denied"})
        }


    }

}

const Product = require("../models/productModel");


// const deleteAuth = (permittedRoles) => {
//   //permittedRoles = {"seller", "admin"}

//   return async (req, res, next) => {
//     // const user = req.user;

//     const product = await Product.findById(req.params.id).lean().exec();

//     console.log(product);

//     let isAllowed = false;

//     for (var i = 0; i < user.roles.length; i++) {
//       if (permittedRoles.includes(user.roles[i])) {
//         isAllowed = true;

//         break;
//       }
//     }

//     if (isAllowed) {
//       next();
//     } else {
//       return res.status(403).send({ message: "permission denied" });
//     }
//   };
// };


module.exports = {authorise};