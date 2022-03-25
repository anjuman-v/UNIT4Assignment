const express = require("expre",ss);

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload"));
  },

  filename: function (req, file, cb) {
    const uniquePrefix = Date.now();

    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const uploadDp = (req, res, next) => {
  const uploadItem = upload.single("profilePic");

  uploadItem(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .send({ message: err.message, errorType: "multer error" });
    }else if(err){

        return res
          .status(400)
          .send({ message: err.message, errorType: "normal error" });
        

    }

    next();
  });
};


const uploadPict = (req, res, next)=>{
    const uploadItems = upload.array("pictures", 5);

    uploadItems(req, res, function(err){

        if(err instanceof multer.MulterError){
            return res.status(400).send({message: err.message, errorType: "multer error"})
        }else if(err){

            return res.status(400).send({message: err.message, errorType: "normal error"})

        }
        next();
    })

}


module.exports = { uploadDp, uploadPict };