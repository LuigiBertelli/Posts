const Post = require("../Models/post");

const configJson = require('../Configs/post.json');

exports.getPosts = (req, res) => {
    Post.find().select('title body createdAt').sort({createdAt: -1}).limit(configJson.getPosts.limit)
            .then(posts => res.json({success: posts}))
            .catch(err => {
                res.status(500).json({error: "Error occurred trying to get the posts, please try again later!"});
                console.log(err);
            });
}

exports.getTotalPosts = (req, res) => {
    Post.countDocuments((err, success) => {
        if(err)
            return res.status(500).json({error: "Error occurred trying to get the total posts, please try again later!"});
        
        res.json({success});
      });
}

exports.getPost = (req, res) => {
    const {id} = req.params;

    Post.findById(id).select('-_id title body')
        .then(post => res.send(post))
        .catch(err => {
            res.status(500).send("Error occurred trying to get the posts, please try again later!");
            console.log(err);
        });
}

exports.createPost = (req, res) => {
    const newPost = new Post(req.body);

    newPost.save()
        .then((data) => res.status(200).json({success: data}))
        .catch((ex) => res.status(400).json({ errors: [{msg: ex.message}] }));
} 

exports.updatePost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.status(200).json({success: `Post #${req.params.id} updated!`}))
        .catch(ex => res.status(400).json({ errors: [{msg: ex.message}] }));
} 

exports.deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(data => res.status(200).json({success: `Post #${req.params.id} deleted!`}))
        .catch(ex => res.status(400).json({ errors: [{msg: ex.message}] }));
} 