var mongoose = require('mongoose');
var express = require('express');
var people = require('./db').people;
var router = express.Router();

// Get all locations
router.get('/', function(req, res) {
    people.find(function (err, docs) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        // Return value
        res.send(docs);
    });
});

module.exports = router;