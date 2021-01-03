const passport = require("passport");
var { getToken, parseJwt, ResponseHandler } = require("../helpers/functions");

/*
----------------------------------------------------------------------
AUTHENTICATION MIDDLEWARE
----------------------------------------------------------------------
middleware for checking user's authentication status
----------------------------------------------------------------------

*/

const authentication = passport.authenticate("jwt", { session: false });

/*
----------------------------------------------------------------------
ADMIN CHECK MIDDLEWARE
----------------------------------------------------------------------
middleware for checking if a user is an admin
----------------------------------------------------------------------

*/

const adminCheck = (req, res, next) => {
  var token = getToken(req.headers);
  var { role } = parseJwt(token);
  if (role != "ROLE_ADMIN") {
    ResponseHandler(403, null, res);
  } else {
    next();
  }
};

exports.adminCheck = adminCheck;
exports.authentication = authentication;
