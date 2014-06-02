module.exports = function (container) {
    container.register('config1', function (config) {
        return config;
    }, ['config']);
}