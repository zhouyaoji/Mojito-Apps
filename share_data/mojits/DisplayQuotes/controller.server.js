/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('DisplayQuotes', function(Y, NAME) {

/**
 * The DisplayQuotes module.
 *
 * @module DisplayQuotes
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
            Y.log(this.page, "info", NAME);
            Y.log(ac.pageData, "info", NAME);
            Y.log(ac.page, "info", NAME);
            ac.models.get('DisplayQuotesModel').getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.data.set('stock_quotes', data); 
                var ml = ac.data.get("mojit_level_data");
                Y.log(ml, "info", NAME);
                Y.log(data, "info", NAME);
                ac.done({
                   title: "Stock Quotes"
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'DisplayQuotesModel', 'mojito-data-addon']});
