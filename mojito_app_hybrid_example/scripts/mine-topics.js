#!/usr/bin/env node

// Count all of the links from the nodejs build page
var jsdom = require("jsdom");

jsdom.env("http://news.yahoo.com/sitemap/", [
	  'http://yui.yahooapis.com/3.6.0/build/simpleyui/simpleyui-min.js'
	],
	function(errors, window) {

		var feeds = {};

		window.Y.all(".rss_hub").each(function (item) {
			var feed = {};

			feed.title = item.ancestor("li").one(".headline a");

			if (!feed.title) {
				feed.title = item.ancestor("li").one(".headline").getContent();
			} else {
				feed.title = feed.title.getContent();
			}

			feed.group = item.ancestor("div.yom-rss");

			if (!feed.group) {
				// feed.group = null;
			} else {
				feed.group = feed.group.one(".hd a em").getContent();
			}

			feed.id = feed.title.toLowerCase().replace(/[^a-z]/g, "");
			feed.url = item.one(".icon-rss-small").get("href");
			feed.query = "select title, description, link, pubDate from rss where url='" + feed.url + "'";
			feed.type = "yahoo.hybrid.newsfeed";
			feed.action = "index";

			feeds[feed.id] = feed;
		});

		require("fs").writeFileSync("./feeds.json", JSON.stringify(feeds, null, 4), "utf8");

		process.exit(0);
	}
);