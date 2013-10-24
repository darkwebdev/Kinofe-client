define([
    'jquery',
    'underscore',
    'backbone',
    'views/generic-details-view',
    'jade!../templates/film-details'
], function ($, _, Backbone, View, FilmHtml) {
    'use strict';

    var FilmView = View.extend({
        template: FilmHtml
    });

    return FilmView;
});