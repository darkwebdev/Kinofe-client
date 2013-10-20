/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jade',
    'jade!../templates/films'
], function ($, _, Backbone, JST, Jade, FilmsHtml) {
    'use strict';

    var FilmsView = Backbone.View.extend({
        el: '.films',
//        template: JST['app/scripts/templates/films.ejs'],
        template: FilmsHtml,
        isBusy: false,

        setBusy: function() {
            console.log('busy');
            this.isBusy = true;
            this.$el.addClass('_busy');
        },

        setFree: function() {
            console.log('free');
            this.isBusy = false;
            this.$el.removeClass('_busy');
        },

        initialize: function() {
            this.$el.empty();
            _.bindAll(this, 'scrollDown');
            $(window).scroll(this.scrollDown);
        },

        update: function() {
            var view = this;

            this.setBusy();
            this.collection.fetch({
                dataType: 'text',
                success: function(response){
                    console.log('ajax success', response.length);
                    $.when(
                        view.render()
                    ).then(function() {
                        view.collection.page += 1;
                        view.setFree();
                    })
                },
                error: function(response){
                    console.log('ajax error', response);
                    view.setFree();
                }
            });
        },

        render: function() {
            this.collection.each(function(item) {
                this.renderItem(item);
            }, this);
            return this;
        },

        renderItem: function(film) {
            var dict = film.toJSON();
            var html = this.template(dict);
//            console.log('render', dict);
            this.$el.append(html);
        },

        events: {
        },

        scrollDown: function () {
            var triggerPoint = 100; // 100px from the bottom

            if( !this.isBusy && $('body')[0].scrollTop + $(window).height() + triggerPoint > $(document).height() ) {
                this.update();
            }
        }
    });

    return FilmsView;
});