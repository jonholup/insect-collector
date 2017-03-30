myApp.controller("GalleryController", ['InsectFactory', '$http', '$firebaseAuth', '$scope', function (InsectFactory, $http, $firebaseAuth, $scope) {
    console.log('GalleryController was loaded');
    var self = this;
    var auth = $firebaseAuth();

       $http.get('/uploads').then(function(response){
    console.log(response.data);
    $scope.uploads = response.data;
  });

    // self.getBugs = function () {
    //     InsectFactory.getBugs().then(function(data) {
    //     self.bugs = data;
    //     console.log(self.bugs);
    //     });
    // };

    // self.getInfo = function () {
    //     InsectFactory.getInfo().then(function(data) {
    //         self.specimen = data;
    //     });
    // };

// self.getBugs();


    // run route to get images from db
    // auth.$onAuthStateChanged(function (firebaseUser) {
    //    if (firebaseUser) {
    //   // make request for clearance level
    //   // This is where we make our call to our server
    //   firebaseUser.getToken().then(function(idToken){
    //     $http({
    //       method: 'GET',
    //       url: '/getBug',
    //       headers: {
    //         id_token: idToken
    //       }
    //     }).then(function(response){
    //       var userClearanceLevel = response.data.userClearanceLevel;
    //       self.secrecyLevelOptions = [];
    //       for (var i = 1; i <= userClearanceLevel; i++) {
    //         self.secrecyLevelOptions.push(i);
    //       }
    //     });
    //   });
    // } else {
    //   self.secrecyLevelOptions = [];
    // }

}]);


