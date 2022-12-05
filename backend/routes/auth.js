const express = require('express')

const router = express.Router()

router.get('/', (req, res) =>{
    const obj = {
        name : "ravi",
        email : "ravi@123.com"
    }
    res.json(obj);
} )

module.exports = router;