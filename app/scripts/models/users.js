define([
    'underscore',
    'backbone',
    'json5'
], function (_, Backbone, JSON) {
    'use strict';

    var UsersModel = Backbone.Model.extend({
        idAttribute: 'pk',

        initialize: function() {
            this.auth();
        },

        urlRoot: function() {
            return '/scripts/tests/response-user.json';
        },

        parse: function(response) {
            if (typeof response == 'string') {
                return JSON.parse(response);
            } else {
                return response;
            }
        },

        auth: function() {
            //check cookies & get id
            //this.id = 123;
            return this;
        },

        seenFilm: function(id) {
            console.log(this);
            this.attributes.exclude.films.push(id);
            return this;
        },

        hateJanre: function(id) {
            this.attributes.exclude.janres.push(id);
            return this;
        }
    });

    return UsersModel;
});