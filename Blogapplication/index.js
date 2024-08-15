import express from 'express';
import bodyParser from 'body-parser';


const app=express();
const port=4000;

app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/Posts",(req,res)=>{
    res.render("Posts.ejs");
});



app.listen(port,()=>{
    console.log('server running on port');
});