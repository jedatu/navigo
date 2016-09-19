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

    xit('should load details page', function() {
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

            expect(detailsPage.getDocName().getInnerHtml()).toEqual(name);

            var thumbnailElement = element(by.css('.img-thumbnail'));
            expect(thumbnailElement.isDisplayed()).toBeTruthy();

            var mapElement = element(by.css('.angular-leaflet-map'));
            expect(mapElement.isDisplayed()).toBeTruthy();

            var detailsButton = element(by.cssContainingText('a[ng-click*=changeTab]', 'Details'));
            expect(detailsButton.isDisplayed()).toBeTruthy();
            var detailsButton_Selected = element(by.cssContainingText('.selected', 'Details'));
            expect(detailsButton_Selected.isPresent()).toBeTruthy();

            var detailsTable = element(by.id('details-table'));
            expect(detailsTable.isDisplayed()).toBeTruthy();
        });
    });


    xit('should load the next result', function() {
        browser.get(server + '#/search?view=card&disp=default');
        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(1);

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

            expect(detailsPage.getDocName().getInnerHtml()).toEqual(name);
        });
    });


    xit('should load the previous result', function() {
        browser.get(server + '#/search?view=card&disp=default');
        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(1);

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

            expect(detailsPage.getDocName().getInnerHtml()).toEqual(name);
        });
    });


    xit('should load recently viewed results', function() {
        browser.get(server + '#/search?view=card&disp=default');
        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(2);

        var resultList = element.all(by.binding('doc[getNameToUse(doc, names)]'));
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

                var nextLink = element(by.css('a[ng-click*=Next]'));
                nextLink.click();
                browser.waitForAngular();

                nextLink.click();
                browser.waitForAngular();
                var firstRecentlyViewedElement = element.all(by.repeater('doc in recent')).get(0).element(by.binding('doc.name'));
                firstRecentlyViewedElement.click();
                browser.waitForAngular();

                expect(detailsPage.getDocName().getInnerHtml()).toEqual(firstName);

                var secondRecentlyViewedElement = element.all(by.repeater('doc in recent')).get(1).element(by.binding('doc.name'));
                secondRecentlyViewedElement.click();
                browser.waitForAngular();

                expect(detailsPage.getDocName().getInnerHtml()).toEqual(secondName);
            });
        });
    });


    xit('should show metadata', function() {
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
        expect(metadataButton.isPresent()).toBeTruthy();

        var metadataButton_Selected = element(by.cssContainingText('.selected', 'Metadata'));
        var metadataTable = element(by.id('metadata-tab'));

        expect(metadataButton_Selected.isPresent()).toBeFalsy();
        expect(metadataTable.isDisplayed()).toBeFalsy();
        metadataButton.click();
        expect(metadataButton_Selected.isPresent()).toBeTruthy();
        expect(metadataTable.isDisplayed()).toBeTruthy();

        var detailsButton = element(by.cssContainingText('a[ng-click*=changeTab]', 'Details'));
        expect(detailsButton.isDisplayed()).toBeTruthy();
        var detailsButton_Selected = element(by.cssContainingText('.selected', 'Details'));
        expect(detailsButton_Selected.isPresent()).toBeFalsy();

        var detailsTable = element(by.id('details-table'));
        expect(detailsTable.isDisplayed()).toBeFalsy();

        detailsButton.click();
        expect(metadataButton_Selected.isPresent()).toBeFalsy();
        expect(metadataTable.isDisplayed()).toBeFalsy();
        expect(detailsButton_Selected.isPresent()).toBeTruthy();
        expect(detailsTable.isDisplayed()).toBeTruthy();
    });


    xit('should show relationships', function() {
        browser.get(server + '#/search?disp=default&fq=linkcount__children:1&view=card');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = element.all(by.binding('doc[getNameToUse(doc, names)]'));
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var relationshipButton = element(by.cssContainingText('a[ng-click*=changeTab]', 'Relationships'));
        expect(relationshipButton.isPresent()).toBeTruthy();

        var relationshipButton_Selected = element(by.cssContainingText('.selected', 'Relationships'));
        var relationshipTable = element(by.css('section .relationship'));

        expect(relationshipButton_Selected.isPresent()).toBeFalsy();
        expect(relationshipTable.isDisplayed()).toBeFalsy();
        relationshipButton.click();
        expect(relationshipButton_Selected.isPresent()).toBeTruthy();
        expect(relationshipTable.isDisplayed()).toBeTruthy();

        var detailsButton = element(by.cssContainingText('a[ng-click*=changeTab]', 'Details'));
        expect(detailsButton.isDisplayed()).toBeTruthy();
        var detailsButton_Selected = element(by.cssContainingText('.selected', 'Details'));
        expect(detailsButton_Selected.isPresent()).toBeFalsy();

        var detailsTable = element(by.id('details-table'));
        expect(detailsTable.isDisplayed()).toBeFalsy();

        detailsButton.click();
        expect(relationshipButton_Selected.isPresent()).toBeFalsy();
        expect(relationshipTable.isDisplayed()).toBeFalsy();
        expect(detailsButton_Selected.isPresent()).toBeTruthy();
        expect(detailsTable.isDisplayed()).toBeTruthy();
    });


    xit('should show schema', function() {
        browser.get(server + '#/search?disp=default&fq=format:schema&view=card');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = element.all(by.binding('doc[getNameToUse(doc, names)]'));
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var schemaButton = element(by.cssContainingText('a[ng-click*=changeTab]', 'Schema'));
        expect(schemaButton.isPresent()).toBeTruthy();

        var schemaButton_Selected = element(by.cssContainingText('.selected', 'Schema'));
        var schemaTable = element(by.id('schema-table'));

        expect(schemaButton_Selected.isPresent()).toBeFalsy();
        expect(schemaTable.isDisplayed()).toBeFalsy();
        schemaButton.click();
        expect(schemaButton_Selected.isPresent()).toBeTruthy();
        expect(schemaTable.isDisplayed()).toBeTruthy();

        var detailsButton = element(by.cssContainingText('a[ng-click*=changeTab]', 'Details'));
        expect(detailsButton.isDisplayed()).toBeTruthy();
        var detailsButton_Selected = element(by.cssContainingText('.selected', 'Details'));
        expect(detailsButton_Selected.isPresent()).toBeFalsy();

        var detailsTable = element(by.id('details-table'));
        expect(detailsTable.isDisplayed()).toBeFalsy();

        detailsButton.click();
        expect(schemaButton_Selected.isPresent()).toBeFalsy();
        expect(schemaTable.isDisplayed()).toBeFalsy();
        expect(detailsButton_Selected.isPresent()).toBeTruthy();
        expect(detailsTable.isDisplayed()).toBeTruthy();
    });


    xit('should add to cart and remove from cart', function() {
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


    it('should open the tools menu and then open the path', function() {
        browser.get(server + '#/search?fq=format:application%5C%2Fvnd.ogc.wms_layer_xml&view=card&disp=default');

        Util.waitForSpinner();
        Util.waitForSpinner();

        var totalAnchor = searchPage.getTotalLink();

        expect(searchPage.getTotalValue()).toBeGreaterThan(0);

        var resultList = element.all(by.binding('doc[getNameToUse(doc, names)]'));
        var firstResult = resultList.first();
        firstResult.click();
        browser.waitForAngular();

        var pathField = element(by.cssContainingText('tr[ng-repeat*="field in displayFields"]', 'Absolute Path')).element(by.css('td')).element(by.css('div.formatted_value.ng-binding.ng-scope'));
        pathField.getText().then(function(data) {
            var pathData = data;

            var openButton = element.all(by.cssContainingText('a', 'Open')).first();
            $('a.flyout_trigger span.icon-tools').click();
            browser.wait(protractor.ExpectedConditions.elementToBeClickable(openButton), 10000);
            openButton.click().then(function() {

                browser.getAllWindowHandles().then(function (handles) {
                    var newWindowHandle = handles[1];
                    browser.switchTo().window(newWindowHandle).then(function () {
                        expect(browser.getWindowHandle()).toBe(handles[1]);
                        //expect(browser.driver.getCurrentUrl()).toBe(pathData);
                    });

                });

            });
        });
    });
});