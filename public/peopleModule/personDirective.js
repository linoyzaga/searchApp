SearchApp.directive('person', function () {
    return {
        restrict: 'A',
        templateUrl: "/public/peopleModule/personTemplate.html",
        scope: {
            person: '='
        }
    }
});