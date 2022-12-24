const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
// our application is running on port 5000. Because our React Application in also running on 3000
const port = 5000

// CORS Middleware to use CORS origin
app.use(cors())

// A Middleware is use to accept json.
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})