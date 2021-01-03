// import object model
var Object = require("../models/object.model");

//Create object.
function createObject(publisher, type, location, context, picture, done) {
  var newObject = new Object({
    type,
    location,
    context,
    picture,
    publisher,
  });
  newObject.save((err, doc) => {
    if (err) {
      return done(err);
    }
    done(false, doc);
  });
}
// add a description by a potential owner to an object.
//requester => userid, oid => objectid
function addDescription(requester, oid, description, done) {
  const Description = { requester, description, date_created: Date.now() };

  Object.update(
    {
      _id: oid,
    },
    {
      last_modified: Date.now(),
      $push: { descriptions: Description },
    },
    {},
    (error, res) => {
      if (error) done(error);
      else {
        done(false, res);
      }
    }
  );
}
// resolve object's case, a user will be declared as owner.
function resolveObject(publisher, owner, oid, done) {
  Object.update(
    {
      _id: oid,
      publisher,
    },
    {
      returned: true,
      owner,
      published: false,
      last_modified: Date.now(),
    },
    {},
    (error, res) => {
      if (error) done(error);
      else {
        done(false, res);
      }
    }
  );
}
// get all published objects and not resolved yet.
function getObjects(location, type, done) {
  var filters = { published: true, returned: false };
  if (location) {
    filters = { ...filters, location };
  }
  if (type) {
    filters = { ...filters, type };
  }
  Object.find(filters, (error, doc) => {
    if (error) done(error);
    else {
      done(false, doc);
    }
  });
}
//get a specific object by id.
function getObject(oid, done) {
  Object.findOne(
    {
      _id: oid,
    },
    (error, doc) => {
      if (error) done(error);
      else {
        done(false, doc);
      }
    }
  );
}
// get all published objects by a user.
function getObjectsByUser(uid, done) {
  Object.find(
    {
      publisher: uid,
      published: true,
    },
    (error, doc) => {
      if (error) done(error);
      else {
        done(false, doc);
      }
    }
  );
}
// get all resolved objects by a user.
function getObjectsResolved(uid, done) {
  Object.find(
    {
      publisher: uid,
      returned: true,
    },
    (error, doc) => {
      if (error) done(error);
      else {
        done(false, doc);
      }
    }
  );
}
// get all objects owned by a user.
function getObjectsOwnedByUser(uid, done) {
  Object.find(
    {
      owner: uid,
    },
    (error, doc) => {
      if (error) done(error);
      else {
        done(false, doc);
      }
    }
  );
}

module.exports = {
  createObject,
  addDescription,
  resolveObject,
  getObjects,
  getObjectsByUser,
  getObjectsResolved,
  getObject,
  getObjectsOwnedByUser,
};
