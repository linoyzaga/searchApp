var mongoose = require('mongoose');
var express = require('express');
var people = require('./db').people;
var router = express.Router();

// Get all locations
router.post('/', function(req, res) {

    // Save the conditions into variables
    var name = req.body.query.name;
    var age = req.body.query.age;
    var phone = req.body.query.phone;

    // Build the query
    var query = queryBuilder(name, age, phone);

    people.find(function (err, docs) {

        // Check the connection completed
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        // Return value
        res.send(docs);
    });
});

var queryBuilder = function (name, age, phone) {

    // Init the variable to return
    var queryToReturn = {};

    // Add the name condition
    if (name != "") {
        queryToReturn.name = "/" + name + "/";
    }

    // Add the phone condition
    if (phone != "") {
        queryToReturn.phone = phone;
    }

    // Add the age condition
    if (age != "") {
        queryToReturn.birthday = age;
    }

    // Return the new query
    return queryToReturn;
}

module.exports = router;