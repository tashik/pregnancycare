'use strict';

angular.module('iPregnant.controllers').controller('PatientProfileCtr', function($scope, $http) {
  $http.get('/stub-api/patient.json').success(function(data) {
    $scope.patient = data;
  })
});