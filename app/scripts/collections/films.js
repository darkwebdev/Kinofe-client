define([
    'underscore',
    'backbone',
//    'json5',
    'models/films'
], function (_, Backbone, /*JSON,*/ FilmsModel) {
    'use strict';

    var FilmsCollection = Backbone.Collection.extend({
        model: FilmsModel,
        page: 1,

        url: function() {
            //return '/scripts/tests/response-films-' + this.page + '.json';
            return 'http://127.0.0.1:8000/movies/top';
        },

        parse: function(response) {
            if (typeof response == 'string') {
                var validResponse = JSON.parse(response);
                console.log('model parsed', typeof validResponse, validResponse);
                return validResponse;
            } else {
                return response;
            }
        },

        fresh: function() {
            return this.filter(function(film) {
                return film.get('releaseYear') >= 2013;
            });
        }
    });

    return FilmsCollection;
});