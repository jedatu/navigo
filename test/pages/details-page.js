var detailsPage = (function () {
    'use strict';

    var Util = require('../lib/util.js');

    return {

        getDocName: function() {
            return element.all(by.binding('doc.name')).first();
        },
        getCartTotal: function () {
            return  element(by.binding('vm.queueTotal')).getText();
        }
    };
})();  // jshint ignore:line
module.exports = detailsPage;