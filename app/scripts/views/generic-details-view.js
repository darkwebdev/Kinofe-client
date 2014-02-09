define([
    'underscore',
    'backbone',
    'views/generic-view'
], function (_, Backbone, GenericView) {
    'use strict';

    var GenericDetailsView = GenericView.extend({
        el: '.details',
        initialize: function() {
            console.log('generic details view init');

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
            console.log('render', dict);
            var html = this.template(dict);
//            console.log('html:', html);
            this.$el.html(html).show();
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        },

        events: function() {
            return _.extend({}, GenericView.prototype.events, {
                'click .link-back': function() {
                    this.navigate('');
                }
            });
        }

    });

    return GenericDetailsView;

});
