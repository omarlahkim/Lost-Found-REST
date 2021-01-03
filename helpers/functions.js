var {
  OK,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = require("http-status");
var jwt = require("jsonwebtoken");

const getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
const parseJwt = (token) => {
  return jwt.decode(token);
};
function ResponseHandler(error, response, res) {
  if (error) {
    if (error == 403) {
      res.status(UNAUTHORIZED).send("Unauthorized");
    } else if (error == NOT_FOUND) {
      res.status(NOT_FOUND).send("Not found");
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ success: false, msg: error });
    }
  } else {
    res.status(OK).send({ success: true, data: response });
  }
}
module.exports = { getToken, parseJwt, ResponseHandler };
