var detailsPage = (function () {
    'use strict';

    var Util = require('../lib/util.js');

    return {

        getDocName: function() {
            return element.all(by.binding('doc.name')).first();
        },
        getLeafletMap: function () {
            return  element(by.css('.angular-leaflet-map'));
        },
        getDetailsButton: function () {
            return element(by.cssContainingText('a[ng-click*=changeTab]', 'Details'));
        },
        getDetailsTable: function() {
            return element(by.id('details-table'));
        },
        getAbsolutePath: function() {
            var pathField = element(by.cssContainingText('tr[ng-repeat*="field in displayFields"]', 'Absolute Path')).element(by.css('td')).element(by.css('div.formatted_value.ng-binding.ng-scope'));
            return pathField.getText();
        },
        getMetadataButton: function() {
            return element(by.cssContainingText('a[ng-click*=changeTab]', 'Metadata'));
        },
        getRelationshipsButton: function() {
            return element(by.cssContainingText('a[ng-click*=changeTab]', 'Relationships'));
        },
        getSchemaButton: function() {
            return element(by.cssContainingText('a[ng-click*=changeTab]', 'Schema'));
        },
        getSchemaTable: function() {
            return element(by.id('schema-table'));
        },
        getAddToCartButton: function() {
            return element(by.cssContainingText('a[ng-click*=addToCart]', 'Add to Cart'));
        },
        getRemoveFromCartButton: function() {
            return element(by.cssContainingText('a[ng-click*=removeFromCart]', 'Remove'));
        },
        getCartTotal: function () {
            return element(by.binding('vm.queueTotal')).getText();
        },
        getToolsButton: function() {
            return element(by.css('a.btn.btn-util.icon-arrow.flyout_trigger span.icon-tools'));
        },
        getOpenToolButton: function() {
            return element.all(by.cssContainingText('a', 'Open')).first();
        },
        getFlagToolButton: function() {
            return element.all(by.cssContainingText('a', 'Flag This')).first();
        },
        getRemoveFlagToolButton: function() {
            return element.all(by.cssContainingText('a', 'Remove Flag')).first();
        },
        getFlags: function() {
            return element.all(by.css('a[ng-click="searchFlag(doc.tag_flags)"]'));
        },
        getFlag: function(flag) {
            return element(by.cssContainingText('a[ng-click="searchFlag(doc.tag_flags)"]', flag))
        },
        addFlag: function(flag) {
            var flagButton = this.getFlagToolButton();
            flagButton.click();
            browser.waitForAngular();

            var flagInput = element(by.id('flagText'));
            flagInput.sendKeys(flag);
            element(by.css('[ng-click="save()"]')).click();
            browser.waitForAngular();
        },
        removeFlag: function() {
            this.getRemoveFlagToolButton().click();
            browser.waitForAngular();
        },
        gotoPreviousResult: function() {
            var previousLink = element(by.css('a[ng-click*=Previous]'));
            previousLink.click();
            browser.waitForAngular();
        },
        gotoNextResult: function() {
            var nextLink = element(by.css('a[ng-click*=Next]'));
            nextLink.click();
            browser.waitForAngular();
        },
        gotoRecentlyViewed: function(index) {
            var firstRecentlyViewedElement = element.all(by.repeater('doc in recent')).get(index).element(by.binding('doc.name'));
            firstRecentlyViewedElement.click();
            browser.waitForAngular();
        }
    };
})();  // jshint ignore:line
module.exports = detailsPage;