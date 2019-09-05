const express = 'express';
const userDb = require('./userDb.js');
const postDb = require('../posts/postDb.js')
const router = express.Router();


router.use(express.json());

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    userDb.get()
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(201).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDb.getUserPosts(req.user.id)
        .then(results => {
            res.status(201).json(results) 
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.delete('/:id', validateUserId, (req, res) => {
    userDb.remove(req.user.id) 
        .then(results => {
            res.status(200).json({statusCode: results})
        })
        .catch(error => {
            res.status(500).json(results)
        })
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const userId = req.params.id;

    userDb.getById(userId) 
        .then(results => {
            if (results === undefined) {
                res.status(400).json({ message: "invalid user id" })
            } else {
                req.user = results
                next();
            }
        })
};

function validateUser(req, res, next) {
    // console.log('request body from the validateUser function', !Object.keys(req.body).length)
    if (req.body) {
        res.status(400).json({ message: "error data" });
    } else {
        if (req.body.name) {
            next();
        } else {
            res.status(400).json({ message: "errr on name" })
        }
    }
};


function validatePost(req, res, next) {

};

module.exports = router;
