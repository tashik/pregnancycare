angular.module('iPregnant.directives.datepicker', ['ui.bootstrap.position', 'ui.bootstrap.tooltip'])

.controller('MyDatepickerController', ['$scope', '$attrs', 'dateFilter',
function($scope, $attrs, dateFilter) {
  var
    format = {
      day:        getValue($attrs.dayFormat,        'dd'),
      month:      getValue($attrs.monthFormat,      'MMMM'),
      year:       getValue($attrs.yearFormat,       'yyyy'),
      dayHeader:  getValue($attrs.dayHeaderFormat,  'EEE'),
      dayTitle:   getValue($attrs.dayTitleFormat,   'MMMM yyyy'),
      monthTitle: getValue($attrs.monthTitleFormat, 'yyyy')
    },
    startingDay = getValue($attrs.startingDay,      1),
    now = new Date()
  ;

  function getValue(value, defaultValue) {
    return angular.isDefined(value) ? $scope.$parent.$eval(value) : defaultValue;
  }

  function getDaysInMonth( year, month ) {
    return new Date(year, month, 0).getDate();
  }

  function getDates(startDate, n) {
    var dates = new Array(n);
    var current = startDate, i = 0;
    while (i < n) {
      dates[i++] = new Date(current);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  function compare(date1, date2) {
    return (new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() ) - new Date( date2.getFullYear(), date2.getMonth(), date2.getDate() ) );
  }

  function makeDate(date, format, isSelected, isSecondary) {
    var
      current = 0 === compare(date, now),
      classes = [],
      popover = false
    ;
    if (current) {
      classes.push('current');
    }
    if ($scope.$parent.dateCssClass) {
      classes.push($scope.$parent.dateCssClass(date));
    }
    if ($scope.$parent.datePopover) {
      popover = $scope.$parent.datePopover(date);
    }
    return {
      date: date, label:
      dateFilter(date, format),
      selected: !!isSelected,
      current: current,
      classes: classes,
      popover: popover,
      secondary: !!isSecondary
    };
  }

  this.modes = [{
    name: 'day',
    getVisibleDates: function(date, selected) {
      var year = date.getFullYear(), month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1);
      var difference = startingDay - firstDayOfMonth.getDay(),
      numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,
      firstDate = new Date(firstDayOfMonth), numDates = 0;

      if ( numDisplayedFromPreviousMonth > 0 ) {
        firstDate.setDate( - numDisplayedFromPreviousMonth + 1 );
        numDates += numDisplayedFromPreviousMonth; // Previous
      }
      numDates += getDaysInMonth(year, month + 1); // Current
      numDates += (7 - numDates % 7) % 7; // Next

      var days = getDates(firstDate, numDates), labels = new Array(7);
      for (var i = 0; i < numDates; i ++) {
        var dt = new Date(days[i]);
        days[i] = makeDate(dt, format.day, (selected && selected.getDate() === dt.getDate() && selected.getMonth() === dt.getMonth() && selected.getFullYear() === dt.getFullYear()), dt.getMonth() !== month);
      }
      for (var j = 0; j < 7; j++) {
        labels[j] = dateFilter(days[j].date, format.dayHeader);
      }
      return {
        objects: days,
        title: date.getMonthName(false) + ' ' + date.getFullYear(),
        labels: labels
      };
    },
    compare: function(date1, date2) {
      return compare(date1, date2);
    },
    split: 7,
    step: { months: 1 }
  }];

  this.isDisabled = function(date, mode) {
    var currentMode = this.modes[mode || 0];
    return ((this.minDate && currentMode.compare(date, this.minDate) < 0) || (this.maxDate && currentMode.compare(date, this.maxDate) > 0) || ($scope.dateDisabled && $scope.dateDisabled({date: date, mode: currentMode.name})));
  };
}])

.directive('myDatepicker', ['dateFilter', '$log', function (dateFilter, $log) {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'partials/directives/datepicker.html',
    scope: {
      dateDisabled: '&',
      buttonClick: '&',
      buttonText: '@'
    },
    require: ['myDatepicker', '?^ngModel'],
    controller: 'MyDatepickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0], ngModel = ctrls[1];


      if (!ngModel) {
        return;
      }

      var mode = 0, selected = new Date();

      function split(arr, size) {
        var arrays = [];
        while (arr.length > 0) {
          arrays.push(arr.splice(0, size));
        }
        return arrays;
      }

      function refill(updateSelected) {
        var date = null, valid = true;

        if (ngModel.$modelValue) {
          date = new Date( ngModel.$modelValue );

          if (isNaN(date)) {
            valid = false;
            $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
          } else if (updateSelected) {
            selected = date;
          }
        }
        ngModel.$setValidity('date', valid);

        var
          currentMode = datepickerCtrl.modes[mode],
          data = currentMode.getVisibleDates(selected, date)
        ;
        angular.forEach(data.objects, function(obj) {
          obj.disabled = datepickerCtrl.isDisabled(obj.date, mode);
        });

        ngModel.$setValidity('date-disabled', (!date || !datepickerCtrl.isDisabled(date)));

        scope.rows = split(data.objects, currentMode.split);
        scope.labels = data.labels || [];
        scope.title = data.title;
        scope.month = selected.getMonthName(false);
        scope.year  = dateFilter(selected, 'yyyy');
      }

      ngModel.$render = function() {
        refill(true);
      };

      scope.headerSimple = angular.isDefined(attrs.headerSimple) && attrs.headerSimple ? attrs.headerSimple : true;
      scope.headerCustom = angular.isDefined(attrs.headerCustom) && attrs.headerCustom ? attrs.headerCustom : false;
      if (scope.headerCustom) {
        scope.headerSimple = false;
      }

      scope.select = function(date) {
        var dt = ngModel.$modelValue ? new Date( ngModel.$modelValue ) : new Date(0, 0, 0, 0, 0, 0, 0);
        dt.setFullYear( date.getFullYear(), date.getMonth(), date.getDate() );
        ngModel.$setViewValue( dt );
        if (angular.isFunction(scope.$parent.onDateSelect)) {
          scope.$parent.onDateSelect(dt);
        }
        refill( true );
      };
      scope.move = function(direction) {
        var step = datepickerCtrl.modes[0].step;
        selected.setMonth( selected.getMonth() + direction * (step.months || 0) );
        selected.setFullYear( selected.getFullYear() + direction * (step.years || 0) );
        if (angular.isFunction(scope.$parent.onCalendarMove)) {
          scope.$parent.onCalendarMove(selected);
        }
        refill();
      };
    }
  };
}])
;