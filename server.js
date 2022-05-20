var express = require('express');
var path = require('path');
var expressStaticGzip = require("express-static-gzip");
var app = express();
var multer = require("multer");
var admzip = require("adm-zip");
var fs = require("fs");

const buildPath = path.join(__dirname, 'rootFolder');
// app.use(express.static("rootFolder"));
app.use(express.urlencoded({ extended: true }));

  //home route
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

//Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
  //setting up the upload folder
      cb(null, "public/uploads");
    //   cb(null, buildPath);
    },
    filename: (req, file, cb) => {
      cb(
        null,
  //setting up file name with it's original extension using path module
        file.originalname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  //Multer file upload settings
  const maxSize = 10 * 1024 * 1024;
  const compressFileUpload = multer({
    storage,
    limits: {
      filesize: maxSize,
    },
  });
  

  
  //Compress route
  app.post("/compress", compressFileUpload.array("file", 100), (req, res) => {
  
  //Initializing adm-zip library
      const zip = new admzip();
  
  //Checking for the files uploaded
      if (req.files) {
          req.files.map(file => {
              zip.addLocalFile(file.path);
          });
  
  //creating zip file if there's none using fs module
          const output = Date.now() + "output.zip";
          fs.writeFileSync(output, zip.toBuffer());
          
  //Downloading the compressed file
          res.download(output);
      }
  });



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})