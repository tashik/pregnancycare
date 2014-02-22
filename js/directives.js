'use strict';

angular.module('iPregnant.directives', [])

.directive('patientProfile', function() {
  return {
    restrict: 'A',
    scope: {
      patient: '='
    },
    templateUrl: 'partials/directives/patient-profile.html'
  };
})

.directive('eventLog', function() {
  return {
    restrict: 'E',
    scope: {
      weeks: '=',
      actions: '='
    },
    templateUrl: 'partials/directives/event-log.html'
  };
})

.directive('eventModal', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@',
      save: '&',
      cancel: '&'
    },
    templateUrl: 'partials/directives/event-modal.html'
  };
})

.directive('dropdownPicker', ['$document', '$location', function($document, $location) {
  var
    openElement = null,
    closeMenu   = angular.noop
  ;

  return {
    restrict: 'CA',
    link: function(scope, element, attrs) {
      var picker = angular.element('#' + attrs.dropdownPicker);
      if (1 !== picker.length) {
        return;
      }

      scope.$watch('$location.path', function() { closeMenu(); });
      $document.bind('click', function(event) { closeMenu(event); });
      element.bind('click', function(event) {
        var
          elementWasOpen = (element === openElement),
          menu = picker.children('.dropdown-menu')
        ;

        event.preventDefault();
        event.stopPropagation();

        if (!!openElement) {
          closeMenu();
        }

        if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
          var offset = element.position();
          picker.addClass('open').css({
            top: Math.round(offset.top - 1),
            left: Math.round(offset.left + 1)
          });
          openElement = element;
          closeMenu = function (event) {
            if (event) {
              var target = angular.element(event.target);
              if (target.hasClass('control') || target.parents('.control').length > 0) {
                return;
              }
              event.preventDefault();
              event.stopPropagation();
            }
            $document.unbind('click', closeMenu);
            picker.removeClass('open');
            closeMenu = angular.noop;
            openElement = null;
          };
        }
      });
    }
  };
}])
;