myApp.controller('formCtrl', ['InsectFactory', '$scope', '$http', 'Upload', function (InsectFactory, $scope, $http, Upload) {
  $scope.message = 'hi';
  $scope.submit = function () {
    Upload.upload({
      url: '/uploads',
      method: 'post',
      data: $scope.upload
    }).then(function (response) {
      console.log(response.data);
      // $scope.uploads.push(response.data);
      $scope.upload = {};
    }).then(function () {
      $http.get('/uploads').then(function (response) {
        console.log(response.data);
        $scope.uploads = response.data;
      });
    });
  };
    // self.onFileSelect = function ($files) {
    //   Upload.upload({
    //     url: './uploads',
    //     method: 'post',
    //     file: $files
    //   }).progress(function (e) {
    //   }).then(function (data, status, headers, config) {
    //     // file is uploaded successfully
    //     console.log(data);
    //   });
    // };

  }]);

