define([
    'underscore',
    'backbone',
    'json5'
], function (_, Backbone, JSON) {
    'use strict';

    var PersonsModel = Backbone.Model.extend({
        idAttribute: 'pk',
        urlRoot: function() {
            return '/scripts/tests/response-person.json';
        },
        parse: function(response) {
            if (typeof response == 'string') {
                var validResponse = JSON.parse(response);
                return validResponse;
            } else {
                return response;
            }
        }
    });

    return PersonsModel;
});