define([
    'jquery',
    'underscore',
    'backbone',
    'views/generic-details-view',
    'jade!../templates/person-details'
], function ($, _, Backbone, View, PersonHtml) {
    'use strict';

    var PersonView = View.extend({
        template: PersonHtml
    });

    return PersonView;
});