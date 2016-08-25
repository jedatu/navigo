var detailsPage = (function () {
    'use strict';

    var Util = require('../lib/util.js');

    return {

        getCartTotal: function () {
            return  element(by.binding('vm.queueTotal')).getText()
        }
    };
})();  // jshint ignore:line
module.exports = detailsPage;