'use strict';

describe('Details', function() {

    var Util = require('../../lib/util.js');
    var detailsPage = require('../../pages/details-page.js');
    var searchPage = require('../../pages/search-page.js');

    var server = Util.getServer();

    var originalTimeout;
    var newTimeout = 100000;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = newTimeout;
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should load details page', function() {
        browser.get(server + '#/search?view=card&disp=default');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var firstResult = searchPage.getFirstResult();
        var name;

        firstResult.getInnerHtml().then(function(text) {
            name = text;

            firstResult.click();
            browser.waitForAngular();

            expect(detailsPage.getDocName().getInnerHtml()).toEqual(name);

            var thumbnailElement = element(by.css('.img-thumbnail'));
            expect(thumbnailElement.isDisplayed()).toBeTruthy();

            var mapElement = detailsPage.getLeafletMap();
            expect(mapElement.isDisplayed()).toBeTruthy();

            var detailsButton = detailsPage.getDetailsButton();
            expect(detailsButton.isDisplayed()).toBeTruthy();
            var detailsButton_Selected = element(by.cssContainingText('.selected', 'Details'));
            expect(detailsButton_Selected.isPresent()).toBeTruthy();

            var detailsTable = detailsPage.getDetailsTable();
            expect(detailsTable.isDisplayed()).toBeTruthy();
        });
    });


    it('should load the next result', function() {
        browser.get(server + '#/search?view=card&disp=default');
        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(1);

        var resultList = searchPage.getResults();
        var firstResult = resultList.get(0);
        var secondResult = resultList.get(1);
        var name;

        secondResult.getInnerHtml().then(function(text) {
            name = text;

            firstResult.click();
            browser.waitForAngular();

            detailsPage.gotoNextResult();
            browser.waitForAngular();

            expect(detailsPage.getDocName().getInnerHtml()).toEqual(name);
        });
    });


    it('should load the previous result', function() {
        browser.get(server + '#/search?view=card&disp=default');
        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(1);

        var resultList = searchPage.getResults();
        var firstResult = resultList.get(0);
        var secondResult = resultList.get(1);
        var name;

        firstResult.getInnerHtml().then(function(text) {
            name = text;

            secondResult.click();
            browser.waitForAngular();

            detailsPage.gotoPreviousResult()
            browser.waitForAngular();

            expect(detailsPage.getDocName().getInnerHtml()).toEqual(name);
        });
    });


    it('should load recently viewed results', function() {
        browser.get(server + '#/search?view=card&disp=default');
        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(2);

        var resultList = searchPage.getResults();
        var firstResult = resultList.get(0);
        var firstName;

        firstResult.getInnerHtml().then(function(firstText) {
            firstName = firstText;

            var secondResult = resultList.get(1);
            var secondName;

            secondResult.getInnerHtml().then(function(secondText) {
                secondName = secondText;

                firstResult.click();
                browser.waitForAngular();

                detailsPage.gotoNextResult();
                browser.waitForAngular();

                detailsPage.gotoNextResult();
                browser.waitForAngular();

                detailsPage.gotoRecentlyViewed(0);
                browser.waitForAngular();

                expect(detailsPage.getDocName().getInnerHtml()).toEqual(firstName);

                detailsPage.gotoRecentlyViewed(1);
                browser.waitForAngular();

                expect(detailsPage.getDocName().getInnerHtml()).toEqual(secondName);
            });
        });
    });


    it('should show metadata', function() {
        browser.get(server + '#/search?view=card&disp=default&fq=properties:hasMetadata');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = searchPage.getResults();
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var metadataButton = detailsPage.getMetadataButton();
        expect(metadataButton.isPresent()).toBeTruthy();

        var metadataButton_Selected = element(by.cssContainingText('.selected', 'Metadata'));
        var metadataTable = element(by.id('metadata-tab'));

        expect(metadataButton_Selected.isPresent()).toBeFalsy();
        expect(metadataTable.isDisplayed()).toBeFalsy();
        metadataButton.click();
        expect(metadataButton_Selected.isPresent()).toBeTruthy();
        expect(metadataTable.isDisplayed()).toBeTruthy();

        var detailsButton = detailsPage.getDetailsButton();
        expect(detailsButton.isDisplayed()).toBeTruthy();
        var detailsButton_Selected = element(by.cssContainingText('.selected', 'Details'));
        expect(detailsButton_Selected.isPresent()).toBeFalsy();

        var detailsTable = detailsPage.getDetailsTable();
        expect(detailsTable.isDisplayed()).toBeFalsy();

        detailsButton.click();
        expect(metadataButton_Selected.isPresent()).toBeFalsy();
        expect(metadataTable.isDisplayed()).toBeFalsy();
        expect(detailsButton_Selected.isPresent()).toBeTruthy();
        expect(detailsTable.isDisplayed()).toBeTruthy();
    });


    it('should show relationships', function() {
        browser.get(server + '#/search?disp=default&fq=linkcount__children:1&view=card');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = searchPage.getResults();
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var relationshipButton = detailsPage.getRelationshipsButton();
        expect(relationshipButton.isPresent()).toBeTruthy();

        var relationshipButton_Selected = element(by.cssContainingText('.selected', 'Relationships'));
        var relationshipTable = element(by.css('section .relationship'));

        expect(relationshipButton_Selected.isPresent()).toBeFalsy();
        expect(relationshipTable.isDisplayed()).toBeFalsy();
        relationshipButton.click();
        expect(relationshipButton_Selected.isPresent()).toBeTruthy();
        expect(relationshipTable.isDisplayed()).toBeTruthy();

        var detailsButton = detailsPage.getDetailsButton();
        expect(detailsButton.isDisplayed()).toBeTruthy();
        var detailsButton_Selected = element(by.cssContainingText('.selected', 'Details'));
        expect(detailsButton_Selected.isPresent()).toBeFalsy();

        var detailsTable = detailsPage.getDetailsTable();
        expect(detailsTable.isDisplayed()).toBeFalsy();

        detailsButton.click();
        expect(relationshipButton_Selected.isPresent()).toBeFalsy();
        expect(relationshipTable.isDisplayed()).toBeFalsy();
        expect(detailsButton_Selected.isPresent()).toBeTruthy();
        expect(detailsTable.isDisplayed()).toBeTruthy();
    });


    it('should show schema', function() {
        browser.get(server + '#/search?disp=default&fq=format:schema&view=card');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = searchPage.getResults();
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var schemaButton = detailsPage.getSchemaButton();
        expect(schemaButton.isPresent()).toBeTruthy();

        var schemaButton_Selected = element(by.cssContainingText('.selected', 'Schema'));
        var schemaTable = detailsPage.getSchemaTable();

        expect(schemaButton_Selected.isPresent()).toBeFalsy();
        expect(schemaTable.isDisplayed()).toBeFalsy();
        schemaButton.click();
        expect(schemaButton_Selected.isPresent()).toBeTruthy();
        expect(schemaTable.isDisplayed()).toBeTruthy();

        var detailsButton = detailsPage.getDetailsButton();
        expect(detailsButton.isDisplayed()).toBeTruthy();
        var detailsButton_Selected = element(by.cssContainingText('.selected', 'Details'));
        expect(detailsButton_Selected.isPresent()).toBeFalsy();

        var detailsTable = detailsPage.getDetailsTable();
        expect(detailsTable.isDisplayed()).toBeFalsy();

        detailsButton.click();
        expect(schemaButton_Selected.isPresent()).toBeFalsy();
        expect(schemaTable.isDisplayed()).toBeFalsy();
        expect(detailsButton_Selected.isPresent()).toBeTruthy();
        expect(detailsTable.isDisplayed()).toBeTruthy();
    });


    it('should add to cart and remove from cart', function() {
        browser.get(server + '#/search?view=card&disp=default');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = searchPage.getResults();
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var addToCartButton = detailsPage.getAddToCartButton();
        detailsPage.getCartTotal().then(function(data){
            var originalCartTotal = data;
            addToCartButton.click();

            detailsPage.getCartTotal().then(function(data) {
                expect(parseInt(originalCartTotal) + 1).toEqual(parseInt(data));

                var removeFromCartButton = detailsPage.getRemoveFromCartButton();
                removeFromCartButton.click();

                detailsPage.getCartTotal().then(function(data) {
                   expect(data).toEqual(originalCartTotal) ;
                });
            });
        });
    });


    it('should open the tools menu and then open the path', function() {
        browser.get(server + '#/search?fq=format:application%5C%2Fvnd.ogc.wms_layer_xml&view=card&disp=default');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = searchPage.getResults();
        var firstResult = resultList.first();
        firstResult.click();

        var toolsButton = detailsPage.getToolsButton();
        Util.waitForElement(toolsButton);

        var openButton = detailsPage.getOpenToolButton();
        $('a.flyout_trigger span.icon-tools').click();
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(openButton), 10000);
        openButton.click().then(function() {

            browser.getAllWindowHandles().then(function (handles) {
                var newWindowHandle = handles[1];
                browser.switchTo().window(newWindowHandle).then(function () {
                    expect(browser.getWindowHandle()).toBe(handles[1]);
                }).then(function() {
                    browser.close();
                }).then(function() {
                    browser.switchTo().window(handles[0]).then(function () {
                        expect(browser.getWindowHandle()).toBe(handles[0]);
                    })
                });

            });

        });
    });


    it('should open the tools menu and flag the item', function() {
        browser.get(server + '#/search?fq=format:application%2Fvnd.esri.service.layer.record&view=card&disp=default');

        Util.waitForSpinner();
        Util.waitForSpinner();

        Util.loginToVoyager('admin', 'admin');

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = searchPage.getResults();
        var firstResult = resultList.first();
        firstResult.click();

        var toolsButton = detailsPage.getToolsButton();
        Util.waitForElement(toolsButton);

        var flag = detailsPage.getFlag('protractor');
        expect(flag.isPresent()).toBe(false);

        var flagButton = detailsPage.getFlagToolButton();
        $('a.flyout_trigger span.icon-tools').click();
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(flagButton), 10000);
        detailsPage.addFlag('protractor');

        expect(flag.isPresent()).toBe(true);

        var removeFlagButton = detailsPage.getRemoveFlagToolButton();
        $('a.flyout_trigger span.icon-tools').click();
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(removeFlagButton), 10000);
        detailsPage.removeFlag();

        expect(flag.isPresent()).toBe(false);
    });
});