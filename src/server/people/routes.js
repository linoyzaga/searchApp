var mongoose = require('mongoose');
var express = require('express');
var People = require('./db').People;
var router = express.Router();

// Get all locations
router.post('/', function(req, res) {

    // Save the conditions into variables
    var name = req.body.query.name;
    var age = req.body.query.age;
    var phone = req.body.query.phone;

    // Build the query
    var query = queryBuilder(name, age, phone);

    People.find(query, {limit: 10}, function (err, docs) {

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
        queryToReturn.name = new RegExp(name, "i")
    }

    // Add the phone condition
    if (phone != "") {
        queryToReturn.phone = phone;
    }

    // Add the age condition
    if (age != "") {

        var todayDate = new Date();
        var todayMonth = todayDate.getMonth() + 1;
        var todayDay = todayDate.getUTCDate();

        // Calc the binary age
        var beginOFYear = Date.parse(new Date(parseInt(01) + '/' + parseInt(01) + '/' + age)) / 10000;
        var endOfYear = Date.parse(new Date(todayMonth + '/' + todayDay + '/' + age)) / 10000;

        // Set the query for all the people who got this age in this year
        queryToReturn.birthday = {$gte: beginOFYear, $lt: endOfYear};
    }

    // Return the new query
    return queryToReturn;
}

module.exports = router;