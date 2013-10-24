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
        json5: '../bower_components/json5/lib/json5',
        jade: '../bower_components/require-jade/jade'
    }
});

require([
    'controllers/films'
], function (Controller) {
    console.log('controller', Controller);
    Controller.initialize();
});
