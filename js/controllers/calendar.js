'use strict';

angular.module('iPregnant.controllers').controller('CalendarCtr', ['$scope', 'api', 'eventModal', function($scope, api, eventModal) {
  $scope.calendarDate = new Date();

  api.auth.login({ login: 'doctor', password: '1234567'}).$promise.then(function() {
    var x = api.activity.query({ user_id: 1, max: null, order: 'd' });
  });

  $scope.addAppointment = function() {
    eventModal('appointment', null, function(event) {
      console.log(event);
    });
  };

  $scope.dateCssClass = function(date) {
    return Math.random() > 0.7 ? 'has-event' : '';
  };
  $scope.onCalendarMove = function(date) {
    $scope.calendarDate = date;
  };
  $scope.toggleFilter = function(type) {
    $scope.filter[type] = !$scope.filter[type];
  }


  $scope.filter = {
    planed: true,
    requests: true
  };
  $scope.weekDays = [1, 2, 3, 4, 5, 6, 0];
  $scope.hours = [];
  for (var i = 9; i < 20; ++i) {
    $scope.hours.push({
      value: i,
      whole: true
    });
    $scope.hours.push({
      value: i,
      half: true
    });
  }

  $scope.$watch('calendarDate', function(value) {
    //перерисовать неделю, если нужно
  });
}]);