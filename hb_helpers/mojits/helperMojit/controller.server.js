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
          var data = {
             people: [
               {firstName: "Yehuda", lastName: "Katz"},
               {firstName: "Carl", lastName: "Lerche"},
               {firstName: "Alan", lastName: "Johnson"}
             ]
          };
          ac.helpers.set('list', function(items) {
                  var out = "<ul>";
                  for(var i=0, l=items.length; i<l; i++) {
                    out = out + "<li>" + items[i].firstName + " " + items[i].lastName + "</li>";
                  }
                  return out + "</ul>";
          });
          ac.done({result: data });
        }
      };
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'helperMojitModelFoo', 'mojito-helpers-addon']});
