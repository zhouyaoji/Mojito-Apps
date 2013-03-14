/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('githubMojit', function(Y, NAME) {

/**
 * The githubMojit module.
 *
 * @module githubMojit
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
            /**
            ac.models.get('githubMojitModelFoo').getData(function(err, data) {
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
**/

            var model = ac.models.get('StatsModelYQL');
            Y.log(model);
            model.getData({}, function(data){
                Y.log("githubmojit -index - model.getData:");
                Y.log(data);
                var view = ac.params.url('custom') || 'index';
                ac.done({
                    title: "",
                    watchers: data.watchers,
                    forks: data.forks
                }, view);
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'githubMojitModelFoo']});
