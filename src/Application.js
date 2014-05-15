var Application = function (options) {

    var merge = require('merge');
    var Config = require('plus.config');
    var Container = require('plus.container');

    this.dir = '.';
    this.env = 'dev';

    merge(this, options || {});

    this.config = new Config({dir: this.dir, env: this.env});
    this.container = Container.load({dir: this.dir, env: this.env});

};

module.exports = Application;