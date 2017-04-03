var myApp = angular.module('InsectApp', ['firebase', 'ngRoute', 'ui.bootstrap', 'ngFileUpload']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/views/templates/login.html',
            controller: 'LogInController',
            controllerAs: 'lic'
        }).when('/upload', {
            templateUrl: '/views/templates/upload.html',
            controller: 'formCtrl',
            controllerAs: 'uc'
        })
        .when('/gallery', {
            templateUrl: '/views/templates/gallery.html',
            controller: 'GalleryController',
            controllerAs: 'gc'
        })
        .when('/resources', {
            templateUrl: '/views/templates/resources.html'
        })
        .otherwise({
            redirectTo: 'upload'
        });
}]);
