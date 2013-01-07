YUI.add('addon-ac-mojitlevel', function(Y, NAME) {
  function MojitLevelAddon(command, adapter, ac) {
  }
  MojitLevelAddon.prototype = {
    // The "namespace" is where in the ActionContext
    // the user can find this addon. The namespace
    // must be the same as the first part of the addon file.
    // Thus, this addon file must be named 'cheese'.{affinity}.js'
    namespace: 'mojitlevel',
    mojify: function(obj) {
      var n;
      if (Y.Lang.isString(obj)) {
        return 'mojitized - ' + obj;
      }
      for (n in obj) {
        if (obj.hasOwnProperty(n)) {
          obj[n] = this.mojify(obj[n]);
        }
      }
      return obj;
    }
  };
  // If this addon depends on another, that can
  // be specified here. Circular dependencies are not
  // supported or automatically detected,
  // so please be careful.
  MojitLevelAddon.dependsOn = ['http'];
  Y.mojito.addons.ac.mojitlevel = MojitLevelAddon;
}, '0.0.1', {requires: ['mojito']});
