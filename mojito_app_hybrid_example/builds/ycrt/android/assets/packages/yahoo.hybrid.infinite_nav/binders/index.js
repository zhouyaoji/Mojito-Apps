/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */

/*jslint nomen: true */

/*global YUI: true, window: true, document: true*/

'use strict';

YUI.add('yahoo_infinite_nav_binder_index', function (Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function (mp) {
            this.mp = mp;
        },

        bind: function (node) {

            var self = this;

            /*
                I'm using timeouts here as Webkit does not seem to fire the .show() .hide() callback
            */
            node.one(".toggle-selectors").on("click", function (e) {

                var button = e.currentTarget;

                button.toggleClass("show");

                if (button.hasClass("show")) {

                    self.showAction("selectors", node.one(".bd"));

                    // Hide all links
                    button.ancestor("div.hd").all("a").each(function (link) {
                        link.setStyle("opacity", "0");
                    });

                    button.set("text", "Done");
                    button.show(true);

                } else {

                    button.setStyle("opacity", "0");

                    self.showAction("topics", node.one(".bd"));

                    button.set("text", "Topics");
                    // Show all links
                    button.ancestor("div.hd").all("a").each(function (link) {
                        link.show(true);
                    });
                }

            });

            Y.on("infinite_nav:refresh", function (e) {
                self.showAction("topics", node.one(".bd"));
            });

            /*
                If a reload event fired show the popup
            */
            Y.on("infinite_nav:reload", function (e) {
                self.mp.invoke("reloadPopUp", {}, function (err, html) {
                    node.one(".reload-popup").show(true);
                });
            });

            /*
                If the pop is clicked on just hide it
            */
            node.on("click", function (e) {
                node.one(".reload-popup").hide(true);
            }, ".reload-popup a");
        },

        showAction: function (action, node) {

            this.mp.invoke(action, {}, function (err, html) {

                if (err || !html) {
                    Y.log(err || html || 'No data given.', "error");
                    return;
                }

                window.scrollTo(0, 0);

                node.setHTML(html);
            });
        }
    };

}, '0.0.1', {
    requires: ['mojito-client', "transition"]
});
