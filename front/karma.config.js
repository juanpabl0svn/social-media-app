module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      client: {
        clearContext: false, // Deja visible el resultado de los tests en el navegador.
      },
      jasmineHtmlReporter: {
        suppressAll: true, // Remueve mensajes duplicados en el navegador.
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        subdir: '.',
        reporters: [
          { type: 'html' }, // Genera un reporte de cobertura en HTML.
          { type: 'text-summary' }, // Muestra un resumen en la consola.
          { type: 'lcov' } // Genera el archivo lcov.info para herramientas como SonarCloud.
        ],
      },
      reporters: ['progress', 'kjhtml', 'coverage'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true,
    });
  };
  