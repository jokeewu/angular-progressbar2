## Angular-ProgressBar2
### Using Example:

&lt;progressbar2
    value="0.6"
    type="'circle|info'"
    animate="true"
    options="userOptions"&gt;
&lt;/progressbar2&gt;

### Description

#### value {Number}

The value must be between 0 and 1.

#### type {String}

format: 'shapeType|colorType'

* shapeType: 'circle|line'
* colorType: 'success|info|warning|danger' `Like bootstrap progressbar type`

#### animate {Boolean}

#### options {Object}

`Reference [progressbar.js](https://github.com/kimmobrunfeldt/progressbar.js) to config it.`