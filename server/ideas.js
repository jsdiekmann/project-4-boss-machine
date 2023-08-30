const express = require('express');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId }  = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideasRouter = express.Router();
let ideas = getAllFromDatabase('ideas');


ideasRouter.route('/')
    .get((req, res) => {
        ideas = getAllFromDatabase('ideas');
        res.send(ideas);
    })
    .post(checkMillionDollarIdea, (req, res) => {
        const newIdea = req.body;
        addToDatabase('ideas', newIdea);
        res.status(201).json(newIdea);
    });
    

ideasRouter.param('ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if(!idea) {
        res.status(404).send('That idea does not exist!');
    }
    req.idea = idea;
    next();
})

ideasRouter.route('/:ideaId')
    .get((req, res) => {
        res.status(200).json(req.idea);
    })
    .put((req, res) => {
        const ideaUpdate = req.body;
        updateInstanceInDatabase('ideas', ideaUpdate)
        res.status(200).json(ideaUpdate);
    })
    .delete((req, res) => {
        deleteFromDatabasebyId('ideas', req.params.ideaId);
        res.status(204).send();
    })
    

module.exports = ideasRouter  