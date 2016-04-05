# application skeleton / plus.application

The main goal of this package that loading app configuration and app services.

it uses 2 packages `plus.config` and `plus.container` and helps to manage application configuration and dependency injection.
it has 2 parameters `dir` and `env` it loads form file system configuration and container (services) for some environment.



## Usage

### Dir

```

|-- config.json
|-- config_dev.json
|-- config_prod.json
|-- config_test.json
|-- container.js
|-- container_dev.js
|-- container_prod.js
`-- container_test.js

```

Additional ways with YAML/JS configs, EXT=js|yaml
please take a look https://www.npmjs.com/package/plus.config

```
default.EXT
default-{instance}.EXT
{deployment}.EXT
{deployment}-{instance}.EXT
{short_hostname}.EXT
{short_hostname}-{instance}.EXT
{short_hostname}-{deployment}.EXT
{short_hostname}-{deployment}-{instance}.EXT
{full_hostname}.EXT
{full_hostname}-{instance}.EXT
{full_hostname}-{deployment}.EXT
{full_hostname}-{deployment}-{instance}.EXT
local.EXT
local-{instance}.EXT
local-{deployment}.EXT
local-{deployment}-{instance}.EXT
```

### App.js
```javascript

// app.js example

    var Application = require('plus.application');

    var app = new Application({
        dir: __dirname,
        env: process.env.NODE_ENV || 'dev' // NODE_ENV or 'dev'
    });

    app.config.get('port');
    app.container.get('myService1');

    // app.config instanceof require('plus.config')
    // app.container instanceof require('plus.container')

```


// config.json example
```
{
    "port": 3000
}
```

// container.js example
```javascript
module.exports = function (container) {

    var Class1 = function(){  }
    var Class2 = function(){ }

    container.register('myService1', Class1);
    container.register('myService2', Class2);
}
```

## Wrap
wrapper example for app it adds config and container
```javascript
        var app = require('express');
        
        new Application({
            dir: __dirname
        }).wrap(app);

        app.config.get('myParameter');
        app.container.get('myService')

```

Please take a look on:
- `plus.config` - https://www.npmjs.org/package/plus.config
- `plus.container` - https://www.npmjs.org/package/plus.container


