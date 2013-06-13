/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Groups', function(Y, NAME) {

/**
 * The Groups module.
 *
 * @module Groups
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
            ac.models.get('GroupsModel').getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.done({
                    status: 'Mojito is working.',
                    data: data
                });
            });
        }
    };
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'GroupsModel']});
