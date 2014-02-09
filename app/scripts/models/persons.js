define([
    'underscore',
    'backbone',
//    'json5'
], function (_, Backbone/*, JSON*/) {
    'use strict';

    var PersonsModel = Backbone.Model.extend({
//        idAttribute: 'pk',
        urlRoot: function() {
//            return '/scripts/tests/response-person.json';
            return 'http://127.0.0.1:8000/person/'
        },
        parse: function(response) {
            return JSON.parse(response);
        }
    });

    return PersonsModel;
});