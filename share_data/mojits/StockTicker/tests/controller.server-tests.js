
YUI.add('StockTicker-tests', function(Y) {

    var suite = new YUITest.TestSuite('StockTicker-tests'),
        controller = null,
        A = YUITest.Assert,
        OA = YUITest.ObjectAssert;
    
    suite.add(new YUITest.TestCase({
        
        name: 'StockTicker user tests',
        
        setUp: function() {
            controller = Y.mojito.controllers.StockTicker;
        },
        tearDown: function() {
            controller = null;
        },
        
        'test mojit': function() {
            var ac, expected, results;
            A.isNotNull(controller);
            A.isFunction(controller.index);
            ac = {
                models: {
                    get: function(modelName) {
                        A.areEqual('StockTickerModelFoo', modelName, 'wrong model name');
                        return {
                            getData: function(cb) {
                                cb(null, 'Congrats!');
                            }
                        }
                    }
                },
                assets: {
                    addCss: function(css) {

                    }
                },
                done: function(data) {
                    results = data;
                }
            };
            controller.index(ac);
            expected = {
                data: 'Congrats!',
                status: 'Mojito is working.'
            };
            OA.areEqual(expected, results);
        }
        
    }));
    
    YUITest.TestRunner.add(suite);
    
}, '0.0.1', {requires: ['mojito-test', 'StockTicker']});
