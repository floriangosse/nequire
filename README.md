# nequire [![Build Status](https://secure.travis-ci.org/floriangosse/nequire.png?branch=master)](http://travis-ci.org/floriangosse/nequire)

Requires files by namespaces and paths.

## Getting Started
Install the module with: `npm install nequire`

```javascript
var nequire = require('nequire');

nequire.configure({
        'helper': __dirname + '/helper'
    });

nequire('helper', 'math/pi'); // require module ./helper/math/pi.js
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Florian Goße. Licensed under the MIT license.
