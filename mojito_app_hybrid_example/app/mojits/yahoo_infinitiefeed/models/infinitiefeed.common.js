/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */

/*jslint regexp: true */

/*global YUI: true*/

'use strict';

YUI.add('infinitiefeedmodel', function (Y, NAME) {

    var preFill = 3,
        feedCfgs = {},
        cache = {}, // Holds all the data
        regexps = {
            replaceBrsRe:   /(<br[^>]*>[ \n\r\t]*){2,}/gi,
            replaceFontsRe: /<(\/?)font[^>]*>/gi,
            trimRe:         /^\s+|\s+$/g,
            normalizeRe:    /\s{2,}/g,
            killBreaksRe:   /(<br[^\/>]*\/?>(\s|&nbsp;?)*){1,}/g,
            linkRe1:        /<a[^>]*>/gi,
            linkRe2:        /<\/a[^>]*>/gi,
            imgRe:          /<img[^>]*>/gi,
            imgSrc:         /src="([^"]*)/i,
            pTag1:          /<p[^>]*>/gi,
            pTag2:          /<\/p[^>]*>/gi
        };

    /*
     * @method poorMansReadability
     * @param {string} html
     * @retrun {object}
     */

    function poorMansReadability(html) {

        var data = {},
            text,
            images = [],
            i,
            src;

        if (!html) {
            return data;
        }

        images = html.match(regexps.imgRe);

        text = html.replace(regexps.replaceBrsRe, '')
            .replace(regexps.replaceFontsRe, '')
            .replace(regexps.pTag1, '')
            .replace(regexps.pTag2, '')
            .replace(regexps.linkRe1, '')
            .replace(regexps.linkRe2, '')
            .replace(regexps.trimRe, '')
            .replace(regexps.normalizeRe, '')
            .replace(regexps.killBreaksRe, '')
            .replace(regexps.imgRe, '');

        data.body = text;
        data.images = [];

        for (i in images) {
            if (images.hasOwnProperty(i)) {
                src = images[i].match(regexps.imgSrc);

                if (src && src[1]) {
                    data.images.push({
                        src: src[1]
                    });
                }
            }
        }

        return data;
    }

    /*
        The Cache Object
    */

    cache.store = [];

    /*
        The Cache Objects Index
    */

    cache.storeIndex = {};

    /*
        A map of feedIds that have been fetched allready

        <feedId>: <timestamp>
    */

    cache.fetched = {};

    /*
        The item shown to the user.

        This is used when mixing in new feeds content.
    */

    cache.lastSent = 0;

    /*
        Empty all cache data
    */

    cache.empty = function () {
        cache.store = [];
        cache.storeIndex = {};
        cache.fetched = {};
        cache.lastSent = 0;
    };

    /*
        Checks if the given key is in the cache
    */

    cache.exists = function (key) {
        return cache.storeIndex[key] ? true : false;
    };

    /*
        Reorder the cache by date ONLY after the last seen item
    */

    cache.reorder = function (from) {

        // Y.log("from: " + from, "warn");

        if (from === undefined) {
            from = cache.lastSent;
        }

        // Y.log("from: " + from, "warn");

        var oldItems = cache.store.slice(0, from),
            newItems = cache.store.slice(from);

        // Y.log("before: " + cache.store.length, "warn");

        newItems.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });

        cache.store = oldItems.concat(newItems);

        // Y.log("after: " + cache.store.length, "warn");
    };

    /*
        Fill the cache
    */

    cache.fill = function (feedIds, callback) {

        var feedId,
            feedCfg,
            lastUpdate,
            query;

        // First check which feed to get by walking the ordered feedIds list.
        Y.Array.each(feedIds, function (feed) {
            if (!feedId && !cache.fetched[feed.feedId]) {
                feedId = feed.feedId;
            }
        });

        // If we didn't get a feedId then find the oldest
        if (!feedId) {
            lastUpdate = new Date().getTime();
            Y.Object.each(cache.fetched, function (val, id) {
                if (val < lastUpdate) {
                    feedId = id;
                    lastUpdate = val;
                }
            });

            // Before we use what we got check we updated it in 
            // the past 1 minute (60000 milliseconds).
            if (cache.fetched[feedId] + 60000 > new Date().getTime()) {
                feedId = null;
            }
        }

        feedCfg = feedCfgs[feedId];

        if (!feedId) {
            callback("No Feed ID available for reading.");
            return;
        }

        query = feedCfg.query + " limit 100";

        Y.YQL(query, function (raw) {

            var items;

            if ((raw.query && !raw.query.count) || !raw.query.results.item) {
                callback("Error executing YQL query: " + query);
            } else {
                // This is here for debugging only
                Y.log("Executed YQL query: " + query, "info");
            }

            items = raw.query.results.item;

            Y.Array.each(items, function (item, index) {

                var read;

                if (!cache.exists(item.link)) {
                    read = poorMansReadability(item.description);

                    cache.storeIndex[item.link] = {
                        title: item.title,
                        body: read.body,
                        images: read.images,
                        url: item.link,
                        date: item.pubDate,
                        timestamp: Math.round(Date.parse(item.pubDate)/1000),
                        group: feedCfgs[feedId].title
                    };

                    cache.store.push(cache.storeIndex[item.link]);
                }
            });

            cache.fetched[feedId] = new Date().getTime();

            if (Y.Object.size(cache.fetched) < preFill) {
                cache.fill(feedIds, callback);
            } else {
                cache.reorder();
                callback();
            }
        });
    };

    /*
        Get items form the cache
    */

    cache.get = function (offset, limit, feedIds, callback) {

        if (offset < cache.lastSent) {
            cache.lastSent = offset;
            cache.reorder();
        }

        cache.fill(feedIds, function (err) {

            cache.lastSent = offset + limit;

            // Y.log("offset: " + offset + " limit:" + limit, "warn");
            // Y.log("cache.lastSent: " + cache.lastSent, "warn");
            // Y.log("cache.store.length: " + cache.store.length, "warn");

            if (err) {
                Y.log(err, "warn");
            }

            callback(cache.store.slice(offset, offset + limit));
        });
    };

    Y.namespace('mojito.models')[NAME] = {

        init: function (config) {
            this.cfg = config;
            feedCfgs = config.feeds;
        },

        emptyCache: function () {
            cache.empty();
        },

        getFeed: function (feedIds, offset, limit, callback) {

            offset = parseInt(offset) || 0;
            limit = parseInt(limit) || this.cfg.limit || 10;

            if (!Y.Array.test(feedIds) || feedIds.length <= 0) {
                feedIds = this.cfg.feedIds;
            }

            cache.get(offset, limit, feedIds, callback);
        }
    };

}, '0.0.1', {
    requires: ['yql']
});
