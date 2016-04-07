# Application base: config + IoC container

The main goal of this package that loading app configuration and app services.

it uses 2 packages [plus.container](https://www.npmjs.com/package/plus.container) and [plus.config](https://www.npmjs.com/package/plus.config) and helps to manage application configuration and dependency injection.
it has 2 parameters `dir` and `env` it loads configuration and container (services) from file system for some environment.

## Usage
Configuration based on [config](https://www.npmjs.com/package/config) npm package.

### Dir
```
|-- default.js
|-- dev.js
|-- production.js
|-- container.js
|-- container_dev.js
|-- container_production.js
`-- container_test.js
```

Please take a look [config](https://www.npmjs.com/package/config) for more details about configuration ways. 
It supports configuration in *.js, *.json, *.yml.

##### Confguration example
```javascript
//default.js
module.exports = {
    port: 3000
}
```
### App.js
```javascript
// app.js example
    var Application = require('plus.application');

    var app = new Application({
        dir: __dirname,
        env: process.env.NODE_ENV || 'dev' // NODE_ENV or 'dev'
    });

    app.config.get('port'); // 3000
    app.container.get('myService1'); // it should be service, will explain soon.

    // app.config instanceof require('plus.config')
    // app.container instanceof require('plus.container')
```

### container.js
```javascript
// container.js example
module.exports = function (container) {
    var Class1 = function(){  }
    var Class2 = function(){ }

    container.register('myService1', Class1);
    container.register('myService2', Class2);
    
    // more effective way of course
    container.register('myService3', require('../services/MyService3'), ['myService1', 'myService2']);
    
}
```
more details about container configuration here [plus.container](https://www.npmjs.com/package/plus.container)

## Wrap
wrapper example for app it adds config and container
```javascript
        var express = require('express');
        var app = express();

        new Application({
            dir: __dirname,
            env: process.env.NODE_ENV || 'dev'
        }).wrap(app);

        app.config.get('port'); // 3000
        app.container.get('myService1') // new Class1
        //BUT: app.container.get('myService1') === app.container.get('myService1')
        
        // nested access
        app.container.get('config/port') // 3000
        
        // for example
        app.listen(app.container.get('config/port'))
        // same thing is: app.listen(app.config.get('port'))
```

Please take a look on:
- `plus.container` - https://www.npmjs.org/package/plus.container
- `plus.config` - https://www.npmjs.org/package/plus.config

## Alternative configuration way with json(s) only.
This configuration based on [nconf](https://www.npmjs.com/package/nconf) and this is alternative way.

##### Dir
```
|-- config.json // main config
|-- config_dev.json // env config
|-- config_prod.json
|-- config_test.json
|-- container.js // main container
|-- container_dev.js // env container
|-- container_production.js
`-- container_test.js
```

##### config.json
config.json example
```
{
    "port": 3000
}
```
Take a look [nconf](https://www.npmjs.com/package/nconf) for more info. if you need this way.

Have a fun and manage your applications!
[+1G Team](http://plus1generation.com)

Be happy!

