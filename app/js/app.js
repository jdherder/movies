(function() {
    angular
        .module('app', [
            'ngRoute',
            'app.upload',
            'app.list'
        ])
        .constant('_', window._)
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                when('/upload', {
                    templateUrl: 'templates/upload/upload.html',
                    controller: 'UploadController',
                    controllerAs: 'vm'
                }).
                when('/list', {
                    templateUrl: 'templates/list/list.html',
                    controller: 'ListController',
                    controllerAs: 'vm'
                }).
                otherwise({
                    redirectTo: '/list'
                });
            }]);
})();