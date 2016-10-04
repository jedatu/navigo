var HtmlReporter = require('protractor-html-screenshot-reporter');

var reporter= new HtmlReporter({
    baseDirectory: './reports/protractor', // a location to store screen shots.
    docTitle: 'Navigo Reporter',
    docName:    'navigo-reports.html'
});

exports.config = {

    //seleniumAddress: 'http://localhost:4444/wd/hub',
	
	//directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ['--lang=en',
                '--window-size=1080,1920'
            ]
        }
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['test/e2e/details/*'],

    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        includeStackTrace: true,
        isVerbose: true
    },

    allScriptsTimeout: 50000,

    verbose:true,

    debug:true
};