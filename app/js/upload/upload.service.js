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

            var promise = $http({
                method: 'POST',
                url: '/api/upload.php',
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

            var pathPcs = movieList[0].Location.split('/');
            var userIndex = _.findIndex(pathPcs, function(pc) {
                return pc === 'Users';
            });

            payload.name = userIndex === -1 ? 'unknown' : pathPcs[userIndex + 1];

            return payload;
        }

    }
})();
