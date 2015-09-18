/**
* Progressbar for angularjs, require 'angularjs' and progressbar.js
* @author jkwu
*/
;(function(root) {

function factory(angular, ProgressBar, ProgressBar2Styles) {

angular.module('com.pb2', [])

// Outer interface
.factory('$pb2Service', ['$rootScope', function($rootScope) {
    return {

        /**
         * @param  {String}   key
         * @param  {Number}   progress
         * @param  {Object}   options
         * @param  {Function} cb
         */
        animate: function (key, progress, options, cb) {
            $rootScope.$broadcast('pb2:animate', key, progress, options, cb);
        },

        /**
         * @param {String} key
         * @param {Number} progress
         */
        set: function (key, progress) {
            $rootScope.$broadcast('pb2:set', key, progress);
        },

        /**
         * @param  {String} key
         */
        stop: function (key) {
            $rootScope.$broadcast('pb2:stop', key);
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
        templateUrl: 'tpl/pb2.html',
        link: function(scope, element, attrs) {
            var el = element[0], 
                types = attrs.type.split('|'),
                typeMap = {
                    line: 'Line',
                    circle: 'Circle'
                };

            scope.value = attrs.value;
            // Translate function name of ProgressBar,
            // Circle, Line
            scope.funcName = typeMap[ types[0] ];

            scope.barType = types[1];
            scope.showMethod = attrs.animate ? 'animate' : 'set';
            scope.key = attrs.key;
            scope.progressbar = null;
            scope.defStyles = {};
            scope.barStyles = {};
            scope.opts = {};

            // Show immediately for default
            scope.show = typeof attrs.show === 'undefined' ? true : attrs.show;

            // Merge options
            // User options should have high level to cover others
            if (typeof ProgressBar2Styles === 'object') {
                scope.defStyles = ProgressBar2Styles.defStyles || {};
                scope.barStyles = ProgressBar2Styles.barStyles || {};
            }

            scope.opts = angular.merge({}, scope.defStyles, 
                scope.barStyles[scope.barType]);

            scope.$watchCollection('options', function(newOpts) {

                scope.opts = angular.merge({}, scope.opts, newOpts || {});

                var color4lpb = scope.opts.text.style.color4lpb;
                if (scope.funcName === typeMap.line &&
                    typeof color4lpb === 'string') {
                    scope.opts.text.style.color = color4lpb;
                }

                el.innerHTML = '';
                scope.progressbar = new ProgressBar[scope.funcName](el, scope.opts);
                // Setting value
                if (scope.show) {
                    scope.progressbar[scope.showMethod](scope.value);
                }
            });

            /************************************
            * Outer interface handler
            *************************************/

            scope.$on('pb2:animate', function(e, key, value, opts, cb) {
                if (key === scope.key) {
                    scope.progressbar.animate(value, opts, cb);
                }
            });

            scope.$on('pb2:set', function(e, key, value, opts, cb) {
                if (key === scope.key) {
                    scope.progressbar.animate(value, opts, cb);
                }
            });

            scope.$on('pb2:stop', function(e, key) {
                if (key === scope.key) {
                    scope.progressbar.stop();
                }
            });

            scope.$on('$destroy', function(e, key) {
                el.innerHTML = '';
                scope.progressbar = null;
            });
        } // link
    };
}])

.run(['$templateCache', function($templateCache) {
    $templateCache.put('tpl/pb2.html', 
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
    factory(root.angular, root.ProgressBar, root.ProgressBar2Styles);
}
})(window);