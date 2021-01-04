var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

/*
----------------------------------------------------------------------
USER SCHEMA
----------------------------------------------------------------------
*/

var userSchema = new Schema({
  // Id's are generated automatically without the need to implement them in the schema
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
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
  role: {
    type: String,
    enum: ["ROLE_USER", "ROLE_ADMIN"],
    required: true,
  },
});

/*
----------------------------------------------------------------------
Function for hashing pasword before saving it in database.
----------------------------------------------------------------------

*/

userSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

/*
----------------------------------------------------------------------
method for comparing given password with database.
----------------------------------------------------------------------
*/

userSchema.methods.comparePassword = function (passw, done) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return done(err);
    }
    done(null, isMatch);
  });
};

module.exports = mongoose.model("users", userSchema);
