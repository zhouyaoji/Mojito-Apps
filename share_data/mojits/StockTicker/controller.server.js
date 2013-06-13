/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('StockTicker', function(Y, NAME) {

/**
 * The StockTicker module.
 *
 * @module StockTicker
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
           ac.done({
             init_list: "YHOO" 
           });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-data-addon', 'mojito-config-addon']});
