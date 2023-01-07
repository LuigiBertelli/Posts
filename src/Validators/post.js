const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

const validateObjectId = (req) => {
    try {
        return mongoose.Types.ObjectId(req.params.id.trim());
    } catch(err) {
        console.log(`Error: ${err.message}`);
        return false;
    }
}

exports.getPostValidator = (req, res, next) => {

    const objId = validateObjectId(req);

    if(!objId)
        return res.status(400).send("Error trying to get post - ID malformatted");

    req.params.id = objId;
    next();
}

exports.createPostValidator = [
    check('title')
        .isLength({min: 4, max: 150})
        .withMessage('Title must have a number of chars between 4 an 150!'), 
    check('body')
        .isLength({min: 4, max: 1500})
        .withMessage('Body must have a number of chars between 4 an 1500!'),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty())
            return res.status(400).json({ error: errors.array()[0].msg });

        next();
    }
]

exports.updatePostValidator = [
    check('title')
        .isLength({min: 4, max: 150})
        .withMessage('Title must have a number of chars between 4 an 150!'), 
    check('body')
        .isLength({min: 4, max: 1500})
        .withMessage('Body must have a number of chars between 4 an 1500!'),
    
    (req, res, next) => {
    
        const objId = validateObjectId(req);
        if(!objId)
            return res.status(400).send("Error trying to update post - ID malformatted");
        
        req.params.id = objId;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            let arrayParams = Object.keys(req.body);
            const firstError = errors.array().find(err => arrayParams.find(el => el === err.param));
            if(firstError){
                return res.status(400).json({ error: firstError.msg });
            }
        }

        next();
    }
];

exports.deletePostValidator = (req, res, next) => {

    const objId = validateObjectId(req);

    if(!objId)
        return res.status(400).send("Error trying to delete post - ID malformatted");

    req.params.id = objId;
    next();
};
