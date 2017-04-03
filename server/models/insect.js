var mongoose = require('mongoose');

var InsectSchema = mongoose.Schema({
  description: String,
  valueOne: String,
  valueTwo: String,
  valueThree: String,
  webEntityOne: String,
  webEntityTwo: String,
  webEntityThree: String,
  created: Date,
  file: Object,
  spotted: Date
});

module.exports = mongoose.model('Insect', InsectSchema);