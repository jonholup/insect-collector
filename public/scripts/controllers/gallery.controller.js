myApp.controller("GalleryController", ['InsectFactory', '$http', '$firebaseAuth', '$scope', function (InsectFactory, $http, $firebaseAuth, $scope) {
    var self = this;
    var auth = $firebaseAuth();

    self.getBugs = function () {
        InsectFactory.getBugs().then(function (data) {
            console.log('DATA:', data);

            self.uploads = data;
        });
    };

    self.getBugs();

}]);


