const express = 'express';
const postDb = require('./postDb.js')

const router = express.Router();

router.get('/', (req, res) => {
    postDb.get()
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});


router.get('/:id', validatePostId, (req, res) => {
    postDb.getById(req.post.id) 
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.delete('/:id', validatePostId, (req, res) => {
    postDb.remove(req.post.id) 
        .then(results => {
            res.status(200).json({statusCode: results})
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
    postDb.update(req.post.id, req.body)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;