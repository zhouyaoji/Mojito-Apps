/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('DisplayQuotesBinderIndex', function(Y, NAME) {

/**
 * The DisplayQuotesBinderIndex module.
 *
 * @module DisplayQuotesBinderIndex
 */

    /**
     * Constructor for the DisplayQuotesBinderIndex class.
     *
     * @class DisplayQuotesBinderIndex
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
            var me = this;
            this.node = node;
            var stock_list = this.mojitProxy.pageData.get('fav_stocks'); 
            var stock_quotes = this.mojitProxy.data.get('stock_quotes');
            var list = "<ul>";
            for (var s in stock_list) {
              list += "<li>" + stock_list[s] + ": $" + stock_quotes[stock_list[s]] + "</li>";
            } 
            list += "</ul>";
            node.one('#stocks p').setHTML(list);
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
