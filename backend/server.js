const connect = require('./connect')
const express = require('express')
const cors = require('cors')
const users = require('./userRoute')
const savedRecipe = require('./savedRecipeRoute')

const app = express()
const PORT = 5001

app.use(cors())
app.use(express.json())
app.use(users)
app.use(savedRecipe)

app.listen(PORT, () => {
  connect.connectToServer()
  console.log(`Server is running on port ${PORT}...`);
})