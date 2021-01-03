var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/*
----------------------------------------------------------------------
OBJECT SCHEMA
----------------------------------------------------------------------


*/

var objectSchema = new Schema({
  // Id's are generated automatically without the need to implement them in the schema
  type: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    unique: true,
    required: true,
  },
  descriptions: {
    type: Array,
    unique: false,
  },
  location: {
    type: String,
    required: true,
  },
  returned: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: String,
    required: false,
  },
  publisher: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  last_modified: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("objects", objectSchema);
