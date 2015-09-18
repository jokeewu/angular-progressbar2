;(function(root) {

function factory() {
    return {
        defStyles: {
            strokeWidth: 10,
            trailWidth: 10,
            trailColor: '#f0f0f0',
            text: {
                value: '0%',
                style: {
                    // Add for line progressbar text color
                    color4lpb: '#ffffff'
                }
            },
            svgStyle: {
                width: '100%',
                height: '100%'
            },
            step: function(state, bar) {
                bar.setText((bar.value() * 100).toFixed(0) + '%');
            }
        },

        barStyles: {
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
        }
    };
}

if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
} else if (typeof define === 'function' && define.amd) {
    // AMD module
    define(factory);
} else {
    // Browser global
    root.ProgressBar2Styles = factory();
}
})(window);