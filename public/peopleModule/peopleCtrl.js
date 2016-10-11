SearchApp.controller('peopleCtrl', ['$scope', 'getPeople', function ($scope, getPeople) {

    // Init variables
    $scope.peopleSearch = [];
    $scope.query = {};
    $scope.query.name = "";
    $scope.query.age = "";
    $scope.query.phone = "";

    // Methods

    // Search button
    $scope.search = function(){

        // Split the query
        var searchConditionals = $scope.searchQuery.split(' ');

        // Pass the array and check the conditions
        for (var i = 0; i < searchConditionals.length; i++)
        {
            // Check if it's a name (can end with dot)
            if ((/^[a-zA-Z]/.test(searchConditionals[i])) || (/^[a-zA-Z]+\.$/.test(searchConditionals[i]))) {

                // Check if there is a name before and add a " "
                if ($scope.query.name != "")
                {
                    $scope.query.name += " ";
                }

                // Add the name
                var convertedName = searchConditionals[i].charAt(0).toUpperCase() + searchConditionals[i].substr(1).toLowerCase();
                $scope.query.name += convertedName;
            }

            // Check if there is a phone number
            if(/[0-9]+\-[0-9]/.test(searchConditionals[i])) {
                $scope.query.phone = searchConditionals[i];
            }

            // Check if it is a age
            if (/^[0-9]{2}$/.test(searchConditionals[i])) {

                var year = $scope.birthYearCalc(parseInt(searchConditionals[i]));
                $scope.query.age = year;
            }
        }

        // Check if the query is defined
        if ($scope.query == {}){$scope.results = [];}

        // Send the query to the server for results and save them
        getPeople.getPeopleByQuery($scope.query).success(function (res) {
            $scope.peopleSearch = res;

            // Calc the age
            for (var i = 0; i< $scope.peopleSearch.length; i++)
            {
                $scope.peopleSearch[i].age = $scope.ageCalc($scope.peopleSearch[i].birthday);
            }
        }).error(function (error) {
            console.log(error);
        })

        // Clear the search conditions for the next query
        /*$scope.query.name = "";
        $scope.query.age = "";
        $scope.query.phone = "";*/
    }

    $scope.birthYearCalc = function (oldAge) {
         var birthYear;

        // Calculate the age
        var todayDate = new Date();
        var todayYear = todayDate.getFullYear();

        birthYear = todayYear - oldAge;

        // Return value
        return birthYear;
    }

    $scope.ageCalc = function (binaryDate) {
        var age;

        // Return value
        return age;
    }

}]);