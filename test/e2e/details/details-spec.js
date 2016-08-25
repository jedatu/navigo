'use strict';

describe('Details', function() {

    var Util = require('../../lib/util.js');
    var detailsPage = require('../../pages/details-page.js');
    var searchPage = require('../../pages/search-page.js');

    var server = Util.getServer();

    it('should load details page', function() {
        browser.get(server + '#/search?view=card&disp=default');
        Util.waitForSpinner();
        Util.waitForSpinner();

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
        Util.waitForSpinner();
        Util.waitForSpinner();

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


    it('should load the previous result', function() {
        browser.get(server + '#/search?view=card&disp=default');
        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = element.all(by.binding('doc[getNameToUse(doc, names)]'));
        var firstResult = resultList.get(0);
        var secondResult = resultList.get(1);
        var name;

        firstResult.getInnerHtml().then(function(text) {
            name = text;

            secondResult.click();
            browser.waitForAngular();

            var previousLink = element(by.css('a[ng-click*=Previous]'));
            previousLink.click();
            browser.waitForAngular();

            var nameElement = element.all(by.binding('doc.name')).first();
            expect(nameElement.getInnerHtml()).toEqual(name);
        });
    });


    it('should show metadata', function() {
        browser.get(server + '#/search?view=card&disp=default&fq=properties:hasMetadata');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = element.all(by.binding('doc[getNameToUse(doc, names)]'));
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var metadataButton = element(by.cssContainingText('a[ng-click*=changeTab]', 'Metadata'));
        var metadataTable = element(by.id('metadata-tab'));

        expect(metadataTable.isDisplayed()).toBeFalsy();
        metadataButton.click();
        expect(metadataTable.isDisplayed()).toBeTruthy();
    });


    it('should add to cart and remove from cart', function() {
        browser.get(server + '#/search?view=card&disp=default');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = element.all(by.binding('doc[getNameToUse(doc, names)]'));
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var addToCartButton = element(by.cssContainingText('a[ng-click*=addToCart]', 'Add to Cart'));
        detailsPage.getCartTotal().then(function(data){
            var originalCartTotal = data;
            addToCartButton.click();

            detailsPage.getCartTotal().then(function(data) {
                expect(parseInt(originalCartTotal) + 1).toEqual(parseInt(data));

                var removeFromCartButton = element(by.cssContainingText('a[ng-click*=removeFromCart]', 'Remove'));
                removeFromCartButton.click();

                detailsPage.getCartTotal().then(function(data) {
                   expect(data).toEqual(originalCartTotal) ;
                });
            });
        });
    });
});