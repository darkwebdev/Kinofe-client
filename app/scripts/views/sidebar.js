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
            this.render();

            $('.icon-settings').on('click', function(){
                console.log('icon settings clicked');
                this.show();
            });
        },

        render: function() {
            var html = this.template({});
//            console.log('render', dict);
            this.$el.html(html);
        }

    });

    return SidebarView;
});