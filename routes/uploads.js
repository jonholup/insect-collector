var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../server/models/upload');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var projectId = 'insect-collector';
var Vision = require('@google-cloud/vision');
var path = require('path');
/**
 * Create's the file in the database
 */
router.post('/', upload.single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  var newUpload = {
    description: req.body.description,
    created: Date.now(),
    file: req.file
  };
  Upload.create(newUpload, function (err, upload) {
    if (err) {
      return(err);
    } else {
      console.log('uploadid:', upload.id);
      console.log('uploadObject', upload);
      
      
      // res.send(newUpload);
      // console.log(req.decodedToken);
    // var userEmail = req.decodedToken.email;
    // console.log(userEmail);
    //if null insert user
    // Instantiates a client
    console.log('post req.body:', req.body);
    var visionClient = Vision({
        projectId: projectId
    });

    var fileName = upload.file.path + '/' + upload.file.originalname;
    //fileName = how to pass on imageurl -> not a GET request (or query string data)

    // Performs label detection on the image file
    visionClient.detectLabels(fileName)
        .then(function (results) {
            var labels = results[0];

            console.log('Labels:');
            labels.forEach(function (label) { console.log(label); });
            // Database query
            // if (err) res.sendStatus(500)
            // else query successful (.then)
            res.send(results);
        });
    }
  });
      console.log('post req.body:', req.body);
});

/**
 * Gets the list of all files from the database
 */
router.get('/', function (req, res, next) {
  Upload.find({},  function (err, uploads) {
    if (err) next(err);
    else {
      res.send(uploads);
    }
  });
});

/**
 * Gets a file from the hard drive based on the unique ID and the filename
 */
router.get('/:uuid/:filename', function (req, res, next) {
  console.log(req.params);
  Upload.findOne({
    'file.filename': req.params.uuid,
    'file.originalname': req.params.filename
  }, function (err, upload) {
    if (err) next(err);
    else {
      res.set({
        "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
        "Content-Type": upload.file.mimetype
      });
      fs.createReadStream(upload.file.path).pipe(res);
    }
  });
});

module.exports = router;