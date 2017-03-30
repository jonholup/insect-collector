var mongoose = require('mongoose');

var UploadSchema = mongoose.Schema({
  description: String,
  created: Date,
  file: Object
});

module.exports = mongoose.model('Upload', UploadSchema);