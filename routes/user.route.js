var express = require("express");
var router = express.Router();
// import middlewares.
var middlewares = require("../middlewares/auth.middleware");
var validation = require("../middlewares/validation.middleware");
// import user controller.
var userController = require("../controllers/user.controller");

/*
----------------------------------------------------------------------
AUTHENTICATION FLOWS
----------------------------------------------------------------------
    Signin:
        Server receives post signin request  => inputs get validated (validation middleware: /middlewares/validation.middleware) => controller calls the function in
        service (Model) that checks if the user is available in DB and password is the right one => back to controller, a jwt token get created and signed => send jwt token
        as response

    Other Requests that require authentication:
        Server Receives request => inputs get validated if needed (validation middleware) =>  authorization header gets check if a token is provided if so => 
        signature gets checked if authentic using the authentic secret key if so (authentication middleware: /middlewares/auth.middleware) =>  the request get fulfilled

    Admin Requests:
        Server receives request => inputs get validated if needed (validation middleware) => authorization header gets check if a token is provided if so => 
        signature gets checked if authentic using the authentic secret key if so (authentication middleware: /middlewares/auth.middleware) => checks if user is admin 
        according to role in jwt payload if so => request gets fulfilled 
----------------------------------------------------------------------

*/

/// USER ROUTES ///
//POST
//AUTH
////
// @ROUTE(/user/signup) => create a user account | body: username, password, email, full_name, base64 profile_photo (optional) | Condition: None
////
router.post("/signup", validation.signup, userController.signUp);
////
// @ROUTE(/user/signupadmin) => create an admin account | body: username, password, email, full_name, base64 profile_photo (optional) | Condition: Admin user
////
router.post(
  "/signupadmin",
  middlewares.authentication,
  middlewares.adminCheck,
  validation.signup,
  userController.signUpAdmin
);

////
// @ROUTE(/user/signin) => sign in and get a token | body: username, password
////
router.post("/signin", validation.signin, userController.signIn);

//GET
////
// @ROUTE(/user/info) => get a user info | params: userid | Condition: Authenticated User
////
router.get(
  "/user",
  middlewares.authentication,
  validation.getUser,
  userController.getUser
);
////
// @ROUTE(/) => get users | params: None | Condition: Authenticated User
////
router.get(
  "/",
  middlewares.authentication,
  validation.getAllUsers,
  userController.getAllUsers
);

//PUT
////
// @ROUTE(/user/) => update a user | body: username, password, email, full_name, base64 profile_photo | Condition: Authenticated User
////
router.put(
  "/",
  middlewares.authentication,
  validation.updateUser,
  userController.updateUser
);

//DELETE
////
// @ROUTE(/user/) => delete a user | params: userid | Condition: Admin user
////
router.delete(
  "/",
  middlewares.authentication,
  middlewares.adminCheck,
  validation.deleteUser,
  userController.deleteUser
);

module.exports = router;
