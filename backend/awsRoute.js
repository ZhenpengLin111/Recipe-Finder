const express = require('express')
const database = require('./connect')

// mongodb stores IDs called object ID which doesn't get interpreted cleanly in JS
// so we need OnjectId to allow us to convert a regular string into an object ID that can be compatible with mongodb
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')
// to access the SECRETKEY
require("dotenv").config({ path: "./config.env" })

// initialize the client, create an object in our buckets, get an object, delete an object
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

let awsRoutes = express.Router()
// buckets in AWS = collections in MongoDB
const s3Bucket = 'recipefinder-profileimg-storage'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
})

// #1 - Retrieve One
//http://localhost:3000/posts/12345
awsRoutes.route('/images/:id').get(verifyToken, async (req, res) => {
  const id = req.params.id
  const bucketParams = {
    Bucket: s3Bucket, // name of the bucket we want to access
    Key: id,
  }

  // get the file(image), return a readable stream
  const data = await s3Client.send(new GetObjectCommand(bucketParams)) 

  const contentType = data.ContentType
  // convert the data to base 64 string
  const srcString = await data.Body.transformToString('base64')
  // standard convention for using base64 string in jsx as image sources
  const imageSource = `data:${contentType};base64, ${srcString}`
  res.json(imageSource)
})

// #2 - Create One
awsRoutes.route('/images').post(async (req, res) => {
  // molter automatically adds a files to the request so you can access it when you send a file
  const file = req.files[0]
  console.log(file)
  const bucketParams = {
    Bucket: s3Bucket, // name of the bucket we want to access
    Key: file.originalname, // the file is gonna be named in AWS
    Body: file.buffer // actual content, image itself
  }

  // upload the file
  const data = await s3Client.send(new PutObjectCommand(bucketParams))
  console.log(data)
  res.json(data)
})

// #3 - Delete One
//http://localhost:3000/posts/12345
awsRoutes.route('/images/:id').delete(verifyToken, async (req, res) => {
  const id = req.params.id
  const bucketParams = {
    Bucket: s3Bucket, // name of the bucket we want to access
    Key: id,
  }

  // get the file(image), return a readable stream
  const data = await s3Client.send(new DeleteObjectCommand(bucketParams)) 
  console.log(data)
  res.json(data)
})


// if no token, users are not allow access the awsRoutes
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

module.exports = awsRoutes