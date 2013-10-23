/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'jade!../templates/film-details'
], function ($, _, Backbone, FilmHtml) {
    'use strict';

    var FilmView = Backbone.View.extend({
        el: '.film-details',
        template: FilmHtml,
        isBusy: false,

        initialize: function() {
            var view = this;

            this.$el.empty();
            this.setBusy();
            this.model.fetch({
                dataType: 'text',
                success: function(model, response, options){
                    console.log('ajax success', response.length);
                    $.when(
                            view.render()
                        ).then(
                            view.setFree()
                        )
                },
                error: function(model, response, options){
                    console.log('ajax error', response);
                    view.setFree();
                }
            });
        },

        render: function() {
            var dict = this.model.toJSON();
            var html = this.template(dict);
//            console.log('render', dict);
            this.$el.append(html).show();
        },

        events: {
        }
    });

    return FilmView;
});