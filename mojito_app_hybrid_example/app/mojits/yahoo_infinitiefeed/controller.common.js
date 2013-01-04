/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */

/*global YUI: true*/

'use strict';

YUI.add('infinitiefeed', function (Y, NAME) {

    /*
        I had to copy this here becuse of odd loading error on the client error.
    */

    /**
     * @method toRelativeTime
     * @param d {Date} the Date to translate.
     * @param from {Date} (optional) reference Date. Default is now.
     * @return {String} the delta between from and d, in human readable form
     */

    function toRelativeTime(d,from) {
        d    = d || new Date();
        from = from || new Date();

        var delta   = (from.getTime() - d.getTime()) / 1000,
            strings = toRelativeTime.strings,
            time    = "",
            rel, tmp, months, years;

        if (arguments.length < 2) {
            rel = (delta < 0) ? strings.fromnow : strings.ago;
        } else {
            rel = (delta < 0) ? strings.ahead : strings.before;
        }

        if (delta < 0) {
            tmp = d;
            d   = from;
            from = tmp;
            delta *= -1;
        }

        time = delta < 5      ? strings.now     :
               delta < 60     ? strings.seconds :
               delta < 120    ? strings.minute  :
               delta < 3600   ? strings.minutes.replace(/X/, Math.floor(delta/60)) :
               delta < 7200   ? strings.hour    :
               delta < 86400  ? strings.hours.replace(/X/, Math.floor(delta/3600)) :
               delta < 172800 ? strings.day     : '';

        if (!time) {
            d.setHours(0,0,0);
            from.setHours(0,0,0);
            delta = Math.round((from.getTime() - d.getTime()) / 86400000);

            if (delta > 27) {
                years  = from.getFullYear() - d.getFullYear();
                months = from.getMonth() - d.getMonth();

                if (months < 0) {
                    months += 12;
                    years--;
                }

                if (months) {
                    time = (months > 1) ?
                        strings.months.replace(/X/, months) :
                        strings.month;

                }

                if (years) {
                    if (months) {
                        time = strings.and + time;
                    }

                    time = (years > 1 ?
                        strings.years.replace(/X/, years) :
                        strings.year) + time;
                }
            }

            if (!time) {
                if (d.getDay() === from.getDay()) {
                    tmp = Math.round(delta / 7);

                    time = (tmp > 1) ?
                        strings.weeks.replace(/X/, tmp) :
                        strings.week;
                } else {
                    time = strings.days.replace(/X/, delta);
                }
            }
        }

        if (time !== strings.now) {
            time += rel;
        }
        return time;
    }

    /**
     * The strings to use for relative times.  Represent Numbers (minutes, hours,
     * days) as X (e.g. "about X hours ago"). Keys are now, seconds, minute,
     * minutes, hour, hours, day, and days.
     *
     * @property toRelativeTime.strings
     * @type {Object}
     */

    toRelativeTime.strings = {
        now     : "right now",
        seconds : "less than a minute",
        minute  : "about a minute",
        minutes : "X minutes",
        hour    : "about an hour",
        hours   : "about X hours",
        day     : "1 day" ,
        days    : "X days",
        week    : "about a week",
        weeks   : "X weeks",
        month   : "about a month",
        months  : "X months",
        year    : "about a year",
        years   : "X years",
        ahead   : " ahead",
        before  : " before",
        ago     : " ago",
        fromnow : " from now",
        and     : " and "
    };

    Y.namespace('mojito.controllers')[NAME] = {

        index: function (ac) {

            var cfg = {
                    children: {
                        feed: {
                            type: 'yahoo.hybrid.infinitiefeed',
                            action: 'feed'
                        }
                    }
                };

            ac.composite.execute(cfg, function (data) {
                ac.done(data);
            });
        },

        feed: function (ac) {

            var offset = ac.params.merged('offset'),
                limit = ac.config.get('limit');

            ac.models.get('yahoo_hybrid_app_usermodel').getConfig('user_id', function (error, feedIds) {

                ac.models.get('infinitiefeedmodel').getFeed(feedIds, offset, limit, function (items) {

                    var data = {},
                        now;

                    if (!Y.Array.test(items)) {
                        data.items = [];
                    }

                    data.items = items;

                    now = new Date().getTime();

                    Y.Array.each(items, function (item) {
                        item.date = toRelativeTime(new Date(item.timestamp*1000));
                    });

                    ac.done(data);
                });

            });
        },

        selectTopics: function (ac) {

            var feeds = Y.Object.values(ac.config.get("feeds"));

            // Sort the array
            feeds.sort(function (a, b) {
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            });

            console.log("Looking for ac.shared_model_addon");
            console.log(ac.shared_model_addon);
            console.log(feeds);
            ac.models.get('yahoo_hybrid_app_usermodel').getConfig('user_id', function (error, feedIds) {

                // There must be a better way of doing this!
                Y.Array.each(feeds, function (listFeed) {

                    // Here we check if we have selected the topic
                    Y.Array.each(feedIds, function (userFeed) {
                        if (listFeed.id === userFeed.feedId) {
                            listFeed.selected = true;
                        }
                    });
                });

                ac.done({feeds: feeds});
            });
        },

        updateTopic: function (ac) {

            var topic = ac.params.body("feedId");

            ac.models.get('yahoo_hybrid_app_usermodel').toggleFeed('user_id', topic, function (error) {
                // This could be better by only removing feedIds that were dropped.
                ac.models.get('infinitiefeedmodel').emptyCache();
                ac.done("done");
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'yahoo_hybrid_app_usermodel', 'mojito-composite-addon',  'mojito-params-addon', 'mojito-config-addon', 'mojito-models-addon','infinitiefeedmodel']});
