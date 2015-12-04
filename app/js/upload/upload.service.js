(function () {
    'use strict';

    angular
        .module('app.upload')
        .factory('uploadService', uploadService);

    /*
     * @ngInject
     */

    function uploadService ($http) {

        var uploadObj = {
            upload: upload
        };

        return uploadObj;

        /* ----------------------- */

        function upload (movieList) {
            var payload = getPayloadBody(movieList);
            console.log(payload);

            var promise = $http({
                method: 'POST',
                url: '/api/upload.php',
                data: {data: payload}
            }).then(function successCallback(response) {
                console.log(response);
                return response.data;
            }, function errorCallback(response) {
                console.log(response);
            });

            return promise;
        }

        function getPayloadBody (movieList) {
            var payload = {
                movies: movieList
            };

            var pathPcs = movieList[0].Location.split('/');
            var userIndex = _.findIndex(pathPcs, function(pc) {
                return pc === 'Users';
            });

            console.log(userIndex);

            payload.name = userIndex === -1 ? 'unknown' : pathPcs[userIndex + 1];

            return payload;
        }

    }
})();
