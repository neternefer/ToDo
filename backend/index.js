const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");
const tasks = require("./routes/routes");
var bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

mongoose
  .connect(
    "mongodb+srv://user1:3saKGtSfvK2sEaj3@cluster0-kjmeo.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

app.use(express.static("../"));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.use(express.json());
app.use("/api/tasks", tasks);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 5
  },
  status: {
    type: String,
    required: true,
    enum: ["to_do", "in_progress", "done"]
  },
  author: String
});
const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.render("tasks", {
    tasks: tasks
  });
});

app.put("/updateTask", async (req, res) => {
  let result;
  try {
    result = await Task.updateOne(
      { _id: req.body.id },
      { text: req.body.text, status: req.body.status }
    );
    res.send("Task updated");
  } catch (error) {
    res.send("Update was unsuccessful");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}...`);
});
