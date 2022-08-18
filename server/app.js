const express = require('express')
const app = express()
const port = 8000
const mongoose= require("mongoose");
const cors = require("cors")

const mernprac = require('./Model/userschema')

const router= require('./Routes/route')

require ("./DB/connection")

app.use(express.json());
app.use(cors());
// app.use(express.json());
app.use(router);



// app.get('/', (req, res) => {
//   res.send('Hello ')
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})