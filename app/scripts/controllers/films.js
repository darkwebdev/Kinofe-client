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

            router.on('route:getFilm', function(id) {
                console.log('getFilm route', id, film);
                var film = new FilmsModel({id: 'id'});
                var view = new FilmDetailsView({model: film});
            });

            router.on('route:getJanre', function(name) {
                console.log('getJanre route', name, janreFilms);
                var janreFilms = new FilmsCollection([], {
                    url: '/scripts/tests/response-janre.json'
                });
                showFilmList(janreFilms);
            });

            router.on('route:defaultRoute', function(actions) {
                console.log('default route');

                showFilmList();
            });

            var showFilmList = function(collection) {
                var sidebarView = new SidebarView();
                var filmListView = new FilmListView({
                    collection: collection || new FilmsCollection(),
                    sidebar: sidebarView
                });

                $('.icon-settings').on('click', function(){
                    console.log('icon settings clicked');
                    sidebarView.$el.show();
                });
                $('.icon-theater').on('click', function(){
                    console.log('icon theater clicked');
                });
            };

            var navigate = function(loc) {
                return router.navigate(loc, {trigger: true});
            };

            // View

            _.extend(Backbone.View.prototype, {
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
                },
                getJanre: function(name) {
                    return navigate('/janre/' + name);
                }
            });


            Backbone.history.start();
        }
    };
});
