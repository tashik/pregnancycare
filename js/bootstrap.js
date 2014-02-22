'use strict';

angular.module('iPregnant', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'ui.bootstrap.tooltip',
  'iPregnant.controllers',
  'iPregnant.directives',
  'iPregnant.directives.datepicker',
  'iPregnant.filters',
  'iPregnant.services',
  'iPregnant.services.uuid',
  'iPregnant.services.api'
]).config(['$routeProvider', '$tooltipProvider', function($routeProvider, $tooltipProvider) {
  $tooltipProvider.options({
    placement: 'bottom',
    appendToBody: true
  });

  $routeProvider
    .when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'DashboardCtr'})
    .when('/patients', {templateUrl: 'partials/patients.html', controller: 'PatientCtr'})
    .when('/calendar', {templateUrl: 'partials/calendar.html', controller: 'CalendarCtr'})
    .when('/chat', {templateUrl: 'partials/chat.html', controller: 'ChatCtr'})

    .when('/event-log', {templateUrl: 'partials/event-log.html', controller: 'EventLogCtr'})
    .when('/medical-record', {templateUrl: 'partials/medical-record.html', controller: 'MedicalRecordCtr'})

    .otherwise({redirectTo: '/dashboard'})
  ;
}]);
angular.module('iPregnant.filters', []);
angular.module('iPregnant.services', []);
angular.module('iPregnant.directives', []);
angular.module('iPregnant.controllers', []);