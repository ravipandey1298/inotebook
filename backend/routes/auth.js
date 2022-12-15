const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

// Create a Secret key to Verify Signature (JWT)
const JWT_SECRET = "HeyThisIsMyOrganization";

// ROUTE 1: Create a User using: POST "/api/auth/createUser". Doesn't require Auth
// In [] we define our body validation.
router.post(
  "/createUser",
  [
    body("name", "Please Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Please Enter a Valid Email").isEmail(),
    body("password", "Password must be atleast 5 chracters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Adding the code into try and catch block. if some other error occured our application not crashed in that situation.

    try {
      // If any error in validation it return bad request 400
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Here we are finding email is present for users or not. If any user if present in the dataBase with this same email it will give that user back.
      let user = await User.findOne({ email: req.body.email });

      //If user email is already present in the database is will return response with BAD request 400.
      if (user) {
        return res.status(400).json({ errors: "EmailId id already exist." });
      }

      // We are adding auto generated salt into our password.(This is async call)
      const salt = await bcrypt.genSalt(10);
      // We encrypted the password using hash alogorithm and create a hash of password + salt.(This is async call)
      const securePassword = await bcrypt.hash(req.body.password, salt);

      // We Create USER and save it to data base. We are using promisse here .We can use async await instead of .then
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: "Some error occurred" });
    }

    //   .then(user => res.json(user))
    //   .catch((err)=> {console.log(err)})
    //   res.status(400).json({errors : "Please use Unique EMAIL Account. You are already registered."})
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". Doesn't require Auth
// In [] we define our body validation.
router.post(
  "/login",
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body("password", "Password must be atleast 5 chracters").exists(),
  ],
  async (req, res) => {
    // If any error in validation it return bad request 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      //If user email is not present in the database is will return response with BAD request 400.
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials." });
      }

      // Comparing both passsword provided by user and database password -> return true, false and it is PROMISE. For resolve this use await
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials." });
      }

      //   Creating data for sending in authToken
      const Data = {
        user: {
          id: user.id,
        },
      };

      // Signing the AuthToken
      const authToken = jwt.sign(Data, JWT_SECRET);
      //Sending AuthToken in response is user verified and loggedIn sucessfully.
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/getuser". Doesn't require Auth
// We are using fetchUser it is type of middleware to verify user and know that who is logged in. 
router.post("/getuser", fetchUser, async (req, res) => {

    try{
        userId = req.user.id;
        // find the user based on ID which comes into jwt token and using select method that will help us to skip that data from DB.
        // we can select multiple like { select("-password, -email") }
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
  }
);
module.exports = router;
