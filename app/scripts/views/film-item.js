define([
    'jquery',
    'underscore',
    'backbone',
    'views/generic-view',
    'jade!../templates/film-list-item'
], function ($, _, Backbone, View, FilmHtml) {
    'use strict';

    var FilmView = View.extend({
        template: FilmHtml,
        tagName: 'li',

        initialize: function() {
            console.log('film view init');
//            _.bindAll(this, 'click', 'render');
            this.events = _.extend({}, View.prototype.events, this.events);
        },

        render: function() {
            var dict = this.model.toJSON();
            var html = this.template(dict);
//            console.log('render film item', dict);
            this.$el.html(html).show();
        },

        events: {
            'click': 'filmHandler',
            'click .seen': 'seenHandler'
        },

        filmHandler: function() {
            console.log('get film', this.model.id);
            this.options.router.navigate('/' + this.model.id, {trigger: true});
        },

        seenHandler: function(e) {
            e.stopPropagation();
            this.options.user.seenFilm(this.model.id);
            this.hide();
        },

        hide: function() {
            this.$el.hide();
        }

    });

    return FilmView;
});