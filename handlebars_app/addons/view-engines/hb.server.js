YUI.add('addons-viewengine-hb', function(Y, NAME) {

      var hb = require(__dirname + '/../../node_modules/handlebars'),
         fs = require('fs');


    /**
     * Class text.
     * @class HandleBars
     * @private
     */
    function HbAdapter(viewId) {
        this.viewId = viewId;
    }


    HbAdapter.prototype = {

        /**
         * Renders the Handlebars template using the data provided.
         * @method render
         * @param {object} data The data to render.
         * @param {string} mojitType The name of the mojit type.
         * @param {string} tmpl The name of the template to render.
         * @param {object} adapter The output adapter to use.
         * @param {object} meta Optional metadata.
         * @param {boolean} more Whether there will be more content later.
         */
        render: function(data, mojitType, tmpl, adapter, meta, more) {
            var me = this,
                handleRender = function(output) {

                    output.addListener('data', function(c) {
                        adapter.flush(c, meta);
                    });

                    output.addListener('end', function() {
                        if (!more) {
                            Y.log('render complete for view "' +
                                me.viewId + '"',
                                'mojito', 'qeperf');
                            adapter.done('', meta);
                        }
                    });
                };

            /*
             * We can't use pre-compiled Mu templates on the server :(
             */

            // If we don't have a compliled template, make one.
            Y.log('Rendering template "' + tmpl + '"', 'mojito', NAME);
            var template = hb.compile(this.compiler(tmpl));
            var result = template(data);
            console.log(result);
            adapter.done(result,meta);
 
        },


        compiler: function(tmpl) {
            return JSON.stringify(fs.readFileSync(tmpl, 'utf8'));
        }
    };

    Y.namespace('mojito.addons.viewEngines').hb = HbAdapter;

}, '0.1.0', {requires: []});
