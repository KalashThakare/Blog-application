import express from 'express';

const app=express();
const port=4000;

app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/yourPosts",(req,res)=>{
    res.render("yourPosts.ejs");
});

app.get("/NewPost",(req,res)=>{
    res.render("/NewPost.ejs");
});

app.listen(port,()=>{
    console.log('server running on port');
});