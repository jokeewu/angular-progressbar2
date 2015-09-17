/**
 * Progressbar for angularjs, require 'angularjs' and progressbar.js
 * @author jkwu
 */
;(function(root) {
  
  function factory(angular, ProgressBar) {

    // default options for progress bar
    var DEFAULTS = {
      strokeWidth: 10,
      trailWidth: 10,
      easing: 'linear',
      trailColor: '#f0f0f0',
      text: {
        value: '0%',
        style: {
          // color: '#ffffff'
        }
      },
      svgStyle: {
        width: '100%',
        height: '100%'
      },
      step: function(state, bar) {
        bar.setText((bar.value() * 100).toFixed(0) + '%');
      }
    };

    // progress bar type like 'bootstrap'
    var BAR_TYPES = {
      success: {
        color: '#5cb85c',
      },
      info: {
        color: '#5bc0de',
      },
      warning: {
        color: '#f0ad4e',
      },
      danger: {
        color: '#d9534f'
      }
    };

    angular.module('progressbar2', [])

    .factory('$pbService', ['$rootScope', function($rootScope) {
      return {
        animate: function (key, progress, options, cb) {
          $rootScope.$broadcast('progressbar2:animate', key, progress, options, cb);
        },

        set: function (key, progress) {
          $rootScope.$broadcast('progressbar2:set', key, progress);
        },

        stop: function (key) {
          $rootScope.$broadcast('progressbar2:stop', key);
        },

        remove: function (key) {
          $rootScope.$broadcast('progressbar2:remove', key);
        }
      };
    }])

    /**
     * @param {Float} value Must be '<=' 1 and '>=' 0
     * @param {String} type Bar shape and color type, like 'circle|info' 
     * @param {Boolean} animate When show animation or not
     * @param {Boolean} show Show it now or not
     * @param {options} options User options
     * @example
     * <progressbar2
     *   value="0.6"
     *   type="'circle|info'"
     *   animate="true"
     *   options="userOptions">
     * </progressbar2>
     */
    .directive('progressbar2', ['$timeout', function($timeout) {
        return {
          restrict: 'AE',
          replace: true,
          scope: {
              options: '='
          },
          templateUrl: 'tpl/progressbar2.html',
          link: function(scope, element, attrs) {

            var el = element[0], 
              types = attrs.type.split('|');

            scope.value = attrs.value;
            // Translate function name of ProgressBar,
            // Circle, Line
            scope.funcName = types[0].charAt(0).toUpperCase() + types[0].slice(1);
            scope.barType = types[1];
            scope.showMethod = attrs.animate ? 'animate' : 'set';
            scope.key = attrs.key;
            scope.progressBar = null;
            scope.show = typeof attrs.show === 'undefined' ? true : attrs.show;

            // If progress bar type is line, set text color is white
            if (scope.funcName === 'Line') {
              DEFAULTS.text.style.color = '#ffffff';
            }

            // Merge options
            // User options should have high level to cover others
            scope.options = angular.extend(DEFAULTS, 
              BAR_TYPES[scope.barType], scope.options || {});

            scope.$on('progressbar2:animate', function(e, key, value, opts, cb) {
              if (key === scope.key) {
                scope.progressBar.animate(value, opts, cb);
              }
            });

            scope.$on('progressbar2:set', function(e, key, value, opts, cb) {
              if (key === scope.key) {
                scope.progressBar.animate(value, opts, cb);
              }
            });

            scope.$on('progressbar2:stop', function(e, key) {
              if (key === scope.key) {
                scope.progressBar.stop();
              }
            });

            scope.$on('progressbar2:remove', function(e, key) {
              if (key === scope.key) {
                el.remove();
                scope.progressbar = null;
              }
            });

            scope.$on('$destroy', function(e, key) {
              el.innerHTML = '';
              scope.progressbar = null;
            });

            // Initilize
            scope.progressBar = new ProgressBar[scope.funcName](el, scope.options);

            // Setting value
            if (scope.show) {
              scope.progressBar[scope.showMethod](scope.value);
            }
          }
        };
    }])

    .run(['$templateCache', function($templateCache) {
      $templateCache.put('tpl/progressbar2.html', 
        '<div class="progressbar2"></div>'
      );
    }]);
  }

  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD module
    define(['angular', 'progressbar'], factory);
  } else {
    // Browser global
    factory(root.angular, root.ProgressBar);
  }
})(window);