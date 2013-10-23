define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            'janre/:name': 'getJanre',
            ':id': 'getFilm',
            '*actions': 'defaultRoute'
        }
    });

    console.log('router', Router);

    return Router;
});
