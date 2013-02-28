/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('helperMojit', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
          var highlighted_module = ac.params.url('module') || "event",
              formatter = function(mod) { 
                   return mod.substr(0,1).toUpperCase() + mod.substr(1,mod.length) + " Utility";
              },
              yui = {
                modules: [
                  {name: "event", user_guide: "http://yuilibrary.com/yui/docs/event/", formatter: formatter },
                  {name: "node", user_guide: "http://yuilibrary.com/yui/docs/node/",  formatter: formatter },
                  {name: "base", user_guide: "http://yuilibrary.com/yui/docs/base/",  formatter: function(mod) { 
                   return mod.substr(0,1).toUpperCase() + mod.substr(1,mod.length);
                  }},
                  {name: "test", user_guide: "http://yuilibrary.com/yui/docs/test/",  formatter: function(mod) { 
                    return "YUI " + mod.substr(0,1).toUpperCase() + mod.substr(1,mod.length);
                  }},
                  {name: "cookie", user_guide: "http://yuilibrary.com/yui/docs/cookie/",  formatter: formatter },
                  {name: "yql", user_guide: "http://yuilibrary.com/yui/docs/yql/",  formatter: function(mod) { 
                   return mod.toUpperCase() + " Query";
                  }}
                ]
              };
          ac.helpers.set('toLink', function(title, url, callback) {
             return "<a href='" + url + "'>" + callback(title) + "</a>";
          });
          ac.helpers.set('highlightModule', function(mods) {
             var mod_names = "";
              for (var i = 0, l=mods.length; i<l; i++){
                 mod_names += mods[i].formatter(mods[i].name) + ", ";
              }
              mod_names = mod_names.substring(0,mod_names.length-2);
             return Y.Highlight.words(mod_names,highlighted_module,{caseSensitive:false}); 
          });
          ac.done({ yui: yui});
        }
      };
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'helperMojitModelFoo', 'mojito-helpers-addon', 'mojito-params-addon', 'highlight']});
