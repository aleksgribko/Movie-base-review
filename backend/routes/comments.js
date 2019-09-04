/*
comment {
    id: lastId + 1,
    positive: action.positive,
    forMovie: action.forMovie,
    topic: action.topic,
    description: action.description,
    person: action.person,
}
*/

const express = require('express')
const Joi = require('@hapi/joi');
const router = express.Router()

const comments = [
    {
        id: 1,
        positive: true,
        forMovie: 'The Matrix',
        topic: 'The best movie',
        description: `I think, that this movie is the best and there are the following reasons...pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp ppppppppppppppppppppppppppppppppppppppppppp pppppppppppppppp ppppppppppppppp pppppppppppppppppppppppppppppppppppppp pppppppppppppppppppppppppppppp ppppppppppppppppppppppppppppppppppppppp pppppppppppppppppppppppppppppppppppppppp  pppppppp p p p p p p p p pp p p ppppppppppppppppppppppp pppppppppppppp`,
        person: 'Alezh'
      },   
    {
        id: 2,
        positive: true,
        forMovie: 'The Matrix',
        topic: 'The best movie',
        description: `I think, that this movie is the best and there are the following reasons...`,
        person: 'Alezh'
      },  
    {
        id: 3,
        positive: false,
        forMovie: 'The Matrix',
        topic: 'The best movie',
        description: `I think, that this movie is the best and there are the following reasons...`,
        personID: 'Alezh'
      },

    {
        id: 4,
        positive: true,
        forMovie: 'The Matrix',
        topic: 'The best movie',
        description: `I think, that this movie is the best and there are the following reasons...`,
        person: 'Alezh'
      },

    {
        id: 5,
        positive: true,
        forMovie: 'Equilibrium',
        topic: 'The best movie',
        description: `I think, that this movie is the best and there are the following reasons...`,
        person: 'Alezh'
      },  
    {
        id: 6,
        positive: true,
        topic: 'The best movie',
        forMovie: 'Equilibrium',
        description: `I think, that this movie is the best and there are the following reasons...`,
        person: 'Alezh'
      }
]


// use is a middleware for a logic when we re at the route

router.get('/api/comments', (req, res) => {
    res.send(comments)
})
router.get('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id))
    if (!comment) return res.status(404).send('The comment was not found') // 404 if doesn't exist
    res.send(comment)
})
router.post('/api/comments', (req, res) => {
    const { error } = validateComment(req.body)

    if (error) { // 400 bad request
        return res.status(400).send(error.details[0].message)
    }
    const comment = {
        id: comments.length + 1,
        description: req.body.description,
    }
    comments.push(comment)
    res.send(comment) // by convention we need to return this couse to know the assigned ID
})
router.put('/api/comments/:id', (req, res) => {
    // looks for in id, if not - give back 404
    const comment = comments.find(c => c.id === parseInt(req.params.id))

    if (!comment) {
        return res.status(404).send('The comment was not found')
    } // 404 if doesn't exist

    // if invalid 400
    const { error } = validateComment(req.body)

    if (error) { // 400 bad request
        return res.status(400).send(error.details[0].message)
    }

    //if exists - update
    comment.description = req.body.description
    comment.topic = req.body.topic
    res.send(comment)
})

router.delete('/api/comments/:id', (req, res) => {
    // look up for the comment
    const comment = comments.find(c => c.id === parseInt(req.params.id))
    // Not existing, return 404
    if (!comment) return res.status(404).send('The comment was not found')
    // Delete
    const index = comments.indexOf(comment)
    comments.splice(index, 1)

    //return the same comment
    res.send(comment)
})

function validateComment(comment) {
    const schema = {
        topic: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
    }

    return Joi.validate(comment, schema);
}

module.exports = router