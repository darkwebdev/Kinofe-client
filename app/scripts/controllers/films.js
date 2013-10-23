/*global define*/

define([
    'underscore',
    'backbone',
    'models/films',
    'collections/films',
    'views/film-details',
    'views/film-list',
    'views/sidebar',
    'router'
], function (_, Backbone, FilmsModel, FilmsCollection, FilmDetailsView, FilmListView, SidebarView, Router) {
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

                var sidebarView = new SidebarView();
                var filmListView = new FilmListView({
                    collection: films,
                    sidebar: sidebarView
                });

                $('.icon-settings').on('click', function(){
                    console.log('icon settings clicked');
                    sidebarView.$el.show();
                });
                $('.icon-theater').on('click', function(){
                    console.log('icon theater clicked');
                });
            });

            // View

            _.extend(Backbone.View.prototype, {
                navigate: function(loc) {
                    return router.navigate(loc, {trigger: true});
                },
                isBusy: false,
                setBusy: function() {
                    console.log('busy');
                    this.isBusy = true;
                    this.$el.addClass('_busy');
                },
                setFree: function() {
                    console.log('free');
                    this.isBusy = false;
                    this.$el.removeClass('_busy');
                },
                showFilm: function(id) {
                    var film = new FilmsModel({id: 'id'});
                    var filmView = new FilmDetailsView({model:film});
                }
            });


            Backbone.history.start();
        }
    };
});
