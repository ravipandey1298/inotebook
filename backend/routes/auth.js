const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/". Doesn't require Auth
// In [] we define our body validation.
router.post('/', [
    body('name', 'Please Enter a Valid Name').isLength({min : 3}),
    body('email', 'Please Enter a Valid Email').isEmail(),
    body('password', "Password must be atleast 5 chracters").isLength({min : 5})
], (req, res) =>{

    // If any error in validation it return bad request 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // We Create USER and save it to data base. We are using promisse here .We can use async await instead of .then 
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch((err)=> {console.log(err)})
      res.status(400).json({errors : "Please use Unique EMAIL Account. You are already registered."})
} )

module.exports = router;