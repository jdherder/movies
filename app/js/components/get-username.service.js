(function () {
    'use strict';

    angular
        .module('app')
        .factory('getUsername', getUsername);

    function getUsername () {

        var obj = {
            parsePath: parsePath
        };

        return obj;

        /* ----------------------- */

        function parsePath (path) {

            var pathPcs = path.split('/');
            var userIndex = _.findIndex(pathPcs, function(pc) {
                return pc === 'Users';
            });

            var name = userIndex === -1 ? 'unknown' : pathPcs[userIndex + 1];

            return name;
        }

    }
})();
