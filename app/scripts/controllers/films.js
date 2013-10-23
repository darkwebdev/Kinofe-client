/*global define*/

define([
    'underscore',
    'backbone',
    'models/films',
    'collections/films',
    'views/film-details',
    'views/film-list',
    'router'
], function (_, Backbone, FilmsModel, FilmsCollection, FilmDetailsView, FilmListView, Router) {
    'use strict';

    console.log('controller');

    return {
        initialize: function() {
            var router = new Router();
            var films = new FilmsCollection();

            router.on('route:getFilm', function(id) {
                console.log('getFilm route', id, film);
                var film = new FilmsModel({id: 'id'});
                var view = new FilmDetailsView({model: film});
            });

            router.on('route:defaultRoute', function(actions) {
                console.log('default route');
                var view = new FilmListView({collection: films});
            });

            // View

            _.extend(Backbone.View.prototype, {
                navigate: function(loc) {
                    return router.navigate(loc, {trigger: true});
                },
                setBusy: function() {
                    console.log('busy');
                    this.isBusy = true;
                    this.$el.addClass('_busy');
                },
                setFree: function() {
                    console.log('free');
                    this.isBusy = false;
                    this.$el.removeClass('_busy');
                }
            });


            Backbone.history.start();
        }
    };
});
