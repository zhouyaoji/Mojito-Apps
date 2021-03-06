/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('BodyMojitModelFoo', function(Y, NAME) {

/**
 * The BodyMojitModelFoo module.
 *
 * @module BodyMojit
 */

    /**
     * Constructor for the BodyMojitModelFoo class.
     *
     * @class BodyMojitModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            Y.log(config);
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getData: function(callback) {
            callback(null, { some: 'data' });
        }

    };

}, '0.0.1', {requires: []});
