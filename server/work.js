const express = require('express');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId }  = require('./db');
const workRouter = express.Router();

workRouter.route('/:minionId/work')
    .get((req, res) => {
        const minionId = getFromDatabaseById('minions', req.params.minionId);
        if(!minionId) {
            res.status(404).send('There is no minion with that ID!');
        } else {
            const work = getAllFromDatabase('work');
            const workByMinion = work.filter(item => item.minionId == req.params.minionId);
            res.send(workByMinion);
        }
    })
    .post((req, res) => {
        const newWork = req.body;
        addToDatabase('work', newWork);
        res.status(201).json(newWork);
    });

workRouter.param('workId', (req, res, next) => {
    const work = getFromDatabaseById('work', req.params.workId);
    if(!work) {
        res.status(404).send('There is no work with that ID!')
    }
    next();
})

workRouter.route('/:minionId/work/:workId')
    .put((req, res) => {
        const referenceWork = getFromDatabaseById('work', req.params.minionId);
        const workUpdate = req.body;
        if(workUpdate.id != referenceWork.id || workUpdate.minionId != referenceWork.minionId) {
        res.status(400).send('There is no work by that ID for that particular minion!');
        }
        updateInstanceInDatabase('work', workUpdate)
        res.status(200).json(workUpdate);
        }
    )
    .delete((req, res) => {
        const referenceMinion = getFromDatabaseById('minions', req.params.minionId);
        const referenceWork = getFromDatabaseById('work', req.params.workId);
        const workExists = referenceWork.minionId === referenceMinion.id;
        if(!workExists) {
            res.status(400).send('There is no work by that ID to delete for that particular minion!');
        }
        deleteFromDatabasebyId('work', req.params.workId);
        res.status(204).send();
    })
    

module.exports = workRouter  