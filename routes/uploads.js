var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../server/models/upload');
var Insect = require('../server/models/insect');
var multer = require('multer');
var projectId = 'insect-collector';
var Vision = require('@google-cloud/vision');
var path = require('path');
var crypto = require('crypto');
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    console.log(Date.now() + file.originalname);
    cb(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage });


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
  Upload.create(newUpload, function (err, newUpload) {
    if (err) {
      console.log(err);
      return (err);
    } else {
      var visionClient = Vision({
        projectId: projectId
      });

      console.log('visionClient:', visionClient);

      var fileName = 'uploads/' + newUpload.file.filename;
      var newInsect = {};

      /// Vision API detects labels ///
      visionClient.detectLabels(fileName)
        .then(function (results) {
          console.log('results:', results);
          var labels = results[0];
          console.log('Labels:', labels);
          newInsect.description = req.body.description;
          newInsect.created = Date.now();
          newInsect.file = req.file;
          newInsect.valueOne = labels[0];
          newInsect.valueTwo = labels[1];
          newInsect.valueThree = labels[2];

          console.log('newInsect:', newInsect);

        });

      /// Vision API detects webEntities ///
      visionClient.detectSimilar(fileName)
        .then(function (results) {
          var webEntity = results[1].responses[0].webDetection.webEntities;
          console.log('similarresults:', results[1].responses[0].webDetection.webEntities[0].description, results[1].responses[0].webDetection.webEntities[1].description, results[1].responses[0].webDetection.webEntities[2].description);
          newInsect.webEntityOne = webEntity[0].description;
          newInsect.webEntityTwo = webEntity[1].description;
          newInsect.webEntityThree = webEntity[2].description;
          console.log('newInsect:', newInsect);
          Insect.create(newInsect, function (err, newInsect) {
            if (err) {
              console.log(err);
              return (err);
            } else {
              res.status(200).send(results);
            }

          });

        });
    } //end Upload.create else
  }); //end Upload.create
}); //end ('/) post


/**
 * Gets the list of all files from the database
 */
router.get('/', function (req, res, next) {
  Upload.find({}, function (err, uploads) {
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