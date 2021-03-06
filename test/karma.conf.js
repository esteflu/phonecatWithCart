module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/js/**/*.js',
            'app/partials/*.html',
            'test/unit/**/*.js',
            'test/mock/**/*.js'
        ],

        preprocessors: {
            'app/partials/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'templates',
            stripPrefix: 'app/'
        },

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};