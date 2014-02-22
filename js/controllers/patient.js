'use strict';

angular.module('iPregnant.controllers').controller('PatientCtr', function($scope, $http) {
  $http.get('/stub-api/patients.json')
    .success(function (data) {
      $scope.patients = data;
      $scope.predicate = ['lastName','firstName', 'middleName'];
    });

  $http.get('/stub-api/tariff-list.json').success(function(data) {
    $scope.tariffList = data;
    for (var i=0; i<data.length; i++) {
      if (data[i].default) {
        $scope.defaultTariff = data[i];
      }
    }
  });
});