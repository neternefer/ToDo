const express = require("express");
const path = require('path');
const _ = require("lodash");
const Joi = require("joi");
const router = express.Router();
const Task = require("../model/task");

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../../login.html"));
});

router.post("/", async (req, res) => {
  if (!req.body.text || req.body.text < 5) {
    //400 Bad Request
    res
      .status(400)
      .send("the text is required and it should take at least 5 characters");
    return;
  }
  let task = new Task(_.pick(req.body, ["text", "status", "author"]));
  // let customer = new Customer({
  //     name: req.body.name,
  //     isGold: req.body.isGold,
  //     phone: req.body.phone
  // });
  try {
    task = await task.save();

    res.send(task);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id }); //method takes filter or query object

    if (result.deletedCount === 0) {
      res.status(404).send(result);
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});
module.exports = router;
