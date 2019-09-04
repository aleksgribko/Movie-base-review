/*
user {
    id: id
    name: action.payload.name
    admin: false
}
*/

const express = require('express')
const Joi = require('@hapi/joi');
const router = express.Router()

const comments = [
    {
        id: 1,
        name: 'Alezh',
        admin: true,        
      },   
    {
        id: 2,
        name: 'UserTest',
        admin: false, 
      },  
]


// use is a middleware for a logic when we re at the route

router.get('/api/users/:id', (req, res) => {
    res.send(req.query)  // query is http://api/users/2?sortBy=name  and we will get {"sortBy":"name"}
})

function validateComment(comment) {
    const schema = {
        topic: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
    }

    return Joi.validate(comment, schema);
}

module.exports = router