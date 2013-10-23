define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            ':id': 'getFilm',
            '*actions': 'defaultRoute'
        }
    });

    console.log('router', Router);

    return Router;
});
