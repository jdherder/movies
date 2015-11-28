(function() {
    angular
        .module('app')
        .directive('navigation', navigation);

    function navigation() {
        return {
            restrict: 'E',
            templateUrl: 'templates/components/navigation.html',
            replace: true
        }
    }

})();