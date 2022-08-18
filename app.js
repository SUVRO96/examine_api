// console.log("hello");
const express = require("express");
const app = express();
const cors = require("cors");
// require("dotenv").config({path:".env"});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    console.log("examine API is running");
    res.send("<h1>examine API is running</h1>");
  } catch {}
});

const userRoute = require("./routes/users");
const questionsRoute = require("./routes/questions");
app.use("/users", userRoute);
app.use("/questions", questionsRoute);
// app.listen(process.env.APP_PORT);
app.listen(process.env.PORT || 4000);
