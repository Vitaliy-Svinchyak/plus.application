var Application = function (options) {

    var merge = require('merge');
    var Config = require('plus.config');
    var Container = require('plus.container');

    this.dir = '.';
    this.env = 'dev';

    merge(this, options || {});

    this.config = new Config(
        {
            dir: this.dir,
            env: this.env
        });

    this.container = Container.load(
        {
            dir: this.dir,
            env: this.env,
            services: {
                config: this.config
            }
        });

    this.get = function (name) {
        return this.container.get(name);
    }

    this.set = function (name, value) {
        return this.container.set(name, value);
    }

    this.load = function(options)
    {
        var options = merge({
            dir: this.dir,
            env: this.env
        }, options || {});

        this.config.load(options);
        this.container.load(options);
    }

    this.wrap = function (object) {
        object.config = this.config;
        object.container = this.container;
        object.application = this;

        return this;
    }

};

Application.create = function (options) {
    return new Application(options);
};

module.exports = Application;