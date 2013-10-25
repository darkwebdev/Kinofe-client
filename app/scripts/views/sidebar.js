define([
    'jquery',
    'underscore',
    'backbone',
    'views/generic-details-view',
    'jade!../templates/sidebar'
], function ($, _, Backbone, View, SidebarHtml) {
    'use strict';

    var SidebarView = View.extend({
        el: '.sidebar',
        template: SidebarHtml,

        initialize: function() {
            console.log('sidebar init');
            View.prototype.initialize.apply(this);

            var view = this;

            $('.icon-settings').on('click', function(){
                console.log('icon settings clicked');
                view.show();
            });
        },

        render: function() {
            var user_dict = this.model.toJSON();
            var html = this.template({user: user_dict});
            this.$el.html(html);
        },

    });

    return SidebarView;
});