describe('Application', function () {

    require('chai').should();

    var Application = require('../src/Application');

    it('should load configuration', function () {

        var app = new Application({
            dir: __dirname + '/app1'
        });

        'value'.should.equal(app.config.get('option'));
    });

    it('should support create() method', function () {

        var app = Application.create({
            dir: __dirname + '/app1'
        });

        'value'.should.equal(app.config.get('option'));
    });

    it('should define config to container', function () {

        var app = new Application({
            dir: __dirname + '/app1'
        });

        app.container.get('config').should.equal(app.config);
    });

    it('should load container', function () {

        var app = new Application({
            dir: __dirname + '/app1'
        });

        app.container.get('service1').should.deep.equal({
            hi: 'application'
        });

    });

    it('should allow to get services', function () {

        var app = new Application({
            dir: __dirname + '/app1'
        });

        app.get('service1').should.deep.equal({
            hi: 'application'
        });

    });

    it('should allow to set services', function () {

        var app = new Application({
            dir: __dirname + '/app1'
        });

        app.set('service1', 'hi');

        app.get('service1').should.equal('hi');

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

    it('should allow to use config in container.js', function () {

        var app = new Application({
            dir: __dirname + '/app3'
        });

        app.container.get('config1').should.equal(app.container.get('config'));

    });

    it('should load configuration and services from multiple dirs', function () {

        var app = new Application({
            dir: [__dirname + '/app4.1', __dirname + '/app4.2']
        });

        app.config.get('name1').should.equal('value1');
        app.config.get('name2').should.equal('value2.2');
        app.config.get('name3').should.equal('value3.2');

        app.container.get('service1').should.deep.equal({service: 1});
        app.container.get('service2').should.deep.equal({service: 2.2});
        app.container.get('service3').should.deep.equal({service: 3.2});

    });

    it('should load configuration and services via method application.load()', function () {

        var app = new Application({
            dir: __dirname + '/app5'
        });

        app.config.get('name1').should.equal('value1');
        app.config.get('name2').should.equal('value2');
        (app.config.get('name3') == null).should.be.ok;

        app.container.get('service1').should.deep.equal({service: 1});
        app.container.get('service2').should.deep.equal({service: 2});
        (app.container.get('service3') == null).should.be.ok;

        app.load({dir: __dirname + '/app5.1' });

        app.config.get('name1').should.equal('value1.2');
        app.config.get('name2').should.equal('value2.2');
        app.config.get('name3').should.equal('value3.2');

        app.container.get('service1').should.deep.equal({service: 1.2});
        app.container.get('service2').should.deep.equal({service: 2.2});
        app.container.get('service3').should.deep.equal({service: 3.2});

    });

    it('should wrap any other application', function () {

        var app = {};

        var _app = new Application({
            dir: __dirname + '/app1'
        }).wrap(app);

        app.config.should.equal(_app.config);
        app.container.should.equal(_app.container);
        app.application.should.equal(_app);

    });

});
