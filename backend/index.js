const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");
const tasks = require("./routes/routes");
const auth = require('./routes/auth');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    }) 
   .then(() => console.log("Connected to MongoDB..."))
   .catch(err => console.error("Could not connect to MongoDB...", err));

//mongoose
//  .connect("mongodb://localhost/tasks", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//  })
//  .then(() => console.log("Connected to MongoDB..."))
//  .catch(err => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/tasks", tasks);
app.use("/api/users", auth);

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

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}...`);
});
