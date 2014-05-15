describe('Application', function () {

    require('chai').should();

    var Application = require('../src/Application');

    it('should load configuration', function () {

        var app = new Application({
            dir: __dirname + '/app1'
        });

        'value'.should.equal(app.config.get('option'));
    });

    it('should load container', function () {

        var app = new Application({
            dir: __dirname + '/app1'
        });

        app.container.get('service1').should.deep.equal({
            hi: 'application'
        });

    });


    it('should load configuration for env', function () {

        var app = new Application({
            dir: __dirname + '/app2',
            env: 'test'
        });

        'test_value'.should.equal(app.config.get('option'));
        'value1'.should.equal(app.config.get('option1'));
    });

    it('should load container for env', function () {

        var app = new Application({
            dir: __dirname + '/app2',
            env: 'test'
        });

        app.container.get('service1').should.equal('test_value1');
        app.container.get('service2').should.equal('value2');

    });

});
