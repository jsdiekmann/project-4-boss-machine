const express = require('express');
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting }  = require('./db');
const meetingsRouter = express.Router();

meetingsRouter.route('/')
    .get((req, res) => {
        meetings = getAllFromDatabase('meetings');
        res.send(meetings);
    })
    .post((req, res) => {
        const newMeeting = createMeeting();
        addToDatabase('meetings', newMeeting);
        res.status(201).json(newMeeting);
    })
    .delete((req, res) => {
        deleteAllFromDatabase('meetings');
        res.status(204).send();
    });
    

module.exports = meetingsRouter;