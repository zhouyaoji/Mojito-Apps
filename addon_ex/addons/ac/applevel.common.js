YUI.add('addon-ac-applevel', function(Y, NAME) {
  function AppLevelAddon(command, adapter, ac) {
  }
  AppLevelAddon.prototype = {
    // The "namespace" is where in the ActionContext
    // the user can find this addon. The namespace
    // must be the same as the first part of the addon file.
    // Thus, this addon file must be named 'cheese'.{affinity}.js'
    namespace: 'applevel',
    applify: function(obj) {
      var n;
      if (Y.Lang.isString(obj)) {
        return 'applified - ' + obj;
      }
      for (n in obj) {
        if (obj.hasOwnProperty(n)) {
          obj[n] = this.applified(obj[n]);
        }
      }
      return obj;
    }
  };
  // If this addon depends on another, that can
  // be specified here. Circular dependencies are not
  // supported or automatically detected,
  // so please be careful.
  AppLevelAddon.dependsOn = ['http'];
  Y.mojito.addons.ac.applevel = AppLevelAddon;
}, '0.0.1', {requires: ['mojito']});
