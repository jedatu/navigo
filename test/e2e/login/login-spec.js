'use strict';

describe('Login', function() {

    var util = require('../../lib/util.js');
    var searchPage = require('../../pages/search-page.js');
    var server = util.getServer();

    function login() {
        browser.get(server + '#/search');

        util.loginToVoyager('admin', 'admin');
        //util.waitForUser();

        expect(searchPage.getUser().getText()).toBe('admin');
    }

    it('should login', function() {

        login();

    });

    it('should be authenticated with token', function() {

        login();

    });

});