/**
 * Progressbar for angularjs, require 'angularjs' and progressbar.js
 * @author jkwu
 */
(function(ProgressBar) {
  
  // default options for progress bar
  var DEFAULTS = {
    strokeWidth: 10,
    trailWidth: 10,
    easing: 'linear',
    trailColor: '#f0f0f0',
    text: {
      value: '0%',
      style: {

      }
    },
    svgStyle: {
      width: '100%',
      height: '100%'
    },
    duration: 500,
    step: function(state, bar) {
      bar.setText((bar.value() * 100).toFixed(0) + '%');
    }
  },

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

  /**
   * @param {Float} value Must be '<=' 1 and '>=' 0
   * @param {String} type Bar shape and color type, like 'circle|info' 
   * @param {Boolean} animate When show animation or not
   * @param {options} options User options
   * @example
   * <progressbar2
   *   value="0.6"
   *   type="'circle|info'"
   *   animate="true"
   *   options="userOptions">
   * </progressbar2>
   */
  .directive('progressbar2', [function() {
      return {
        restrict: 'AE',
        replace: true,
        scope: {
          value  : '=value',
          type   : '=type',
          animate: '=animate',
          options: '=options'
        },
        templateUrl: 'tpl/progressbar2.html',
        link: function(scope, element, attrs) {

          var 
            types = scope.type.split('|'),
            funcName = types[0],
            barType = types[1],
            setType = scope.animate ? 'animate' : 'set',
            options = scope.options || {},
            progressBar;

          // merge options with DEFAULTS
          options = angular.extend(DEFAULTS, BAR_TYPES[barType], options);

          // translate function name of ProgressBar,
          // Circle, Line
          funcName = funcName.charAt(0).toUpperCase() + funcName.substring(1);

          // Initilize
          progressBar = new ProgressBar[funcName](element[0], options);

          // setting value
          progressBar[setType](scope.value);
        }
      };
  }])

  .run(['$templateCache', function($templateCache) {
    $templateCache.put('tpl/progressbar2.html', 
      '<div class="progressbar2"></div>'
    );
  }]);

})(ProgressBar);