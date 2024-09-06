const express = require('express')
const database = require('./connect')

// mongodb stores IDs called object ID which doesn't get interpreted cleanly in JS
// so we need OnjectId to allow us to convert a regular string into an object ID that can be compatible with mongodb
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')
// to access the SECRETKEY
require("dotenv").config({ path: "./config.env" })

let savedRecipeRoute = express.Router()

// #1 - Retrieve All
//http://localhost:3000/savedRecipes
// if verifyToken does not go through, the code in the routes not gonna run
savedRecipeRoute.route('/savedRecipes').get(verifyToken, async (req, res) => {
  let db = database.getDb()

  // pass in empty object to get all data in .find() method
  // The data getting back are cursor(object), to turn them into an array called toArray() function
  let data = await db.collection('savedRecipes').find({}).toArray()

  // if no data is found or error happen during getting back data from mongodb, we will still getting back a empty array
  if (data.length > 0) {
    //send the data in json format to the frontend
    res.json(data)
  } else {
    res.json({message: 'Data was not found :('})
    // throw new Error('Data was not found :(')
    // if not catch block, the server will stop running if error happens
  }
})

// #2 - Retrieve One
//http://localhost:3000/savedRecipes/12345
savedRecipeRoute.route('/savedRecipes/:id').get(verifyToken, async (req, res) => {
  let db = database.getDb()

  // to get a single post based on id
  let data = await db.collection('savedRecipes').findOne({ _id: new ObjectId(req.params.id) })

  // if no data is found or error happen during getting back data from mongodb, we will still getting back a empty array
  // Object.keys => turn the keys of the object into an array
  if (Object.keys(data).length > 0) {
    //send the data in json format to the frontend
    res.json(data)
  } else {
    throw new Error('Data was not found :(')
    // if not catch block, the server will stop running if error happens
  }
})

// #3 - Create One
savedRecipeRoute.route('/savedRecipes').post(verifyToken, async (req, res) => {
  let db = database.getDb()
  // new post object adding to mongodb
  let mongoObject = {
    recipeId: req.body.recipeId,
    user: req.body.user._id,
    dateSaved: req.body.dateSaved,
  }

  // insert new post
  let data = await db.collection('savedRecipes').insertOne(mongoObject)
  res.json(data)
})

// #5 - Delete One
savedRecipeRoute.route('/savedRecipes/:id').delete(verifyToken, async (req, res) => {
  let db = database.getDb()

  // delete the post, provide the id to find the post
  console.log(req.params.id, req.body.user._id)
  let data = await db.collection('savedRecipes').deleteOne({ recipeId: req.params.id }, {user: req.body.user._id})
  console.log(data)
  res.json(data)
})

// if no token, users are not allow access the savedRecipeRoute
function verifyToken(req, res, next) {
  const authHeaders = req.headers['authorization']
  const token = authHeaders && authHeaders.split(' ')[1]
  // ex: Bearer 12345 -> 12345(token)

  // if not token, the user is not authenticated
  if (!token) {
    // 401: not authenticate
    return res.status(401).json({ message: 'Authentication token is missing' })
  }

  // check the SECRETKEY is compatible with the token
  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      // 403: got the token, but do not accept the value
      return res.status(403).json({ message: 'Invalid Token' })
    }
    // if go through, add the user obj to the request body
    req.body.user = user
    next()
  })
}

module.exports = savedRecipeRoute