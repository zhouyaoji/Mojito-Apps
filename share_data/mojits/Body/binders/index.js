/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('BodyBinderIndex', function(Y, NAME) {

/**
 * The BodyBinderIndex module.
 *
 * @module BodyBinderIndex
 */

    /**
     * Constructor for the BodyBinderIndex class.
     *
     * @class BodyBinderIndex
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
            var ticker_list = this.mojitProxy.pageData.get('ticker_list');
            ticker_list.push('ZNGA');
            setTimeout(this.mojitProxy.pageData.set('ticker_list', ticker_list), 5000);
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
