'use strict';

angular.module('iPregnant.controllers').controller('EventAddCtr', function($scope, $modalInstance, type, $http, $filter, $compile) {
  var dateFilter = $filter('date');

  $scope.analisysList = [];
  $scope.analisysTime = [];
  $scope.event = {
    type: type,
    info: null,
    comment: null,
    date: new Date(),
    timeFrom: null,
    timeTill: null,
    time: null
  };

  function loadPatientCalendar(date) {
    var param = dateFilter(date, 'yyyy-MM-dd');
    $http.get('/stub-api/patient-calendar.json', { params: { date: param }}).success(function(data) {
      $scope.events = data;
    });
  }

  function activityShort(activity) {
    return '<div class="activity" ng-repeat="activity in events">' +
      '<div class="pull-left icon fg-' + activity.type + '">•</div>' +
      '<div class="title">' + activity.name + '</div>' +
      '<div class="date-time">'
         + dateFilter(activity.date, 'd MMMM, EEEE') +
         '<br />' + activity.timeFrom + '—' + activity.timeTill +
      '</div>' +
    '</div>';
  }
  function getActivitiesHtml(activities) {
    var result = [];
    angular.forEach(activities, function(activity) {
      result.push(activityShort(activity));
    });
    return result.join('');
  }

  $scope.datePopover = function(date) {
    var activities = [{
      type: 'report',
      date: date,
      name: 'Плановый отчёт',
      timeFrom: '09:00',
      timeTill: '09:30'
    }, {
      type: 'analysis',
      date: date,
      name: 'Анализ крови',
      timeFrom: '10:00',
      timeTill: '10:30'
    }];

    if (1 === date.getDay() || 0 === date.getDay() || 4 === date.getDay()) {
      return {
        analysis: Math.random() > 0.5,
        appointment: Math.random() < 0.5,
        procedure: Math.random() > 0.3,
        report: true,
        text: getActivitiesHtml(activities)
      };
    }
    return false;
  };
  $scope.chooseTime = function(from, till) {
    $scope.event.timeFrom = from;
    $scope.event.timeTill = till;
  };
  $scope.onCalendarMove = function(date) {
    loadPatientCalendar(date);
  };
  $scope.save = function(form) {
    if (form.$valid) {
      $modalInstance.close($scope.event);
    }
  };
  $scope.cancel = function(form) {
    $modalInstance.dismiss('cancel');
  };

  $scope.$watch('event.timeFrom + "-" + event.timeTill', function (value) {
    if ($scope.event.timeFrom && $scope.event.timeFrom) {
      $scope.event.time = value;
    } else {
      $scope.event.time = null;
    }
  });
  $scope.$watch('event.date', function(value) {
    var param = dateFilter(value, 'yyyy-MM-dd');
    $http.get('/stub-api/analisys-free-time.json', { params: { date: param } }).success(function(data) {
      $scope.analisysTime = data;
    });
  });
  $scope.$watch('event.info.id', function(value) {
    $scope.event.id = value;
  });

  $http.get('/stub-api/analisys-list.json').success(function(data) {
    $scope.analisysList = data;
  });

  $http.get('/stub-api/patients-list.json').success(function(data) {
    $scope.patientsList = data;
  });

  loadPatientCalendar($scope.event.date);
});