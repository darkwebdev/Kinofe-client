/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var FilmsModel = Backbone.Model.extend({
        idAttribute: 'pk',
        defaults: {
        }
    });

    return FilmsModel;
});