/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('DisplayQuotesModel', function(Y, NAME) {

/**
 * The DisplayQuotesModelFoo module.
 *
 * @module DisplayQuotes
 */

    /**
     * Constructor for the DisplayQuotesModelFoo class.
     *
     * @class DisplayQuotesModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
            this.dummy_data = { "GOOG": "900", "YHOO": "27", "ORCL": "35", "AAPL": "500" };
 
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */

        getData: function(callback) {
            callback(null, this.dummy_data);
        }

    };

}, '0.0.1', {requires: []});
