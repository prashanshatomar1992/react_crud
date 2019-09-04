const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
var fs = require("fs");
var ca = [fs.readFileSync(__dirname + "/js/mongodb.pem")];
const businessRoute = require('./routes/business.route')

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://admin:password@broker2/nestNew?ssl=true", {
    server: {
      sslValidate: true,
      sslCA: ca
    },
    useNewUrlParser: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log("Database is connected!!");
    },
    err => {
      console.log("Cannot Database is connected!!", err);
    }
  );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/business', businessRoute)
app.listen(PORT, function() {
  console.log("Server is running on Port  : ", PORT);
});
