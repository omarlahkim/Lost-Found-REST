var express = require("express");
var router = express.Router();
var middlewares = require("../middlewares/auth.middleware");
var validation = require("../middlewares/validation.middleware");
// Require controller modules.
var objectController = require("../controllers/object.controller");

/// OBJECT ROUTES ///

//GET
////
// @ROUTE(/object/) => get all objects | body: location, type | Condition: None
////
router.get(
  "/",
  middlewares.authentication,
  validation.getObjects,
  objectController.getObjects
);
////
// @ROUTE(/object/object) => get a object by object id | body: objectid | Condition: None
////
router.get(
  "/object",
  middlewares.authentication,
  validation.getObject,
  objectController.getObject
);
////
// @ROUTE(/object/resolvedbyuser) => get user's resolved objects | body: userid | Condition: None
////
router.get(
  "/resolvedbyuser",
  middlewares.authentication,
  validation.getObjectsResolved,
  objectController.getObjectsResolved
);
////
// @ROUTE(/object/publishedbyuser) => get objects published by user  | params: userid | Condition: None
////
router.get(
  "/publishedbysuser",
  middlewares.authentication,
  validation.getObjectsByUser,
  objectController.getObjectsByUser
);
////
// @ROUTE(/object/ownedbyuser) => get objects published by user  | body: userid | Condition: None
////
router.get(
  "/ownedbyuser",
  middlewares.authentication,
  validation.getObjectsOwnedByUser,
  objectController.getObjectsOwnedByUser
);
//POST
////
// @ROUTE(/object/) => post an object | body: type, location, context, picture | Condition: None
////
router.post(
  "/",
  middlewares.authentication,
  validation.createObject,
  objectController.createObject
);
////
// @ROUTE(/object/describe) => submit a description of the object | body: objectid, description | Condition: None
////
router.post(
  "/describe",
  middlewares.authentication,
  validation.addDescription,
  objectController.addDescription
);
////
// @ROUTE(/object/resolveobject) => confirm an object as owned by a user | body: owner, objectid | Condition: None
////
router.post(
  "/resolve",
  middlewares.authentication,
  validation.resolveObject,
  objectController.resolveObject
);

module.exports = router;
