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
            var me = this;
            // If we don't have a compiled template, make one.
            Y.log('Rendering template "' + tmpl + '"', 'mojito', NAME);
            try {
              var template_str = this.compiler(tmpl);
              var template = hb.compile(template_str);
              var result = template(data);
              console.log(result);
            }catch(e){
             Y.log(e);
            }
            adapter.flush(result,meta);
            if(!more) {
              adapter.done('',meta);
            }
        },

        compiler: function(tmpl) {
            return fs.readFileSync(tmpl, 'utf8');
        }
    };

    Y.namespace('mojito.addons.viewEngines').hb = HbAdapter;

}, '0.1.0', {requires: []});
