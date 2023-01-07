const express = require('express');

const postController = require('../Controllers/post');
const postValidator = require('../Validators/post');

const router = express.Router();

const { check } = require('express-validator');

router.get('/', postController.getPosts);

router.get('/totals', postController.getTotalPosts);

router.get('/:id', postValidator.getPostValidator, postController.getPost);

router.post('/create',
    postValidator.createPostValidator,
    postController.createPost
    );

router.put('/update/:id',
    postValidator.updatePostValidator,
    postController.updatePost);

router.delete('/delete/:id',
    postValidator.deletePostValidator,
    postController.deletePost);

module.exports = router;