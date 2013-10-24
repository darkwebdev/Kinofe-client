/*global define*/

define([
    'underscore',
    'backbone',

    'models/persons',
    'models/films',
    'collections/films',

    'views/person-details',
    'views/film-details',
    'views/film-list',
    'views/sidebar'
], function (_, Backbone,
         PersonsModel, FilmsModel, FilmsCollection,
         PersonDetailsView, FilmDetailsView, FilmListView, SidebarView
    ) {
    'use strict';

    console.log('controller');

    var Router = Backbone.Router.extend({
        routes: {
            'janre/:name': 'getJanre',
            'person/:id': 'getPerson',
            ':id': 'getFilm',
            '*actions': 'defaultRoute'
        },

        detailsView: null,
        sidebarView: new SidebarView(),

        showDetails: function(Model, View, id) {
//            console.log('show details', Model, View, id);
            var model = new Model({id: id});
            this.detailsView = new View({
                model: model,
                router: this
            });
            return this;
        },

        hideDetails: function() {
            console.log('hide details');
            this.detailsView && this.detailsView.hide();
        },

        hideSidebar: function() {
            console.log('hide sidebar');
            this.sidebarView.hide();
        }
    });

    return {
        initialize: function() {

            var router = new Router();

            router.on('route:getFilm', function(id) {
                console.log('getFilm route', id);
                return this.showDetails(FilmsModel, FilmDetailsView, id);
            });

            router.on('route:getPerson', function(id) {
                console.log('getPerson route', id);
                return this.showDetails(PersonsModel, PersonDetailsView, id);
            });

            router.on('route:getJanre', function(name) {
                console.log('getJanre route', name, janreFilms);
                var janreFilms = new FilmsCollection([], {
                    url: '/scripts/tests/response-janre.json'
                });
                return showFilmList(janreFilms);
            });

            router.on('route:defaultRoute', function(actions) {
                console.log('default route');
                return showFilmList();
            });

            var showFilmList = function(collection) {
                var filmListView = new FilmListView({
                    collection: collection || new FilmsCollection(),
                    router: router
                });

                $('.icon-theater').on('click', function(){
                    console.log('icon theater clicked');
                });

                return filmListView;
            };


            Backbone.history.start();
        }
    };
});
