const express = require("express");
const businessRoutes = express.Router();

let Business = require("../model/business.model");

businessRoutes.route("/add").post(function(req, res) {
  console.log("----------business -----------------------");
  console.log("----------business -----------------------");
  console.log(req.body);
  console.log("----------business -----------------------");
  console.log("----------business -----------------------");

  let business = new Business(req.body);
  business
    .save()
    .then(business => {
      console.log(business);
      res.status(200).json({ business: "business is added  successfully" });
    })
    .catch(err => {
      res.status(400).send("unable to save database ", err);
    });
});

businessRoutes.route("/").get(function(req, res) {
  console.log("response");

  Business.find(function(err, businesses) {
    if (err) {
      console.log(err);
    } else {
      // console.log("response", businesses);

      res.json(businesses);
    }
  });
});

businessRoutes.route("/edit/:id").get(function(req, res) {
  Business.findById(req.params.id, function(err, business) {
    res.json(business);
  });
});
businessRoutes.route("/update/:id").post(function(req, res) {
  console.log(req.body)
  console.log(req.params.id)

  Business.findById(req.params.id, function(err, business) {
    if (!business) {
      res.status(404).send("data is not found");
    } else {
      business.person_name = req.body.person_name;
      business.business_name = req.body.business_name;
      business.business_gst_number = req.body.business_gst_number;
      business
        .save()
        .then(business => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the datatbase");
        });
    }
  });
});

businessRoutes.route("/delete/:id").get(function(req, res) {
  Business.findByIdAndRemove({ _id: req.params.id }, (err, business) => {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});
module.exports = businessRoutes;
