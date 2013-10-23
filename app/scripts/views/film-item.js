define([
    'jquery',
    'underscore',
    'backbone',
    'jade!../templates/film-list-item'
], function ($, _, Backbone, FilmHtml) {
    'use strict';

    var FilmView = Backbone.View.extend({
        template: FilmHtml,
        tagName: 'li',

        initialize: function() {
//            _.bindAll(this, 'click', 'render');
        },

        render: function() {
            var dict = this.model.toJSON();
            console.log('render', dict);
//            console.log('model', this.model);
            var html = this.template(dict);
            this.$el.html(html);
            return this;
        },

        events: {
            'click': 'getFilm'
        },

        getFilm: function() {
            console.log('get film', this.model.id);
            this.navigate('/' + this.model.id);
        }

    });

    return FilmView;
});