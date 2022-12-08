const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/createUser". Doesn't require Auth
// In [] we define our body validation.
router.post('/createUser', [
    body('name', 'Please Enter a Valid Name').isLength({min : 3}),
    body('email', 'Please Enter a Valid Email').isEmail(),
    body('password', "Password must be atleast 5 chracters").isLength({min : 5})
], async (req, res) =>{

    // Adding the code into try and catch block. if some other error occured our application not crashed in that situation.

    try{
    // If any error in validation it return bad request 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Here we are finding email is present for users or not. If any user if present in the dataBase with this same email it will give that user back.
    let user = await User.findOne({email : req.body.email})

    //If user email is already present in the database is will return response with BAD request 400.
    if(user){
        return res.status(400).json({errors : "EmailId id already exist."})
    }
    // We Create USER and save it to data base. We are using promisse here .We can use async await instead of .then 
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      res.json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({errors : "Some error occurred"})
    }
      
    //   .then(user => res.json(user))
    //   .catch((err)=> {console.log(err)})
    //   res.status(400).json({errors : "Please use Unique EMAIL Account. You are already registered."})
} )

module.exports = router;