YUI.add('transport', function(Y) {

if (!YUI.Env.Bridge) {
    YUI.Env.Bridge = new Y.BridgeBase({type:"bell", url:"ychromert://bell"});
}

Y.Bridge = YUI.Env.Bridge;


}, '@VERSION@' ,{requires:['bridge-bell']});
