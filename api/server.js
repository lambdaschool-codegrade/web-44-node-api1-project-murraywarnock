// BUILD YOUR SERVER HERE
const express = require('express') // import express from 'express' // ES6
const User = require('./users/model')
// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// [POST] /api/users/users (create new user)
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        return res.status(400).json({message:  "Please provide name and bio for the user"})
    }
    User.insert({ name, bio })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  })
// [GET] /api/users (fetch all users)
server.get('/api/users', (req, res) => {
    User.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  })
// [GET] /api/users/:id 
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.findById(id)
      .then(user => {
        if (!user) {
          res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
          res.status(200).json(user)
        }
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  })
  // [DELETE] /api/users/:id 
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.remove(id)
        .then(user => {
            if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
            res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    })
// [PUT] /api/users/:id (update user with :id using JSON payload)
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    User.update(id, { name, bio })
      .then(user => {
        if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "The user information could not be modified" })
      })
  })
module.exports = server; 
