(function() {
    angular
        .module('app.upload')
        .controller('UploadController', UploadController);

    //UploadController.$inject = [];

    function UploadController() {
        var vm = this;

        vm.add = function(){
            var f = document.getElementById('file').files[0],
                r = new FileReader();
            r.onloadend = function(e){
                var data = e.target.result;
                var x2js = new X2JS();

                data = data.split('\n').slice(2).join('\n');
                console.log('data', data);

                var iTunes = x2js.xml_str2json(data);

                console.log('parsed xml', iTunes);
            }
            r.readAsBinaryString(f);
        }
    }

})();