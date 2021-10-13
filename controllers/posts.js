const express = require("express")
const mongoose = require('mongoose');
const { rawListeners } = require("npmlog");
const postRouter = express.Router();
const Post = require('../models/post');
const postSeed = require('../models/postSeed');


// mongoose playground for posts 

//                                      ROUTES   - INDUCES                                           //
postRouter.get("/posts/seed", (req, res) => {
    Post.deleteMany({}, (error, allPosts) => {}); 
    Post.create(postSeed, (err, data) => {
        res.redirect("/posts")
    });
});

//          Index 

postRouter.get("/posts", (req, res) => {
    Post.find({}, (error, allPosts) => {
        res.render("index.ejs", {
            posts: allPosts,
        })
    })
})



//          New

postRouter.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

//          Delete

postRouter.delete("/posts/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err) => {
        res.redirect("/posts");
    });
});

//          Update

postRouter.put("/posts/:id", (req, res) => {
    console.log(req.body)
    Post.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {
            new: true, 
        },
        (error, updatedPost) => {
            console.log(error)
            res.redirect(`/posts/${req.params.id}`)
        }
    )
})


//          Create

postRouter.post("/posts", (req, res) => {
    req.body.owner = req.session.user
    console.log(req.body)
    Post.create(req.body, (error, createdPost) => {
        res.redirect("/posts")
    })
});

//          Edit

postRouter.get("/posts/:id/edit", (req, res) => { 
    Post.findById(req.params.id, (error, foundPost) => {
        res.render("edit.ejs",{
            post: foundPost, 
        });
    })
        });

postRouter.get('/posts/search', (req, res) => {
    if(req.query.title) {
        Post.find({title: { $regex: req.query.title }}, (err, posts) => {
            res.json(posts);
        });
    } else {
        res.render('search.ejs');
    }
});
// Show 

postRouter.get("/posts/:id", (req, res) => {
    Post.findById(req.params.id).populate("owner").exec((err, foundPost) => {
        res.render("show.ejs", {
            post: foundPost
        });

    })
})


// Search/Router

module.exports = postRouter;
