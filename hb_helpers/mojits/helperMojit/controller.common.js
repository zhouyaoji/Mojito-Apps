/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('helperMojit', function(Y, NAME) {


    function toLinkHelper(title, url) {
        return "<a href='" + url + "'>" + title + "</a>";
    }
    function highlightModuleHelper(mods, highlighted_module) {
        var mod_names = [];
        for (var i = 0, l=mods.length; i<l; i++){
            mod_names.push(mods[i].name);
        }
        mod_names = mod_names.join(', ');
 
        return Y.Highlight.words(mod_names, highlighted_module, {
            caseSensitive:false
        }); 
    }
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
          ac.helpers.set('toLink', toLinkHelper);
          ac.helpers.set('highlightModule', highlightModuleHelper);
          var yui = {
              modules: [
                {name: "event", user_guide: "http://yuilibrary.com/yui/docs/event/", title: "Event Utility"},
                {name: "node", user_guide: "http://yuilibrary.com/yui/docs/node/",  title: "Node Utility"},
                {name: "base", user_guide: "http://yuilibrary.com/yui/docs/base/", title: "Base" },
                {name: "test", user_guide: "http://yuilibrary.com/yui/docs/test/", title: "YUI Test"}, 
                {name: "cookie", user_guide: "http://yuilibrary.com/yui/docs/cookie/",  title: "Cookie Utility"},
                {name: "yql", user_guide: "http://yuilibrary.com/yui/docs/yql/", title: "YQL Query"} 
              ]
            };
          ac.done({ yui: yui, highlighted_module: ac.params.url('module') || "event"});
        }
      };
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'helperMojitModelFoo', 'mojito-helpers-addon', 'mojito-params-addon', 'highlight']});
