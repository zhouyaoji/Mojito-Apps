/*
 * Copyright (c) 2011-2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('BodyMojit', function (Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        index: function (actionContext) {
            actionContext.models.get('BodyMojitModelFoo').getData(function(err, data) {
              Y.log("Calling BodyMojitModelFoo");
            });
            actionContext.done({title: "Body"});
        }
    };
}, '0.0.1', {requires: ['mojito', 'mojito-models-addon', 'BodyMojitModelFoo']});
