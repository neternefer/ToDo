const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Task = require("../model/task.js");
var bodyParser = require("body-parser");

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.post("/", async (req, res) => {
  if (!req.body.text || req.body.text < 5) {
    //400 Bad Request
    res
      .status(400)
      .send("the text is required and it should take at least 5 characters");
    return;
  }
  let task = new Task(_.pick(req.body, ["text", "status", "author"]));
  try {
    task = await task.save();

    res.send(task);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.render("tasks", {
    tasks: tasks
  });
});

// body should include: text, status
router.put("/:id", async (req, res) => {
  let result;
  try {
    console.log(req.body);
    result = await Task.updateOne({
      _id: req.params.id
    }, {
      text: req.body.text,
      status: req.body.status
    });
    if (result.nModified > 0) {
      res.send("Update was successful");
    } else {
      res.send("Update was unsuccessful");
    }
  } catch (error) {
    res.send("Update was unsuccessful");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Task.deleteOne({
      _id: req.params.id
    }); //method takes filter or query object

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