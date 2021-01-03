var jwt = require("jsonwebtoken");
const config = require("../configurations/db.configuration");
var { getToken, parseJwt, ResponseHandler } = require("../helpers/functions");
var {
  createUser,
  createAdmin,
  checkUser,
  deleteU,
  update,
  getUsers,
  getUserInfo,
} = require("../services/user.service");

//create a user
function signUp(req, res, next) {
  const { username, email, password, full_name, profile_picture } = req.body;
  createUser(
    username,
    email,
    password,
    full_name,
    profile_picture,
    (error, response) => ResponseHandler(error, response, res)
  );
}
//create a admin user
function signUpAdmin(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    const { username, email, password, full_name, profile_picture } = req.body;
    username = username.toLowerCase();
    email = email.toLowerCase();
    createAdmin(
      username,
      email,
      password,
      full_name,
      profile_picture,
      (error, response) => ResponseHandler(error, response, res)
    );
  }
}
// login a user
function signIn(req, res, next) {
  var { username, password } = req.body;

  checkUser(username, password, (err, user) => {
    if (user && !err) {
      var { _id, username, role } = user;
      var token = jwt.sign({ _id, username, role }, config.secret, {
        expiresIn: 604800, // 1 week
      });
      // return the information including token as JSON
      res.send({ success: true, token: "JWT " + token });
    } else {
      ResponseHandler(403, null, res);
    }
  });
}
//delete a user (only admin)
function deleteUser(req, res, next) {
  var userid = req.params("userid");
  deleteU(userid, (error, response) => ResponseHandler(error, response, res));
}
//update a user
function updateUser(req, res, next) {
  var token = getToken(req.headers);
  var { username, email, password, full_name, profile_picture } = req.body;
  var { _id } = parseJwt(token);
  if (_id) {
    update(
      _id,
      username,
      email,
      password,
      full_name,
      profile_picture,
      (error, response) => ResponseHandler(error, response, res)
    );
  }
}
//get all users
function getAllUsers(req, res, next) {
  getUsers((error, response) => {
    if (response == null) {
      ResponseHandler(404, response, res);
      return;
    }
    ResponseHandler(error, response, res);
  });
}
//get a user's data
function getUser(req, res, next) {
  var userid = req.param("userid");
  if (userid) {
    getUserInfo(userid, (error, response) => {
      if (response == null) {
        ResponseHandler(404, response, res);
        return;
      }
      ResponseHandler(error, response, res);
    });
  }
}
module.exports = {
  signUp,
  signUpAdmin,
  signIn,
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
};
