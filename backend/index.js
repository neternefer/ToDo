const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");
const routes = require("./routes/tasks.js");
var bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use("/", express.static("../"));
app.engine("html", require("ejs").renderFile);
app.use(express.json());
app.use("/tasks", routes);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

mongoose
  .connect(
    "mongodb+srv://user1:3saKGtSfvK2sEaj3@cluster0-kjmeo.mongodb.net/test?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}...`);
});