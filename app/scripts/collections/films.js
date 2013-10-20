/*global define*/

define([
    'underscore',
    'backbone',
    'json5',
    'models/films'
], function (_, Backbone, JSON, FilmsModel) {
    'use strict';

    var FilmsCollection = Backbone.Collection.extend({
        model: FilmsModel,
        page: 1,

        url: function() {
            return '/scripts/tests/response-films-' + this.page + '.json';
        },

        parse: function(response) {
            var validResponse = JSON.parse(response);
//            console.log('parse', validResponse);
            return validResponse;
        },

        fresh: function() {
            return this.filter(function(film) {
                return film.get('releaseYear') >= 2013;
            });
        }
    });

    return FilmsCollection;
});