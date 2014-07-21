# nequire [![Build Status](https://secure.travis-ci.org/floriangosse/nequire.png?branch=master)](http://travis-ci.org/floriangosse/nequire)

Requires files by namespaces.

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

### Configuration

To use `nequire` you must call the `configure` method which expect a map of namespaces.

#### map
* Type: `Object`
* Default: An empty `Object`

The map contains the namespaces which will be made available. A key of the object is a namespace and the value is the associated path where the modules are located.

### Usage examples

This is a simple webserver example which use `nequire`.

index.js
```javascript
// load nequire
var nequire = require('nequire'),
    http = require('http');

// configure the namespaces
nequire.configure({
        'model': __dirname + '/models',
        'route': __dirname + '/routes'
    });
// make nequire global available
nequire.globalize();

// use nequire to load the routes
var users = nequire('route', 'user');
var status404 = nequire('route', 'status-404');

// create server
var server = http.createServer(function (req, res) {
        if (req.url.indexOf('/users') === 0) {
            users(req, res);
        } else {
            status404(req, res);
        }
    });
// start server
server.listen(3000);
```

user.js
```javascript
// use nequire to load the user model
var User = nequire('model', 'user');

// exports route handler
module.exports = function (req, res) {
    User.find(function (err, users) {
        // set content type
        res.setHeader('Content-Type', 'application/json');

        if (err) {
            res.end(err);
        } else {
            res.end(JSON.stringify(users));
        }
    });
};
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 Florian Goße. Licensed under the MIT license.
