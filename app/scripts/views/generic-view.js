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

        events: {
            'click .link-janre': 'janreHandler',
            'click .link-film': 'filmHandler',
            'click .link-person': 'personHandler'
        },

        janreHandler: function(e) {
            e.stopPropagation();
            var name = $(e.target).data('name').toLowerCase();
            console.log('get janre', name);
            this.navigate('/janre/' + name);
        },

        filmHandler: function(e) {
            e.stopPropagation();
            var id = $(e.target).data('id');
            console.log('show film', id);
            this.navigate('/' + id);
        },

        personHandler: function(e) {
            e.stopPropagation();
            var id = $(e.target).data('id');
            console.log('show person', id);
            this.navigate('/person/' + id);
        },

        navigate: function(loc) {
            return this.options.router.navigate(loc, {trigger: true});
        }

    });

    return GenericView;

});
