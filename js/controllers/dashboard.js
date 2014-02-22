'use strict';

angular.module('iPregnant.controllers').controller('DashboardCtr', function($scope, $http, eventModal) {

  $scope.addEvent = function(type) {
    eventModal(type, null, function(event) {
      console.log(event);
    });
  };

  $http.get('/stub-api/dashboard.json')
    .success(function (data) {
      $scope.patient_cur_date = data.patient_cur_date;
      $scope.patients = data.patients;
      $scope.reports_count = data.reports_count;
      $scope.reports = data.reports;
      $scope.requests_count = data.requests_count;
      $scope.requests = data.requests;
      $scope.messages_count = data.messages_count;
      $scope.messages = data.messages;
    })
  ;
});