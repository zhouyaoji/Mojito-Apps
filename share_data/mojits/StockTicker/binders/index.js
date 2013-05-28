/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('StockTickerBinderIndex', function(Y, NAME) {

/**
 * The StockTickerBinderIndex module.
 *
 * @module StockTickerBinderIndex
 */

    /**
     * Constructor for the StockTickerBinderIndex class.
     *
     * @class StockTickerBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            console.log(this.mojitProxy.pageData.on, "info", NAME);
            this.mojitProxy.pageData.on('joeChange', function(e){
              console.log(e); 
            });
            this.mojitProxy.pageData.set('joe', "hello");
            /*
            var list = "<ul>";
            for (var s in stock_list) {
              list += "<li>" + s + ": $" + stock_list[s] + "</li>";
            }
            list += "</ul>";  
            */
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
