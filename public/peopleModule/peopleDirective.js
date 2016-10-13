SearchApp.directive('person', function () {
    return {
        restrict: 'A',
        templateUrl: '/peopleModule/personTemplate.html',
        scope: {
            person: '='
        }
    }
});