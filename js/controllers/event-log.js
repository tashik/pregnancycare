'use strict';

angular.module('iPregnant.controllers').controller('EventLogCtr', function($scope, eventModal, $http) {
  $scope.showFuture = false;
  $scope.pastWeeks = [];
  $scope.futureWeeks = [];
  $scope.filter = 'all';
  $scope.filterName = '';

  $scope.toggleFuture = function() {
    $scope.showFuture = !$scope.showFuture;
  };
  $scope.buildFilterName = function() {
    if ('all' == $scope.filter) {
      $scope.filterName = 'Все события';
      return;
    }
    if ('not-performed' == $scope.filter) {
      $scope.filterName = 'Пропущенные';
      return;
    }

    var
      parts = [],
      all = true,
      names = {
        analysis: 'Анализы',
        procedure: 'Процедуры',
        report: 'Отчёты',
        appointment: 'Приёмы'
      }
    ;
    angular.forEach(names, function(title, type) {
      if ($scope.filter[type]) {
        parts.push(title);
      } else {
        all = false;
      }
    });
    if (all) {
      $scope.resetFilter('all');
      return;
    }
    $scope.filterName = parts.join(', ');
  };
  $scope.resetFilter = function(type) {
    $scope.filter = type;
    $scope.filterWeeks();
  };
  $scope.toggleFilter = function(type) {
    if (angular.isString($scope.filter)) {
      $scope.filter = {};
      $scope.filter[type] = true;
    } else {
      if ($scope.filter[type]) {
        delete $scope.filter[type];
      } else {
        $scope.filter[type] = true;
      }
    }
    $scope.filterWeeks();
  };
  $scope.filterEvent = function(event) {
    if ('all' == $scope.filter) {
      return true;
    }
    if ('not-performed' == $scope.filter) {
      return !event.performed;
    }
    var found = false;
    angular.forEach($scope.filter, function(x, item) {
      if (item === event.type) {
        found = true;
      }
    });
    return found;
  };
  $scope.filterEvents = function(events) {
    var result = false;
    angular.forEach(events, function(event) {
      event.filtered = $scope.filterEvent(event);
      if (event.filtered) {
        result = true;
      }
    });
    return result;
  };
  $scope.filterWeeks = function() {
    $scope.buildFilterName();
    angular.forEach($scope.pastWeeks, function(week) {
      week.filtered = $scope.filterEvents(week.events);
    });
    angular.forEach($scope.futureWeeks, function(week) {
      week.filtered = $scope.filterEvents(week.events);
    });
  };
  $scope.addEvent = function(type) {
    eventModal(type, null, function(event) {
      console.log(event);
    });
  };

  $scope.buildFilterName();
  $http.get('/stub-api/event-log.php').success(function(data) {
    $scope.pastWeeks = data.past;
    $scope.futureWeeks = data.future;
    $scope.filterWeeks();
  });
});