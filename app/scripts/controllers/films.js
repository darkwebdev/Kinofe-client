/*global define*/

define([
    'underscore',
    'backbone',

    'models/users',
    'models/persons',
    'models/films',
    'collections/films',

    'views/person-details',
    'views/film-details',
    'views/film-list',
    'views/sidebar'
], function (_, Backbone,
         UsersModel, PersonsModel, FilmsModel, FilmsCollection,
         PersonDetailsView, FilmDetailsView, FilmListView, SidebarView
    ) {
    'use strict';

    console.log('controller');

    //override bb.syn for cors support
    var proxiedSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
        options || (options = {});
        if (!options.crossDomain) {
            options.crossDomain = true;
        }
        if (!options.xhrFields) {
            options.xhrFields = {withCredentials:false};
        }
        return proxiedSync(method, model, options);
    };
    /*$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        options.crossDomain ={
            crossDomain: true
        };
        options.xhrFields = {
            withCredentials: true
        };
    });*/

    var Router = Backbone.Router.extend({
        routes: {
            'me': 'getProfile',
            'janre/:name': 'getJanre',
            'person/:id': 'getPerson',
            ':id': 'getFilm',
            '*actions': 'defaultRoute'
        },

        filmListView: null,
        detailsView: null,
        sidebarView: null,

        showDetails: function(Model, View, id) {
//            console.log('show details', Model, View, id);
            var model = new Model({id: id});
            this.detailsView = new View({
                model: model,
                router: this
            });
            return this;
        },

        showSidebar: function() {
            this.sidebarView.show();
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

            console.log('router init');

            var router = new Router();

            var user = new UsersModel();
            console.log('user', user);

            router.sidebarView = (function() {
                return new SidebarView({
                    model: user,
                    router: router
                });
            }());

            router.on('route:getProfile', function() {
                console.log('getProfile route');
                this.showSidebar();
            });


            router.on('route:getFilm', function(id) {
                console.log('getFilm route', id);
                this.showDetails(FilmsModel, FilmDetailsView, id);
            });

            router.on('route:getPerson', function(id) {
                console.log('getPerson route', id);
                this.showDetails(PersonsModel, PersonDetailsView, id);
            });

            router.on('route:getJanre', function(name) {
                console.log('getJanre route', name, janreFilms);
                var janreFilms = new FilmsCollection([], {
                    url: 'http://127.0.0.1:8000/movies/'+name
                });
                showFilmList(janreFilms);
            });

            router.on('route:defaultRoute', function(actions) {
                console.log('default route');
                showFilmList();
            });

            var showFilmList = function(collection) {
                collection = collection || new FilmsCollection();
//              todo: cache films list
                router.hideDetails();
                router.hideSidebar();
                router.filmListView = new FilmListView({
                    collection: collection,
                    router: router,
                    user: user
                });
            };


            Backbone.history.start();
        }
    };
});
