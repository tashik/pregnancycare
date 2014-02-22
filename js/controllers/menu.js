'use strict';

angular.module('iPregnant.controllers').controller('MenuCtr', function($scope, $http) {
  $http.get('/stub-api/new-content-counter.json')
    .success(function (data) {
      $scope.news = data;
    })
  ;
});