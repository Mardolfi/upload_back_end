require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require('cors')
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_ADMIN}:${process.env.MONGODB_PASSWORD}@cursonode.bdkmkyc.mongodb.net/?retryWrites=true&w=majority`,
  (err) => {
    err ? console.log(err) : console.log("Database connected!");
  }
);

app.use(require("./routes"));

app.listen(process.env.PORT || 3333, () => 'Listening on 3333');
