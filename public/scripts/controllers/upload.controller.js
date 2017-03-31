// [START vision_quickstart]
// Imports the Google Cloud client library
// myApp.controller("UploadController", ['InsectFactory', '$http', 'Upload', function(InsectFactory, $http, Upload) {
//   console.log('UploadController was loaded');
//   var self = this;
//   self.newBug = {};

//   self.submit = function () {

//     console.log('newBug:', self.newBug);
//      Upload.upload({
//         url: './getBug/uploads',
//         method: 'post',
//         data: self.newBug
//       }).then(function (response) {
//         console.log(response.data);
//         self.getBug.push(response.data);
//         self.newBug = {};
//       });
//   };
//       $http.get('./getBug/uploads').then(function(response){
//     console.log(response.data);
//     self.uploads = response.data;
//   });

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




//  Upload.upload({
//         url: '/uploads',
//         method: 'post',
//         data: $scope.upload
//       }).then(function (response) {
//         console.log(response.data);
//         $scope.uploads.push(response.data);
//         $scope.upload = {};
//       })

// app.controller('formCtrl', [function(){
//   self.submit = function(){
//       Upload.upload({
//         url: '/uploads',
//         method: 'post',
//         data: self.upload
//       }).then(function (response) {
//         console.log(response.data);
//         self.uploads.push(response.data);
//         self.upload = {};
//       });
//     };
// }]);

