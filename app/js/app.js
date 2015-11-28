(function() {
    angular
        .module('app', [
            'ngRoute',
            'app.upload'
        ])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                when('/upload', {
                    templateUrl: 'templates/upload/upload.html',
                    controller: 'UploadController',
                    controllerAs: 'vm'
                }).
                otherwise({
                    redirectTo: '/upload'
                });
            }]);
})();