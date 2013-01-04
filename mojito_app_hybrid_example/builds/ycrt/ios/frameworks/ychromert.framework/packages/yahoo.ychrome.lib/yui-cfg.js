YUI.applyConfig({
    filter: ((window.location.search.match(/[?&]debug=([^&]+)/) || [])[1]) ? "debug" : "min",

    aliases : {
        "bridge" : ["transport"]
    },

    groups : {
        ychromelib : {
            base: "/yahoo.ychrome.lib/",
            modules : {
                "transport" : {
                    requires: ["bridge-bell"]
                }
            }
        }
    }
});
