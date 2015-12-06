(function() {
    angular
        .module('app.list')
        .controller('ListController', ListController);

    //ListController.$inject = [];

    function ListController($scope, listService) {
        var vm = this;

        vm.movieList = [];

        init();

        function init () {
            //use getMoviesTest when developing locally without PHP server.
            listService.getMovies()
                .then(function(response) {
                    vm.movieList = response.data.movies;
                })
                .catch(function(data) {
                    console.log(data);
                });
        };

    }

})();