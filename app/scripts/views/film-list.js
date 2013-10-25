define([
    'jquery',
    'underscore',
    'backbone',
    'views/generic-view',
    'views/film-item',
], function ($, _, Backbone, View, FilmView) {
    'use strict';

    var FilmListView = View.extend({
        el: '.film-list',

        initialize: function() {
            console.log('film list view initialize');
            this.collection.page = 1;

            this.$el.empty();
            scroll(0,0);

            this.options.router.hideDetails();
            this.options.router.hideSidebar();

            this.update();
            _.bindAll(this, 'scrollDown'); //????
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
                        view.setFree();
                    })
                },
                error: function(response){
                    console.log('ajax error', response);
                    view.collection.page -= 1;
                    view.setFree();
                }
            });
        },

        render: function() {
            var filmView,
                html;
            console.log('col', this.collection);
            this.collection.each(function(film) {
                filmView = new FilmView({
                    model: film,
                    router: this.options.router,
                    user: this.options.user
                });
                filmView.render();
                html = filmView.el;
                this.$el.append(html);
            }, this);
            return this;
        },

        scrollDown: function () {
            var triggerPoint = 100; // 100px from the bottom

            if( !this.isBusy && $('body')[0].scrollTop + $(window).height() + triggerPoint > $(document).height() ) {
                this.collection.page += 1;
                this.update();
            }
        }
    });

    return FilmListView;
});