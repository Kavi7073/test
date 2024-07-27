const express = require ("express");
const { v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "Electro",
        content: "I like gaming!"
    },
    {
        id: uuidv4(),
        username: "Electro Gaming",
        content: "This is a gaming channel!"
    },
    {
        id: uuidv4(),
        username: "Kavi",
        content: "I like coding!"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=> {
    res.render("new.ejs");
});

app.post("/posts",(req,res)=> {
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect('/posts');
});

app.get("/posts/:id",(req,res)=> {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
  });

app.patch("/posts/:id",(req,res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    console.log(newContent);
    res.send("patch request working");
});

app.listen(port,() =>{
    console.log(`Listening to port ${port}`);
});