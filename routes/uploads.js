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
  console.log('req.decodedToken:', req.decodedToken);
  console.log(req.body);
  console.log(req.file);
  var newUpload = {
    description: req.body.description,
    created: Date.now(),
    file: req.file
  };
  Upload.create(newUpload, function (err, newUpload) {
    var labels = [];
    if (err) {
       res.status(400).send('Error with initial data upload! :-[');
                return next(false);
    } else {
      var visionClient = Vision({
        projectId: projectId
      });

      console.log('visionClient:', visionClient);

      var fileName = 'uploads/' + newUpload.file.filename;
      // var spotted = Date.UTC();
      var newInsect = {
        spotted: new Date().toDateString()
      };

      // /// Vision API detects SafeSearch properties - unneccesary as isInsect conditional should catch these///
      // return visionClient.detectSafeSearch(fileName)
      //   .then(function (results, err) {
      //     if (err) {
      //       console.log('52:::::', err)
      //     }
      //     var safeSearch = results[0];
      //     console.log('safeSearch:', safeSearch);

      //     /// abort if any properties of detections are true (inappropriate) ///
      //     var safeSearchValue = Object.keys(safeSearch).map(key => safeSearch[key]).some(value => value);
      //     if (safeSearchValue) {
      //       res.status(400).send('showAlert');
      //       return;
      //     }
        //  }).then(function () {


          /// Vision API detects labels ///
          return visionClient.detectLabels(fileName)
            .then(function (results, err) {
              if (err) {
                res.status(400).send('Error detecting labels! :-[');
                return next(false);
              }
              console.log('results:', results);
              
              labels = results[0];
              for (var index = 0; index < labels.length; index++) {
                labels[index] = labels[index].capitalize();
              }

              newInsect.description = req.body.description;
              newInsect.created = Date.now();
              newInsect.file = req.file;
              newInsect.valueOne = labels[0];
              newInsect.valueTwo = labels[1];
              newInsect.valueThree = labels[2];
  
            }).catch(function(error){
              console.log('HAHAHAHA: ', error);
            
        }).then(function () {
          return visionClient.detectSimilar(fileName)
            .then(function (results, err) {
              if (err) {
                res.status(400).send('Error detecting similar web entities! :-[');
                return next(false);
              }
              var webEntity = results[1].responses[0].webDetection.webEntities;
              newInsect.webEntityOne = webEntity[0].description.capitalize();
              newInsect.webEntityTwo = webEntity[1].description.capitalize();
              newInsect.webEntityThree = webEntity[2].description.capitalize();
              labels.push(newInsect.webEntityOne, newInsect.webEntityTwo, newInsect.webEntityThree);
    
              // If image is not an insect, do not save to database //
              var isInsect = labels.some(value => value === 'Insect' || value === 'Butterfly');
              if (!isInsect) {
               res.status(400).send('Not an Insect!');
                return next(false);
              }

              Insect.create(newInsect, function (err, newInsect) {
                if (err) {
                res.status(400).send('Error adding insect to collection! :-[');
                return next(false);
                } else {
                  res.status(200).send(results);
                }

              });

            }).catch(function(error){
              console.log('error: ', error);
              res.status(400).send('Wait a moment and try again:', error);
            });
        });
    }
  });
});

/**
 * Gets the list of all files from the database
 */
router.get('/', function (req, res, next) {
  Insect.find({}, function (err, uploads) {
    if (err) {
      return next(err);
    }
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
    if (err) {
      return next(err);
    }
    else {
      res.set({
        "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
        "Content-Type": upload.file.mimetype
      });
      fs.createReadStream(upload.file.path).pipe(res);
    }
  });
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = router;