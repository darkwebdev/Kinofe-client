define([
    'backbone',
    'collections/films',
    'views/films'
], function (Backbone, FilmsCollection, FilmsView) {
    'use strict';

    return {
        initialize: function() {
            var films = new FilmsCollection();

            var view = new FilmsView({collection: films});
            view.update();

            Backbone.history.start();
        }
    };
});