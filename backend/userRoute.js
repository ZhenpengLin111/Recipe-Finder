const express = require('express')
const database = require('./connect')

// mongodb stores IDs called object ID which doesn't get interpreted cleanly in JS
// so we need OnjectId to allow us to convert a regular string into an object ID that can be compatible with mongodb
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config({ path: "./config.env" })

let userRoutes = express.Router()
const SALT_ROUND = 6

// #1 - Retrieve All
//http://localhost:3000/users
userRoutes.route('/users').get(async (req, res) => {
  let db = database.getDb()

  // pass in empty object to get all data in .find() method
  // The data getting back are cursor(object), to turn them into an array called toArray() function
  let data = await db.collection('users').find({}).toArray()

  // if no data is found or error happen during getting back data from mongodb, we will still getting back a empty array
  if (data.length > 0) {
    //send the data in json format to the frontend
    res.json(data)
  } else {
    throw new Error('Data was not found :(')
    // if not catch block, the server will stop running if error happens
  }
})

// #2 - Retrieve One
//http://localhost:3000/users/12345
userRoutes.route('/users/:id').get(async (req, res) => {
  let db = database.getDb()

  // to get a single post based on id
  let data = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) })

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
userRoutes.route('/users').post(async (req, res) => {
  let db = database.getDb()

  // to check if the user email is taken in the database
  const takenEmail = await db.collection('users').findOne({ email: req.body.email })
  if (takenEmail) {
    return res.json({ message: 'The email is taken' })
  } else {
    // turn the password into encrypted one
    const hash = await bcrypt.hash(req.body.password, SALT_ROUND)

    // new user object adding to mongodb
    let mongoObject = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
      joinDate: new Date(),
      savedRecipes: []
    }

    // insert new user
    let data = await db.collection('users').insertOne(mongoObject)
    res.json(data)
  }

})

// #4 - Update One
userRoutes.route('/users/:id').put(async (req, res) => {
  let db = database.getDb()
  // update the user object to mongodb
  let mongoObject = {
    $set: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      joinDate: req.body.joinDate,
      savedRecipes: req.body.savedRecipes
    }
  }

  // update the user, provide the id to find the post
  let data = await db.collection('users').updateOne({ _id: new ObjectId(req.params.id) }, mongoObject)
  res.json(data)
})

// #5 - Delete One
userRoutes.route('/users/:id').delete(async (req, res) => {
  let db = database.getDb()

  // delete the user, provide the id to find the post
  let data = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) })
  res.json(data)
})

// #6 - Login
userRoutes.route('/users/login').post(async (req, res) => {
  let db = database.getDb()

  // to check if the user email is taken in the database
  const user = await db.collection('users').findOne({ email: req.body.email })

  if (user) {
    // compare if passwords are the same if email is found
    const confirmation = await bcrypt.compare(req.body.password, user.password)
    if (confirmation) {
      // jwt token
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: '1h' })
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Incorrect Password' })
    }
  } else {
    res.json({ success: false, message: 'User not found' })
  }

})

module.exports = userRoutes