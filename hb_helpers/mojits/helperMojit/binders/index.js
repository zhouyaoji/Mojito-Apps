/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('helperMojitBinderIndex', function(Y, NAME) {

/**
 * The helperMojitBinderIndex module.
 *
 * @module helperMojitBinderIndex
 */

    /**
     * Constructor for the helperMojitBinderIndex class.
     *
     * @class helperMojitBinderIndex
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
            /**
             * Example code for the bind method:
             *
             * node.all('dt').on('mouseenter', function(evt) {
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).addClass('sel');
             *
             * });
             * node.all('dt').on('mouseleave', function(evt) {
             *   
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).removeClass('sel');
             *
             * });
             */
        }
      };
      function makeTable (title, cols, data, container) {
             var table = new Y.DataTable({
                columns: cols,
                data: d,
                summary: title
             });
             table.render(node.one("#" + container));
        }

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client', 'datatable']});
