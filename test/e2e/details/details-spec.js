'use strict';

describe('Details', function() {

    var Util = require('../../lib/util.js');
    var searchPage = require('../../pages/search-page.js');

    var server = Util.getServer();

   // browser.manage().window().setSize(1280, 1024);

    it('should load details page', function() {
        browser.get(server + '#/search?view=card&disp=default');

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var firstResult = element.all(by.binding('doc[getNameToUse(doc, names)]')).first();
        var name;

        firstResult.getInnerHtml().then(function(text) {
            name = text;

            firstResult.click();
            browser.waitForAngular();

            var nameElement = element.all(by.binding('doc.name')).first();
            expect(nameElement.getInnerHtml()).toEqual(name);
        });
    });

    it('should load the next result', function() {
        browser.get(server + '#/search?view=card&disp=default');

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = element.all(by.binding('doc[getNameToUse(doc, names)]'));
        var firstResult = resultList.get(0);
        var secondResult = resultList.get(1);
        var name;

        secondResult.getInnerHtml().then(function(text) {
            name = text;

            firstResult.click();
            browser.waitForAngular();

            var nextLink = element(by.css('a[ng-click*=Next]'));
            nextLink.click();
            browser.waitForAngular();

            var nameElement = element.all(by.binding('doc.name')).first();
            expect(nameElement.getInnerHtml()).toEqual(name);
        });
    });

    /*
    it('should load search page with filter', function() {
        browser.get(server + '#/search?disp=default&fq=format_type:File');

        var selectedFilters = element.all(by.repeater('selected in filters'));
        expect(selectedFilters.count()).toEqual(1);

    });

    it('should show filters', function() {
        browser.get(server + '#/search');

        // block ui will be shown a couple times here as different ajax calls are made
        Util.waitForSpinner();
        Util.waitForSpinner();

        element(by.css('.icon-filters')).click();

        expect($('#filterContainer').isDisplayed()).toBeTruthy();

    });

    it('should show facets and select facet', function() {
        browser.get(server + '#/search');

        Util.waitForSpinner();

        var startTotal = 0;

        var total = searchPage.getTotalValue().then(function(val) {
            startTotal = val;
            return val;
        });

        expect(total).toBeGreaterThan(0);

        element(by.css('.icon-filters')).click();

        var filters = element.all(by.repeater('filter in filters'));

        var filter = filters.first().element(by.tagName('a'));
        filter.click();

        filter.getAttribute('href').then(function(href) {
            var id = href.substring(href.indexOf('#'));  //href contains the id of the facets panel
            expect($(id).isDisplayed()).toBeTruthy();
        });

        var facets = element.all(by.repeater('facet in filter.values'));

        var checkFacet = facets.first().element(by.tagName('input'));  //assumes check box style for first filter
        checkFacet.isPresent().then(function(present) {
            if(present) {checkFacet.click();}
        });

        Util.waitForSpinner();

        var linkFacet = facets.first().element(by.tagName('a'));  //assumes check box style for first filter
        linkFacet.isPresent().then(function(present) {
            if(present) {
                browser.executeScript('window.scrollTo(0,0);'); // if filters have lots of items it will scroll down so scroll back up
                linkFacet.click();
            }
        });

        var selectedFilters = element.all(by.repeater('selected in filters'));
        expect(selectedFilters.count()).toEqual(1);

        //check that the total is lower after applying filter
        searchPage.getTotalValue().then(function(val) {
            expect(val < startTotal).toBeTruthy();
        });

    });

    it('should show table view', function() {
        browser.get(server + '#/search?view=table&disp=default');

        //workaround - this test times out for some reason
        browser.sleep(10000);
        browser.waitForAngular();

        var tableColumns = element.all(by.repeater('field in tableFields'));
        expect(tableColumns.count()).toBeGreaterThan(0);

        var rows = element.all(by.repeater('doc in $data'));
        expect(rows.count()).toBeGreaterThan(0);

    });

    it('should show map view', function() {
        browser.get(server + '#/search?view=map&disp=default');

        expect(element(by.css('.alt_list_view')).isPresent()).toBeTruthy();

        var resultList = element.all(by.repeater('doc in results'));
        expect(resultList.count()).toBeGreaterThan(0);

    });

    it('should add all to queue', function() {

        searchPage.addAllToQueue('*:*');

    });
    */
});