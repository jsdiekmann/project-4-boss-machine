const express = require('express');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId }  = require('./db');
const minionsRouter = express.Router();
let minions = getAllFromDatabase('minions');

minionsRouter.route('/')
    .get((req, res) => {
        minions = getAllFromDatabase('minions');
        res.send(minions);
    })
    .post((req, res) => {
        const newMinion = req.body;
        addToDatabase('minions', newMinion);
        res.status(201).json(newMinion);
    });

 
minionsRouter.param('minionId', (req, res, next) => {
    
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if(!minion) {
        res.status(404).send('There is no minion with that ID!');
    }
    req.minion = minion;
    next();
}) 

minionsRouter.route('/:minionId')
    .get((req, res) => {
        res.status(200).json(req.minion);        
    })
    .put((req, res) => {
        const minionUpdate = req.body;
        updateInstanceInDatabase('minions', minionUpdate)
        res.status(200).json(minionUpdate);
4    })
    .delete((req, res) => {
        deleteFromDatabasebyId('minions', req.minion.id);
        res.status(204).send();
    })
    

module.exports = minionsRouter  