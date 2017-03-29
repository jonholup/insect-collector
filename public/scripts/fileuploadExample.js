var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('formCtrl', ['$scope', '$http', 'Upload', function($scope, $http, Upload){
  $scope.message = 'hi';
  $scope.submit = function(){
      Upload.upload({
        url: '/uploads',
        method: 'post',
        data: $scope.upload
      }).then(function (response) {
        console.log(response.data);
        $scope.uploads.push(response.data);
        $scope.upload = {};
      });
    };
    $http.get('/uploads').then(function(response){
    console.log(response.data);
    $scope.uploads = response.data;
  });
}]);
