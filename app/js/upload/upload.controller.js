(function() {
    angular
        .module('app.upload')
        .controller('UploadController', UploadController);

    //UploadController.$inject = [];

    function UploadController($scope, uploadService) {
        var vm = this;

        vm.uploadStatus = new StatusObj();

        vm.movies = [];

        vm.process = process;
        vm.upload = upload;


        function process (){
            vm.uploadStatus.loading.status = true;
            vm.uploadStatus.loading.msg = 'Parsing file...';
            vm.uploadStatus.errors.status = false;
            vm.movies = [];
            var f = document.getElementById('file').files[0],
                r = new FileReader();

            if (_.isUndefined(f) || f.type !== 'text/xml') {
                vm.uploadStatus.errors.status = true;
                vm.uploadStatus.errors.msg = 'The file you selected is not a valid file type!';
                return;
            }

            r.onloadend = function(e) {

                var data = e.target.result;
                var parser = new DOMParser();
                var iTunes = parser.parseFromString(data, "text/xml");
                iTunes = iTunes.getElementsByTagName('dict')[0];
                iTunes = iTunes.getElementsByTagName('dict')[0];
                var tracks = iTunes.getElementsByTagName('dict');

                _.each(tracks, function(track) {

                    var movie = {};
                    var keys = track.getElementsByTagName('key');

                    _.each(keys, function(key) {
                        var keyName = key.innerHTML;
                        var keyValue = key.nextSibling.innerHTML;

                        //remove spaces in <key>
                        keyName = keyName.replace(/\s+/g, '');

                        //if the next simbling of <key> has no value, treat node as boolean (eg convert <true></true>)
                        if (_.isEmpty(keyValue)) {
                            keyValue = !!key.nextSibling.nodeName;
                        }

                        //assign <key> as object property and next sibling innerHTML as value
                        movie[keyName] = keyValue;
                    });

                    var regex = new RegExp("Movies");
                    //first check if object 'HasVideo' is true and is not a podcast
                    if (movie.HasVideo === true && !movie.Podcast) {
                        //then regex file path to see if file resides in iTunes 'Movies' folder
                        if (regex.test(movie.Location)) {
                            //push to movies array
                            vm.movies.push(movie);
                        }
                    }
                });

                //sort movies array by Name property of contained objects
                vm.movies = _.sortBy(vm.movies, 'Name');

                vm.uploadStatus.success.status = true;
                vm.uploadStatus.success.msg = 'Successfully found ' + vm.movies.length + ' movies in ' + f.name;
                vm.uploadStatus.success.showBtn = true;

                vm.uploadStatus.loading.status = false;

                //manually trigger AngularJS digest cycle
                $scope.$apply();

            };
            r.readAsBinaryString(f);
        };

        function upload () {
            vm.uploadStatus.loading.status = true;
            vm.uploadStatus.loading.msg = 'Sending data to server...';
            uploadService.upload(vm.movies)
                .then(function(data) {
                    console.log(data);
                    vm.uploadStatus.loading.status = false;

                    vm.uploadStatus.success.status = true;
                    vm.uploadStatus.success.msg = 'Successfully uploaded movies to server!';
                    vm.uploadStatus.success.showBtn = false;
                })
                .catch(function(data) {
                    vm.uploadStatus.errors.status = true;
                    vm.uploadStatus.errors.msg = 'There was a problem submitting your data to the server!';
                    console.log(data);
                });
        };

        function StatusObj() {
            this.loading = {
                status: false,
                msg: ''
            };
            this.errors = {
                status: false,
                msg: ''
            };
            this.success = {
                status: false,
                msg: '',
                showBtn: false
            };
        }
    }

})();