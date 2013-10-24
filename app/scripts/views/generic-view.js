define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var GenericView = Backbone.View.extend({
        isBusy: false,

        setBusy: function() {
            console.log('busy');
            this.isBusy = true;
            this.$el.addClass('_busy');
            return this;
        },

        setFree: function() {
            console.log('free');
            this.isBusy = false;
            this.$el.removeClass('_busy');
            return this;
        },

        getJanre: function(name) {
            this.options.router.navigate('/janre/' + name, {trigger: true});
            return this;
        },

        showFilm: function(id) {
            return this.options.router.showFilm(id);
        },

        showPerson: function(id) {
            return this.options.router.showPerson(id);
        },

        events: {
            'click .janre': 'janreHandler',
            'click .person': 'personHandler'
        },

        janreHandler: function(e) {
            e.stopPropagation();
            var name = $(e.target).data('name').toLowerCase();
            console.log('get janre', name);
            this.getJanre(name);
        },

        personHandler: function(e) {
            e.stopPropagation();
            var id = $(e.target).data('id');
            console.log('get person', id);
            this.showPerson(id);
        }

    });

    return GenericView;

});
