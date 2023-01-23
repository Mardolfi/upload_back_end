const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const PostSchema = new mongoose.Schema({
  name: String,
  key: String,
  url: String,
  size: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.post("remove", (doc) => {
  return promisify(fs.unlink)(
    path.resolve(__dirname, "..", "..", "tmp", "uploads", doc.key)
  );
});

module.exports = mongoose.model("Post", PostSchema);
