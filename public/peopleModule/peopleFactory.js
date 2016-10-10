SearchApp.factory('getPeople', ['$http', function($http) {

    var fac = {};

    // Getting the locations from the DB
    fac.getPeopleByQuery = function (query) {

        return $http.post('/people', {query: query});
    }

    // Return value
    return fac;
}]);