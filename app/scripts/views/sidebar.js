define([
    'jquery',
    'underscore',
    'backbone',
    'jade!../templates/sidebar'
], function ($, _, Backbone, SidebarHtml) {
    'use strict';

    var SidebarView = Backbone.View.extend({
        el: '.sidebar',
        template: SidebarHtml,

        initialize: function() {
            this.render();
        },

        render: function() {
            var html = this.template({});
//            console.log('render', dict);
            this.$el.html(html);
        },

        events: {
            'click .back': 'hide'
        },
        hide: function() {
            this.$el.hide();
        },
        show: function() {
            this.$el.show();
        }
    });

    return SidebarView;
});