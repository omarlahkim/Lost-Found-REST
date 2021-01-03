const express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const config = require("./configurations/db.configuration");
var passport = require("passport");
var morgan = require("morgan");
var cors = require("cors");
require("./configurations/passport.configuration")(passport);

//initialize app
const app = express();

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan("tiny"));
app.use(cors());
const PORT = 3001;

//for dev
app.disable("etag");

//connect database
mongoose.connect(config.database, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//User Route
const userRouter = require("./routes/user.route");
app.use("/user", userRouter);
//Object Route
const objectRouter = require("./routes/object.route");
app.use("/object", objectRouter);

// 404 ERROR
app.use(function (req, res, next) {
  res.status(404);
  res.send("404: Resource Not Found");
});
//listen to requests
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
