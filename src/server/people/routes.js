var mongoose = require('mongoose');
var express = require('express');
var People = require('./db').People;
var router = express.Router();
var queryResults = {};

// Get all locations
router.post('/', function(req, res) {

    // Save the conditions into variables
    var name = req.body.query.name;
    var age = req.body.query.age;
    var phone = req.body.query.phone;

    // Build the query
    var query = queryBuilder(name, age, phone);

    People.find(query, {limit: 10}, function (err, docs) {

        // Check if there is are any results for query
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        console.log(docs[0].name);

        // Init the queryResults variables
        queryResults.docs = docs;
        queryResults.numOfResults = 10;

        if (docs.length > 10) {
            queryResults.isEnd = false;
        }
        else {
            queryResults.isEnd = true;
        }

        // Init the results to return
        var resultsToReturn = {};
        resultsToReturn.docs = docs.slice(0, 10);
        resultsToReturn.isEnd = queryResults.isEnd;

        // Return value
        res.send(resultsToReturn);
    });
});

router.get('/moreResults', function (req, res) {

    // Upgrade he results number
    queryResults.numOfResults += 10;

    if (queryResults.docs.length > queryResults.numOfResults) {
        queryResults.isEnd = false;
    }
    else {
        queryResults.isEnd = true;
    }

    // Init the results to return
    var resultsToReturn = {};
    resultsToReturn.docs = queryResults.docs.slice(queryResults.numOfResults - 10, queryResults.numOfResults);
    resultsToReturn.isEnd = queryResults.isEnd;

    // Return value
    res.send(resultsToReturn);

});

var queryBuilder = function (name, age, phone) {

    // Init the variable to return
    var queryToReturn = {};

    // Add the name condition
    if (name.length > 0) {
        queryToReturn.name = new RegExp(name.join(" "), 'i');
    }

    // Add the phone condition
    if (phone != undefined) {
        queryToReturn.phone = phone;
    }

    // Add the age condition
    if (age != undefined) {

        var todayDate = new Date();
        var thisYear = todayDate.getFullYear();
        var todayMonth = todayDate.getMonth() + 1;
        var todayDay = todayDate.getUTCDate();
        var birthYear = (thisYear - age);

        // Calc the binary age
        var beginOFYear = Date.parse(new Date('01' + '/' + '01' + '/' + birthYear)) / 1000;
        var endOfYear = Date.parse(new Date(todayMonth + '/' + todayDay + '/' + birthYear)) / 1000;

        // Set the query for all the people who got this age in this year
        queryToReturn.birthday = {$gte: beginOFYear, $lt: endOfYear};
    }

    // Return the new query
    return queryToReturn;
}

module.exports = router;