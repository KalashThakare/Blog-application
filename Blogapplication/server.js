import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';


const port=3000;
const app=express();
const API_URL="http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/blog",async(req,res)=>{
    try {
        const response=await axios.get(`${API_URL}/blog/posts`);
        console.log(response);
        res.render("blogedit.ejs",{ posts:response.data});
        
    } catch (error) {
        res.status(404).json({message:"Error fetching posts"});
        
    }
});

app.get("/new",(req,res)=>{
    res.render("blogedit.ejs",{heading:"New Post", submit:"Create Posts" });

});

app.get("/edit/:id",async(req,res)=>{
    try {
        const response=await axios.get(`${API_URL}/posts/${req.params.id}`);
        console.log(response.data);
        res.render("/blogedit.ejs",{
            post:response.data,
        });
    } catch (error) {
        res.status(500).json({message:"Error fetching post"})
    }
});

app.post("/api/posts",async(req,res)=>{
    try {
        const response=await axios.post(`${API_URL}/posts`,req.body);
        console.log(response.data);
        res.redirect("/blog");
        
    } catch (error) {
        res.status(500).json({message:"Error creating a post"});
        
    }
});

app.post("/api/posts/:id",async(req,res)=>{
    console.log("called");
    try {
        const response=await axios.patch(`${API_URL}/posts/${req.params.id}`,req.body);
        console.log(response.data);
        res.redirect("/blog");

    } catch (error) {
        res.status(500).json({message:"Error updating the post"});
        
    }
});

app.delete("/api/posts/delete/:id",async(req,res)=>{
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/blog");
    } catch (error) {
        res.status(500).json({message:"Error deleting the post"});
    }
});

app.listen(port,()=>{
    console.log(`Backend server is running on http://localhost:${port}`);
});

