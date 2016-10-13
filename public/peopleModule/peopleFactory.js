SearchApp.factory('peopleService', ['$http', function($http) {
    var fac = {};

    // Getting the people from the server
    fac.getPeopleByQuery = function (query) {
        return $http.post('/people', {query: query});
    };

    fac.getMorePeopleForQuery = function () {
        return $http.get('/people/moreResults');
    }

    return fac;
}]);