var {
  OK,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  FORBIDDEN,
  CREATED,
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
    if (error == 401) {
      res.status(UNAUTHORIZED).send("Unauthorized");
    } else if (error == 403) {
      res.status(FORBIDDEN).send("Not Allowed");
    } else if (error == NOT_FOUND) {
      res.status(NOT_FOUND).send("Not found");
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ success: false, msg: error });
    }
  } else {
    if (response == 201) {
      res.status(CREATED).send({ success: true, msg: "created successfully" });
    }
    res.status(OK).send({ success: true, data: response });
  }
}
module.exports = { getToken, parseJwt, ResponseHandler };
