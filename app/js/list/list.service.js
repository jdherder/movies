(function () {
    'use strict';

    angular
        .module('app.list')
        .factory('listService', listService);

    /*
     * @ngInject
     */

    function listService ($http, $q) {

        var listObj = {
            getMovies: getMovies,
            getMoviesTest: getMoviesTest
        };

        return listObj;

        /* ----------------------- */

        function getMovies () {
            var promise = $http({
                method: 'GET',
                url: 'api/get.php'
            }).then(function successCallback(response) {
                return response.data;
            });

            return promise;
        }

        function getMoviesTest () {
            return $q.when({
               "time": "2015-12-05 04:48:05",
               "movies": [
                   {
                       "movie": "10,000 BC",
                       "year": "2008",
                       "filesize": "1887707937",
                       "runtime": "6535637",
                       "names": "Kevin,Josh,Jay",
                       "movie2": "10,000 BC"
                   },
                   {
                       "movie": "12 Angry Men",
                       "year": "1957",
                       "filesize": "655656401",
                       "runtime": "5773931",
                       "names": "Josh,Jay",
                       "movie2": "12 Angry Men"
                   },
                   {
                       "movie": "12 Years A Slave",
                       "year": "2013",
                       "filesize": "1333437471",
                       "runtime": "8050630",
                       "names": "Josh,Jay",
                       "movie2": "12 Years A Slave"
                   }
               ]
            });
        }
    }
})();
