const connectDB = require('./db/connection')
const express = require("express");
const app = express();
const cors = require("cors");
const tasks = require("./routes/task");
require("dotenv").config();

const notFound = require('./middleware/notFound');
const errorHandelerMiddleWare = require ('./middleware/error-handeler');
const path = require("path");







app.use(express.json());


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.get("/hello", (req, res) => {
  res.send("Task manager app");
});

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandelerMiddleWare);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}


const port = process.env.PORT || 3000;

const start = async () => {
  try{
  await connectDB(process.env.MONGO_URI);
app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch(error) {
    console.log(error)
  }
}



start()

