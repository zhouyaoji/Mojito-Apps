/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('myMojit', function(Y, NAME) {

/**
 * The myMojit module.
 *
 * @module myMojit
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.mojito.controllers[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
             var yahoo_links = [
               { name: "Yahoo!", url: "http://www.yahoo.com" },
               { name: "Yahoo! Finance", url: "http://finance.yahoo.com" },
               { name: "Yahoo! News", url: "http://news.yahoo.com" },
               { name: "Yahoo! Movies", url: "http://movies.yahoo.com" }
            ];
            ac.models.get('myMojitModelFoo').getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.done({
                    l: [ "Tom", "Dick", "Harry" ],
                    yahoo_links: yahoo_links, 
                    status: 'Mojito is working.',
                    data: data,
                    title: "Handlebars"
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'myMojitModelFoo','mojito-models-addon', 'mojito-assets-addon', 'mojito-helpers-addon']});
