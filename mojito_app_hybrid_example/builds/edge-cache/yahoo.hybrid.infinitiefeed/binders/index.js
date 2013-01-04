/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */

/*global YUI: true*/

'use strict';

YUI.add('infinitie_feed_binder_index', function (Y, NAME) {

    var urlsOnPage = {},
        titlesOnPage = {},
        doFaceBook = false;

    function hasScrolledIntoView(node, padding) {

        var docViewTop,
            docViewBottom,
            elemTop,
            elemBottom;

        if (!padding) {
            padding = 0;
        }

        docViewTop = Y.one('body').get('scrollTop') || document.documentElement.scrollTop;
        docViewBottom = docViewTop + node.get('winHeight');

        elemTop = node.getY();

        if (elemTop <= 0) {
            return false;
        }

        // Y.log(docViewBottom + " ? " + elemTop, "error");

        return docViewBottom > (elemTop - padding);
    }

    /*
        Check if the given element has overflowed
    */
    function isOverflowed(el) {

        var curOverflow = el.style.overflow;

        if ( !curOverflow || curOverflow === "visible" )
        el.style.overflow = "hidden";

        var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

        el.style.overflow = curOverflow;

        return isOverflowing;
    }

    /*
        Stores the items title and url to be checked by any future calls
    */
    function isUnique(item) {

        var href = item.one("a").get("href"),
            title = item.one("a").getAttribute("alt").toLowerCase().replace(/[^a-z]/g, "");

        if (urlsOnPage[href] || titlesOnPage[title]) {
            return false;
        }

        urlsOnPage[href] = true;
        titlesOnPage[title] = true;

        return true;
    }

    /*
        Clears any data stored when calling isUnique()
    */
    function resetIsUnique() {
        // Clear what we have
        urlsOnPage = {};
        titlesOnPage = {};
    }

    /*
        Fixes the layout for items where the text overflowing
    */
    function layoutItemContent(item) {
        var node = item.one(".card").getDOMNode();

        // A bit of a hack so we don't run this 
        // code if we are in full width mode
        // which is less than 500px
        if (item.get('winWidth') < 500) {
            return;
        }

        // If the text has overflowed
        if (isOverflowed(node)) {
            // Make the text smaller
            item.addClass("small-text");
            // If it still over flows just hide it
            if (isOverflowed(node)) {
                item.addClass("hide-text");
            }
        }
    }

    /*
        Test if the page has moved from the before value.
    */
    function hasScrolled(before) {

        var current = Y.one('body').get('scrollTop') || document.documentElement.scrollTop;

        if (current === before) {
            return false;
        }

        return true;
    }

    /*
        FB adds too much overhead and and makes the page jerky
    */

    function triggerFacebook(position) {
        if (!doFaceBook) {
            return;
        }

        // If we haven't scroll quickly call FB before we scroll again!
        if (!hasScrolled(position)) {
            if (typeof FB !== 'undefined' && FB.XFBML && typeof FB.XFBML.parse === 'function') {
                FB.XFBML.parse();
            }
        }
    }

    Y.namespace('mojito.binders')[NAME] = {

        lastOffset: 0,

        init: function (mp) {
            this.mp = mp;
            this.limit = this.mp.config.limit || 2;
            this.timeout = parseInt(this.mp.config.timeout, 10) || 300000; // 5 minutes
        },

        bind: function (node) {

            var self = this,
                loading = false,
                listener,
                timeout,
                lastMoveTime,
                lastPosition;

            /*
                The main listener for scrolling events.
                This code loads the new content as the user gets to the bottom of the page.
            */
            listener = function () {

                var footer = node.one('.footer'), // this happens here incase it was killed and remade.
                    offset = 0;

                /*
                    If we are near the bottom of the page load more content
                */
                if (loading === false && footer && hasScrolledIntoView(footer, 1000)) {

                    loading = true; // Stop anyone else from coming in here

                    lastMoveTime = new Date().getTime(); // The user has done something so up date the move time;

                    offset = node.one('ul').get('children').size() + 1;

                    if (self.lastOffset < offset) {

                        self.lastOffset = offset;

                        self.loadContent(node, offset, function () {
                            loading = false;
                        });
                    } else {
                        loading = false;
                    }
                }

                // Set the last position before we leave the loop
                lastPosition = Y.one('body').get('scrollTop') || document.documentElement.scrollTop;
            };

            setInterval(listener, 100);

            /*
                If its been n msec since the last interaction tell someone
            */
            setInterval(function () {
                if (new Date().getTime() - lastMoveTime > self.timeout) {
                    // This will be picked up by "yahoo_infinite_nav"
                    Y.fire("infinite_nav:reload");
                }
            }, self.timeout);

            node.one(".refresh").on("click", function () {
                // We are clearing the page so remove all current data
                resetIsUnique();
                // This will be picked up by "yahoo_infinite_nav"
                Y.fire("infinite_nav:refresh");
            });

            // For any items on the page store their uniqueness and fix their layouts
            node.all("ul li").each(function (item) {
                layoutItemContent(item);
                isUnique(item);
            });
        },

        loadContent: function (node, offset, callback) {

            var self = this,
                params = {
                    body: {
                        offset: offset
                    }
                };

            self.mp.invoke('feed', {params: params}, function (err, html) {

                var items;

                if (!html) {
                    callback();
                } else {

                    /*
                        Check if we have reset the page
                    */
                    if (node.all('ul li').size() <= self.limit) {
                        // Clear all we knew, it's a new world!
                        resetIsUnique();
                        // For any items on the page store their uniqueness
                        node.all("ul li").each(function (item) {
                            isUnique(item);
                        });
                    }

                    // Create the items
                    items = Y.Node.create(html);

                    /*
                        We may not have any items to add if they were all removed
                    */
                    if (!items) {
                        callback();
                        return;
                    }

                    /*
                        In this loop we set up the items as needed
                    */
                    items.all("li").each(function (item) {
                        if (isUnique(item)) {
                            // Make the items invisible so we can fade them in all sexy
                            item.setStyle("opacity", "0");
                            item.addClass("new");
                        } else {
                            item.remove();
                        }
                    });

                    // Add our new items to the page
                    node.one("ul").append(items);

                    /*
                        In this loop make them visible
                    */
                    node.all("ul li.new").each(function (item) {
                        // Get the text sized right (we can only do this once hte item is on the DOM)
                        layoutItemContent(item);
                        setTimeout(function () {
                            // Now show the item to the world
                            item.show(true);
                            item.removeClass("new");
                        }, 200);
                            
                    });

                    /*
                        With it all done we can add facebook stuff
                    */
                    doFaceBook = true;

                    /*
                        Used to allow CSS to take effect before we go on
                    */
                    setTimeout(function () {
                        callback();
                    }, 0);
                }
            });
        }
    };

}, '0.0.1', {requires: ['mojito-client', 'node', 'transition', 'event']});
