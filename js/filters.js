'use strict';

angular.module('iPregnant.filters', [])

.filter('ucfirst', function() {
  return function(text) {
    var first = text.charAt(0).toUpperCase();
    return first + text.substr(1, text.length - 1);
  }
})

.filter('zeropad', function() {
  return function(text) {
    if (angular.isNumber(text) && 10 > text && 0 < text) {
      return '0' + text;
    }
    if (angular.isString(text) && 1 == text.length) {
      return '0' + text;
    }
    return text;
  }
})

;
