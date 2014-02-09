define([
    'underscore',
    'backbone',
//    'json5'
], function (_, Backbone/*, JSON*/) {
    'use strict';

    var FilmsModel = Backbone.Model.extend({
//        idAttribute: 'pk',
        urlRoot: function() {
            //return '/scripts/tests/response-film.json';
            return 'http://127.0.0.1:8000/movie/'
        },
        parse: function(response) {
            if (typeof response == 'string') {
                var validResponse = JSON.parse(response);
                console.log('model parsed', typeof validResponse, validResponse);
                return validResponse;
            } else {
                return response;
            }
        }
    });

    return FilmsModel;
});