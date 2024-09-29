module.exports = function (config) {
    config.set({
      // Otras configuraciones...
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, './coverage'),
        reports: ['lcovonly', 'text-summary'],
        fixWebpackSourcePaths: true
      },
      reporters: ['progress', 'coverage-istanbul'],
      // Otras configuraciones...
    });
  };
  