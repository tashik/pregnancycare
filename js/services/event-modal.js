angular.module('iPregnant.services', [], function($provide) {

$provide.factory('eventModal', ['$modal', '$http', '$filter', '$compile', function($modal, $http, $filter, $compile) {
  return function(type, event, callback) {
    var $modalInstance = $modal.open({
      templateUrl: 'partials/event-add-' + type + '.html',
      controller: 'EventAddCtr',
      resolve: {
        type: function() {
          return type;
        },
        event: function() {
          return event;
        },
        '$http': function() {
          return $http;
        },
        '$filter': function() {
          return $filter;
        },
        '$compile': function() {
          return $compile;
        }
      }
    });
    $modalInstance.result.then(callback);
  };
}]);

});
