// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'src/helpers/setupTests.js',   // puede estar vacío (sin jest-dom)
      'src/**/*.spec.js',
      'src/**/*.spec.jsx',
      'src/**/*.js',
      'src/**/*.jsx'
    ],

    exclude: ['src/index.js', 'src/reportWebVitals.js'],

    preprocessors: {
      // fuentes con cobertura
      'src/**/*.js':  ['webpack', 'coverage'],
      'src/**/*.jsx': ['webpack', 'coverage'],

      // helpers sin cobertura (no cuentan en branches)
      'src/helpers/**/*.js':  ['webpack'],
      'src/helpers/**/*.jsx': ['webpack'],

      // tests sin cobertura
      'src/**/*.spec.js':  ['webpack'],
      'src/**/*.spec.jsx': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }] // <- evita "React is not defined"
                ],
                plugins: ['babel-plugin-istanbul']
              }
            }
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] }
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcov', subdir: 'lcov' },
        { type: 'text-summary' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
      ],
      check: {
        global: {
          statements: 80,
          branches:   50,   // <- umbral pedido
          functions:  80,
          lines:      80
        }
      }
    },

    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: { base: 'ChromeHeadless', flags: ['--no-sandbox', '--disable-gpu'] }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    browserNoActivityTimeout: 30000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    concurrency: Infinity
  });
};
