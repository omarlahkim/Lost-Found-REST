// Import user model
var User = require("../models/user.model");

//checks if user avaliable in db
function checkUser(username, password, done) {
  User.findOne({ username }, (err, user) => {
    if (err) return done(err);
    else {
      if (!user) return done(Error("user not found"));
      else {
        user.comparePassword(password, (err, isMatch) => {
          if (isMatch && !err) {
            return done(false, user);
          } else {
            return done(err);
          }
        });
      }
    }
  });
}
// inserts a user in db
function create(
  username,
  email,
  full_name,
  password,
  profile_picture,
  role,
  done
) {
  var newUser = new User({
    username,
    email,
    full_name,
    password,
    profile_picture,
    role,
  });
  newUser.save((err, doc) => {
    if (err) {
      return done(err);
    }
    const { _id, username, email, full_name, role } = doc;
    return done(false, { _id, username, email, full_name, role });
  });
}
//inserts a normal user in db
function createUser(
  username,
  email,
  full_name,
  password,
  profile_picture,
  done
) {
  const role = "ROLE_USER";

  create(
    username,
    email,
    full_name,
    password,
    profile_picture,
    role,
    (err, doc) => {
      if (err) {
        return done(err);
      } else {
        return done(false, doc);
      }
    }
  );
}
//inserts an admin user in db
function createAdmin(
  username,
  email,
  full_name,
  password,
  profile_picture,
  done
) {
  const role = "ROLE_ADMIN";
  create(
    username,
    email,
    full_name,
    password,
    profile_picture,
    role,
    (err, doc) => {
      if (err) {
        return done(err);
      } else {
        return done(false, doc);
      }
    }
  );
}
//return a user's info
function getUserInfo(uid, done) {
  User.findOne(
    {
      _id: uid,
    },
    function (err, user) {
      if (err) return done(err);
      else {
        return done(false, user);
      }
    }
  ).select("-password");
}
//returns all users
function getUsers(done) {
  User.find((err, users) => {
    if (err) return done(err);
    else {
      return done(false, users);
    }
  }).select("-password");
}
//updates a user
function update(
  _id,
  username = null,
  email = null,
  password = null,
  full_name = null,
  profile_picture = null,
  done
) {
  var doc = { last_modified: Date.now() };
  if (username != null) {
    doc = { ...doc, username };
  }
  if (email != null) {
    doc = { ...doc, email };
  }
  if (password != null) {
    doc = { ...doc, password };
  }
  if (full_name != null) {
    doc = { ...doc, first_name };
  }
  if (profile_picture != null) {
    doc = { ...doc, profile_picture };
  }
  User.update({ _id }, doc, (err) => {
    if (err) return done(err);
    else {
      return done(false, true);
    }
  });
}
//deletes a user
function deleteU(uid, done) {
  User.deleteOne({ _id: uid }, (err) => {
    if (err) return done(err);
    else {
      done(false, true);
    }
  });
}

module.exports = {
  checkUser,
  createUser,
  createAdmin,
  getUserInfo,
  getUsers,
  update,
  deleteU,
};
