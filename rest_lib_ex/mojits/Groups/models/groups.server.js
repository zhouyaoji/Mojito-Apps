/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('GroupsModel', function(Y, NAME) {

/**
 * The GroupsModelFoo module.
 *
 * @module Groups
 */

    /**
     * Constructor for the GroupsModelFoo class.
     *
     * @class GroupsModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
         getData: function(callback) {
            var uri = "http://groups.yahoo.com" + "/search",
                params = { "query": "baking" };

            Y.mojito.lib.REST.GET(uri, params,null,function(err, response) {
               if (err) {
                 callback(err);
               }
               callback(null, response._resp.responseText);
            });
        }
    };
}, '0.0.1', {requires: ['mojito-rest-lib']});
