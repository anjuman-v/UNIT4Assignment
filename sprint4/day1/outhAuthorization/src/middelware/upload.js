const multer = require("multer");
const path = require("path");



//giving for file storage=>

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniquePrefix + "-" + file.originalname);
  },
});




//checking for filter=>

const fileFilter = (req, file, cb) => {
  //the function should cal 'cb' with a boolean
  //to indicate if the file should be accepted

  //to accept the file pass "true", like so:

  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    //to reject this file pass "false", like so:
    cb(null, false);
  }
};



const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 1024 Bytes = 1KB * 1024 = 1MB *5 = 5MB
  },
});



const uploadSingle = (req, res, next)=>{

    const uploadItem = upload.single("imgUrl");
    
    uploadItem(req, res, function (err){

        if( err instanceof multer.MulterError){

            // A Multer error occurred when uploading

            return res
              .status(400)
              .send({ message: err.message, errorType: "multer error" });
        }else if(err){

            //an unknown error occured when uploading.
            return res
              .status(400)
              .send({ message: err.message, errorType: "normal error" });

        }

        //everyting went fine

        next();

    }) 

}


const uploadMultiple = (req, res, next) => {
  const uploadItems = upload.array("imgUrl",1);

  uploadItems(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading

      return res.status(400).send({message: err.message, errorType: "multer error"})
    } else if (err) {
      //an unknown error occured when uploading.
      return res 
        .status(400)
        .send({ message: err.message, errorType: "normal error" });
    }

    //everyting went fine

    next();
  });
};



module.exports = { uploadSingle, uploadMultiple };