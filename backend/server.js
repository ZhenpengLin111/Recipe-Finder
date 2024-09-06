const connect = require('./connect')
const express = require('express')
const cors = require('cors')
const users = require('./userRoute')
const savedRecipe = require('./savedRecipeRoute')
const awsRoutes = require('./awsRoute')
const multer = require('multer')
const upload = multer()

const app = express()
const PORT = 5001

app.use(cors())
app.use(express.json())
app.use(upload.any())
app.use(users)
app.use(savedRecipe)
app.use(awsRoutes)


app.listen(PORT, () => {
  connect.connectToServer()
  console.log(`Server is running on port ${PORT}...`);
})