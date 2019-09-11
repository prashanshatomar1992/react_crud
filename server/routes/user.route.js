const express = require("express");
const router = express.Router();
let User = require("../model/user.model");

router.route("/add").post(function(req, res) {
  console.log("----------business -----------------------");
  console.log("----------business -----------------------");
  console.log(req.body);
  console.log("----------business -----------------------");
  console.log("----------business -----------------------");

  let user = new User(req.body);
  user
    .save()
    .then(user => {
      console.log(user);
      //   res.status(200).json({ user: "User added  successfully" });
    })
    .catch(err => {
      console.log("err   ");
      console.log(err);

      //   res.status(401).send("unable to save database ", err);
    });
});

router.route("/login").post(function(req, res) {
  console.log("Inside login api  ", req.body.email, req.body.password);
  User.findOne({ email: req.body.email }, {}, (err, data) => {
    console.log(err);
    console.log(data);
  });
  let dd = User.findOne({ email: req.body.email }, {}).exec();

  console.log("data  ");
  dd.then(data => {
    console.log("534534543", data);
    data.checkPassword(req.body.password, function(err, isMatch) {
      if (err) return console.log('wrong password',err)
      console.log("matched   ",isMatch)
    });
  }).catch(e => {});

  // console.log('Inside login api  data  ',user_data.checkPassword);
  //   user_data.checkPassword(req.body.password,(err,isMatch)=>{
  //     console.log('err   ',err)
  //     console.log('ismatch    ',isMatch)

  // });
});

router.route("/").get(function(req, res) {
  console.log("response");

  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      // console.log("response", businesses);
      res.json(users);
    }
  });
});

router.route("/edit/:id").get(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.json(user);
  });
});
router.route("/update/:id").post(function(req, res) {
  console.log(req.body);
  console.log(req.params.id);

  User.findById(req.params.id, function(err, user) {
    if (!user) {
      res.status(404).send("data is not found");
    } else {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.password = req.body.password;
      user
        .save()
        .then(user => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the datatbase");
        });
    }
  });
});

router.route("/delete/:id").get(function(req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, (err, business) => {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});
module.exports = router;
