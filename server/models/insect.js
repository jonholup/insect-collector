var mongoose = require('mongoose');

var InsectSchema = mongoose.Schema({
  description: String,
  valueOne: String,
  valueTwo: String,
  valuteThree: String,
  webEntityOne: String,
  webEntityTwo: String,
  webEntityThree: String,
  created: Date,
  file: Object
});

module.exports = mongoose.model('Insect', InsectSchema);