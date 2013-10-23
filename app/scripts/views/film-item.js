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
//            console.log('render', dict);
//            console.log('model', this.model);
            var html = this.template(dict);
            this.$el.html(html);
            return this;
        },

        events: {
            'click': 'filmHandler',
            'click .janre': 'janreHandler'
        },

        filmHandler: function() {
            console.log('get film', this.model.id);
            this.showFilm(this.model.id);
        },

        janreHandler: function(e) {
            e.stopPropagation();
            var name = $(e.target).data('name').toLowerCase();
            console.log('get janre', name);
            this.getJanre(name);
        }

    });

    return FilmView;
});