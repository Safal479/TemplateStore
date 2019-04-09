'use strict';
angular.module('templateStore.templates', ['ngRoute','angular.filter'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/templates', {
                templateUrl: 'templates/templates.html',
                controller: 'TemplatesCtrl'
            })
            .when('/templates/:templateId', {
                templateUrl: 'templates/templates-details.html',
                controller: 'TemplateDetailsCtrl'
            });
    }])

    .controller('TemplatesCtrl', ['$scope', '$http', function ($scope, $http) {
        $http({
            method: 'GET',
            url: '/json/templates.json'
        }).then(function (response) {
            $scope.data = response.data;
        });
    }])
    .controller('TemplateDetailsCtrl', ['$scope', '$http', '$routeParams', '$filter', function ($scope, $http, $routeParams, $filter) {
        var templateId = $routeParams.templateId;
        $http({
            method: 'GET',
            url: '/json/templates.json'
        }).then(function (response) {
            $scope.template = $filter('filter')(response.data, function (d) {
                return d.id == templateId;
            })[0];
            $scope.mainImage = $scope.template.images.name;
        });
        $scope.setImage = function (image) {
            $scope.mainImage = image;
        };
    }]);