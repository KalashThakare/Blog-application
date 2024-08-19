import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

let posts = [
];
let lastId = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes for handling the blog posts (API)
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/posts", (req, res) => {
    console.log(posts);
    res.json(posts);
});

app.get("/blog/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
});

app.post("/blog/posts", (req, res) => {
    const newId = ++lastId;
    const post = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };
    posts.push(post);
    res.status(201).json(post);
});

app.patch("/blog/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;

    res.json(post);
});

app.delete("/blog/posts/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });

    posts.splice(index, 1);
    res.json({ message: "Post deleted" });
});

// Routes for rendering the blog UI
app.get("/blog", (req, res) => {
    console.log(posts);
    res.render("blogedit.ejs", { posts });
});

app.get("/new", (req, res) => {
    res.render("newblog.ejs", { heading: "New Post", submit: "Create Post" });
});


app.get("/edit/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.render("Posts.ejs");
});


app.post("/api/posts", (req, res) => {
    const newId = ++lastId;
    const post = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };
    posts.push(post);
    res.redirect("/blog");
});

app.post("/api/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;

    res.redirect("/blog");
});

app.delete("/api/posts/delete/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });

    posts.splice(index, 1);
    res.redirect("/blog");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
