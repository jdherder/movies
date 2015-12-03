(function () {
    'use strict';

    angular
        .module('app.upload')
        .factory('uploadService', uploadService);

    /*
     * @ngInject
     */

    function uploadService () {

        var uploadObj = {
            upload: upload
        }

        return uploadObj;

        function upload (moviesObj) {
            console.log(moviesObj);
        }

    }
})();
