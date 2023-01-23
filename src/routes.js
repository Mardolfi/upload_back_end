const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const PostModel = require("./models/Post");
const path = require('path')

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, filename: key, size } = req.file;

  const post = await PostModel.create({
    name,
    size,
    key,
    url: `http://localhost:3333/files/${key}`,
  });

  return res.json(post);
});

routes.get('/posts/download/:id', async (req, res) => {
  const post = await PostModel.findById(req.params.id)
  res.download(path.resolve(__dirname, '..', 'tmp', 'uploads', post.key))
})

routes.get('/posts', async (req, res) => {
    const posts = await PostModel.find({})
    return res.json(posts)
})

routes.delete('/posts/:id', async (req, res) => {
    const post = await PostModel.findById(req.params.id)

    post.remove()

    return res.json(post)
})

routes.get('/posts/:id', async (req, res) => {
    const post = await PostModel.findById(req.params.id)

    return res.json(post)
})

module.exports = routes;
