const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const connectionString = process.env.DB_STRING
MongoClient.connect(connectionString)
.then(client => {

console.log('Connected to database') 
const db = client.db('ticketing-System-db')
const taskCollection = db.collection('ticketing-System')
console.log(taskCollection)
})
.catch(error=> console.error(error))