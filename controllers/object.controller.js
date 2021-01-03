const objectService = require("../services/object.service");
var { getToken, parseJwt, ResponseHandler } = require("../helpers/functions");

//Create object.
function createObject(req, res, next) {
  var token = getToken(req.headers);
  var { type, location, context, picture } = req.body;
  var { _id } = parseJwt(token);
  objectService.createObject(
    _id,
    type,
    location,
    context,
    picture,
    (error, response) => ResponseHandler(error, response, res)
  );
}

// add a description by a potential owner to an object.
function addDescription(req, res, next) {
  var token = getToken(req.headers);
  var { objectid, description } = req.body;
  var { _id } = parseJwt(token);
  objectService.addDescription(_id, objectid, description, (error, response) =>
    ResponseHandler(error, response, res)
  );
}

// resolve object's case, a user will be declared as owner.
function resolveObject(req, res, next) {
  var token = getToken(req.headers);
  var { owner, objectid } = req.body;
  var { _id } = parseJwt(token);
  objectService.resolveObject(_id, owner, objectid, (error, response) =>
    ResponseHandler(error, response, res)
  );
}

// get all published objects and not resolved yet.
function getObjects(req, res, next) {
  var location = req.param("location");
  var type = req.param("type");
  objectService.getObjects(location, type, (error, response) => {
    if (response == null) {
      ResponseHandler(404, response, res);
      return;
    }
    ResponseHandler(error, response, res);
  });
}

//get a specific object by id.
function getObject(req, res, next) {
  var objectid = req.param("objectid");
  objectService.getObject(objectid, (error, response) => {
    if (response == null) {
      ResponseHandler(404, response, res);
      return;
    }
    ResponseHandler(error, response, res);
  });
}

// get all published objects by a user.
function getObjectsByUser(req, res, next) {
  var userid = req.param("userid");
  objectService.getObjectsByUser(userid, (error, response) => {
    if (response == null) {
      ResponseHandler(404, response, res);
      return;
    }
    ResponseHandler(error, response, res);
  });
}

//get all resolved objects by user
function getObjectsResolved(req, res, next) {
  var userid = req.param("userid");
  objectService.getObjectsResolved(userid, (error, response) => {
    if (response == null) {
      ResponseHandler(404, response, res);
      return;
    }
    ResponseHandler(error, response, res);
  });
}
//get all owned objects by a user
function getObjectsOwnedByUser(req, res, next) {
  var userid = req.param("userid");
  objectService.getObjectsOwnedByUser(userid, (error, response) => {
    if (response == null) {
      ResponseHandler(404, response, res);
      return;
    }
    ResponseHandler(error, response, res);
  });
}

module.exports = {
  createObject,
  addDescription,
  resolveObject,
  getObjects,
  getObject,
  getObjectsByUser,
  getObjectsResolved,
  getObjectsOwnedByUser,
};
