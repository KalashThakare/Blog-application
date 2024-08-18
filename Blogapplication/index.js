import express from 'express';
import bodyParser from 'body-parser';


const app=express();
const port=4000;

let posts=[];

let lastId=0;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/posts",(req,res)=>{
    
    console.log(posts);
    res.json(posts);
});

app.get("/blog/posts/:id",(req,res)=>{
    const post=posts.find((p)=>p.id===parseInt(req.params.id));
    if(!post) return res.status(404).json({message:"Post not found"});
    res.json(post);
});

app.post("/blog/posts",(req,res)=>{
    const newId=lastId+=1;
    const post={
        id:newId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date:new Date(),
    };
    lastId=newId;
    posts.push(post);
    res.status(201).json(post);
});

app.patch("/blog/posts/:id",(req,res)=>{
    const post=posts.find((p)=>p.id===parseInt(req.params.id));
    if(!post) return res.status(404).json({message:"Post not found"});

    if(req.body.title) post.title=req.body.title;
    if(req.body.content) post.content=req.body.content;
    if(req.body.author) post.author=req.body.author;

    res.json(post);
});

app.delete("/blog/posts/:id",(req,res)=>{
    const index=posts.findIndex((p)=>p.id===parseInt(req.params.id));
    if(index=== -1) return res.status(404).json({message:"Post not found"});

    posts.splice(index, 1);
    res.json({message:"Post deleted"});

});

app.listen(port,()=>{
    console.log(`API is running at http://localhost:${port}`);
});