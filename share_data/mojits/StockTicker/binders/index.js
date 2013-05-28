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
            this.mojitProxy.pageData.on('ticker_listChange', function(e){
              var ul = node.one("#ticker");
              var items = e.newVal;
              for (var i in items) {
                ul.append("<li>" + items[i] + "</li>");
              }
              console.log(e); 
            });
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
