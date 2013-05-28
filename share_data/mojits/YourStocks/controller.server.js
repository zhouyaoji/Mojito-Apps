/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('YourStocks', function(Y, NAME) {

/**
 * The YourStocks module.
 *
 * @module YourStocks
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
            ac.models.get('YourStocksModelFoo').getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                var stock_list =  ac.config.getDefinition("fav_stocks");
                ac.data.set("mojit_level_data", "You can't see me!");
                ac.pageData.set('fav_stocks', stock_list);
                ac.done({
                    status: 'Mojito is working.',
                    data: stock_list
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-config-addon', 'mojito-assets-addon', 'mojito-models-addon', 'YourStocksModelFoo', 'mojito-data-addon']});
