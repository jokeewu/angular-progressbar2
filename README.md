## Angular-ProgressBar2

### Descrition

Used to front end display progress(circle or line).

### Example

&lt;script src="/bower_components/angular/angular.js"&gt;&lt;/script&gt;

&lt;script src="/bower_components/progressbar.js/dist/progressbar.js"&gt;&lt;/script&gt;

&lt;progressbar2
    value="0.6"
    type="'circle|info'"
    animate="true"
    options="userOptions"&gt;
&lt;/progressbar2&gt;

### Params

#### value {Number}

The value must be between 0 and 1.

#### type {String}

format: `'shapeType|colorType'`

* shapeType: `'circle|line'`
* colorType: `'success|info|warning|danger'`

#### animate {Boolean}

#### options {Object}

Reference [progressbar.js](https://github.com/kimmobrunfeldt/progressbar.js) to config it.