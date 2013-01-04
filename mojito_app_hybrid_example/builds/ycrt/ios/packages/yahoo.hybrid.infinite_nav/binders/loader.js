/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */

/*jslint nomen: true */

/*global YUI: true, window: true, document: true*/

'use strict';

YUI.add('yahoo_infinite_nav_binder_loader', function (Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function (mp) {
            this.mp = mp;
        },

        bind: function (node) {

            this.mp.invoke('index', {}, function (err, html) {

                if (err) {
                    console.log(err || html || 'No data given.');
                    alert('An error has occurred. Please reload the page and try again.');
                    return;
                }

                // Move to the top of the window
                window.scrollTo(0, 0);

                node.replace(html);
            });
        }
    };

}, '0.0.1', {
    requires: ['mojito-client']
});
