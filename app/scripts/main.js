/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        json5: {
            exports: 'JSON5'
        },
        jade: {
            exports: 'jade'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        json5: '../bower_components/json5/lib/json5',
        jade: '../bower_components/require-jade/jade'
    }
});

require([
    'app'
], function (App) {

    App.initialize();

});
