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

            var model = ac.models.get('githubMojitModelFoo');
            Y.log(model);
            model.getData(function(err, data){
                Y.log("githubmojit -index - model.getData:");
                if (err) {
                    ac.error(err);
                    return;
                }
                Y.log(data);
                var view = ac.params.getFromUrl('view') || 'index';
                Y.log(view);
                if(view =='custom') {
                   ac.assets.addCss('/static/03_frame_mojit/assets/custom.css','top');
                } else if(view !='index') {
                  // In case a view that doesn't exist is chosen
                  view = 'index';
                }
                ac.done({
                    title: "",
                    github: data
                }, view);
            });
        }

    };
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-params-addon','mojito-models-addon', 'githubMojitModelFoo']});
