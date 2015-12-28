(function () {
    'use strict';

    angular
        .module('app.upload')
        .factory('uploadService', uploadService);

    uploadService.$inject = ['$http', 'getUsername'];

    function uploadService ($http, getUsername) {

        var uploadObj = {
            upload: upload
        };

        return uploadObj;

        /* ----------------------- */

        function upload (movieList) {
            var payload = getPayloadBody(movieList);

            var promise = $http({
                method: 'POST',
                url: 'api/upload.php',
                data: {data: payload}
            }).then(function successCallback(response) {
                return response.data;
            });

            return promise;
        }

        function getPayloadBody (movieList) {
            var payload = {
                movies: movieList
            };

            payload.name = getUsername.parsePath(movieList[0].Location);

            return payload;
        }

    }
})();
