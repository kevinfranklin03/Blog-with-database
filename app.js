//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "This is the home page where you can see the blog. If you want to compose one go to the compose route('/compose') and when you finish writing your own blog it will display in the home page. ";
const aboutContent = "Hi, I am kevin franklin currently pursuing bacherlors in computer science at Sathyabama University Chennai. I live in Perumbakkam. I have one year experience of developing web sites dynamically. I love to play games and i would like to become a MERN stack developer";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
 Post.find({}, (err, posts)=>{
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
  });

});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save((err)=>{
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){
  
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, (err, post)=>{
    res.render("post", {
      title: post.title,
      content: post.content
    });
  })
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
