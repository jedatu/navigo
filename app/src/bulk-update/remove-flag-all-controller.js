'use strict';

angular.module('voyager.search')
    .controller('RemoveAllFlagsCtrl', function ($scope, $uibModalInstance, tagService, resultData, $timeout, usSpinnerService, config, $controller) {

        $controller('BaseUpdateCtrl', { $scope: $scope, resultTotalCount: resultData.totalItemCount , $uibModalInstance: $uibModalInstance});

        $scope.doSaveAll = function() {
            tagService.removeBulkField('tag_flags').then($scope.handleResponse);
        };

    });
