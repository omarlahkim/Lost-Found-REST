const validator = require("../helpers/validation");

/*
----------------------------------------------------------------------
VALIDATORS
----------------------------------------------------------------------
middlewares for handling the input validations
----------------------------------------------------------------------

*/

const signup = (req, res, next) => {
  const validationRule = {
    email: "required|email",
    username: "required|string",
    full_name: "required|string",
    password: "required|string|min:4",
    profile_picture: "string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const signin = (req, res, next) => {
  const validationRule = {
    username: "required|string",
    password: "required|string|min:4",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const deleteUser = (req, res, next) => {
  const validationRule = {
    userid: "required|string",
  };
  params = { userid: req.param("userid") };
  validator(params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const updateUser = (req, res, next) => {
  const validationRule = {
    email: "email",
    username: "string",
    full_name: "string",
    password: "string|min:4",
    profile_picture: "string",
  };
  validator(req.params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const getAllUsers = (req, res, next) => {
  const validationRule = {
    userid: "required|string",
  };
  params = { userid: req.param("userid") };
  validator(params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const getUser = (req, res, next) => {
  const validationRule = {
    userid: "required|string",
  };
  params = { userid: req.param("userid") };
  validator(params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const createObject = (req, res, next) => {
  const validationRule = {
    type: "required|string",
    location: "required|string|min:4",
    context: "required|string|min:4",
    picture: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const addDescription = (req, res, next) => {
  const validationRule = {
    objectid: "required|string",
    description: "required|string|min:4",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const resolveObject = (req, res, next) => {
  const validationRule = {
    owner: "required|string",
    objectid: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const getObjects = (req, res, next) => {
  const validationRule = {
    location: "string",
    type: "string",
  };
  validator(req.params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const getObject = (req, res, next) => {
  const validationRule = {
    objectid: "required|string",
  };
  params = { objectid: req.param("objectid") };
  validator(params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const getObjectsByUser = (req, res, next) => {
  const validationRule = {
    userid: "required|string",
  };
  params = { userid: req.param("userid") };
  validator(params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const getObjectsResolved = (req, res, next) => {
  const validationRule = {
    userid: "required|string",
  };
  params = { userid: req.param("userid") };
  validator(params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const getObjectsOwnedByUser = (req, res, next) => {
  const validationRule = {
    userid: "required|string",
  };
  params = { userid: req.param("userid") };
  validator(params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  signup,
  signin,
  createObject,
  addDescription,
  resolveObject,
  getObjects,
  getObject,
  getObjectsByUser,
  getObjectsOwnedByUser,
  getObjectsResolved,
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
};
