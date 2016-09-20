/*global angular*/
'use strict';

angular.module('voyager.search')
.controller('SavedSearchCtrl', function ($scope, $location, filterService, savedSearchService, authService, $analytics, recentSearchService) {

	var vm = this;

	function _loadSavedSearches() {
		vm.isAnonymous = authService.isAnonymous();

		return savedSearchService.getSavedSearches().then(function(savedSearches){
			var sortedSavedSearches = savedSearchService.sortSavedSearches(savedSearches);
			vm.savedSearches = sortedSavedSearches.global;
			vm.personalSavedSearches = sortedSavedSearches.personal;
		});
	}

	_loadSavedSearches();

	authService.addObserver(_loadSavedSearches);
	savedSearchService.addObserver(_loadSavedSearches);
	recentSearchService.addObserver(_loadSavedSearches);

	vm.applySavedSearch = function(saved) {
		savedSearchService.applySavedSearch(saved, $scope);
	};

	vm.deleteSearch = function(id) {
		savedSearchService.deleteSearch(id).then(function(){
			_loadSavedSearches();
			$analytics.eventTrack('saved-search', {
				category: 'delete'
			});
		});
	};

	vm.dragControlListeners = {
		enabled: true,
		accept: function() {
			return vm.dragControlListeners.enabled;
		},
	    orderChanged: function(eventObj) {
			var list = vm.personalSavedSearches,
				index = eventObj.dest.index,
				beforeId = null,
				afterId = null;

			if (index !== 0) {
				beforeId = list[index-1].id;
			}
			if ((index + 1) !== list.length) {
				afterId = list[index+1].id;
			}

			vm.dragControlListeners.enabled = false;

			savedSearchService.order(list[index].id, beforeId, afterId).then(function(){
				vm.dragControlListeners.enabled = true;
			});
	    }
	};

	$scope.$on('$destroy', function() {
		authService.removeObserver(_loadSavedSearches);
		savedSearchService.removeObserver(_loadSavedSearches);
		recentSearchService.removeObserver(_loadSavedSearches);
	});

	vm.criteriaMatch = function(term) {
		return function(item) {
			return angular.isUndefined(term) ? true : (item.title.toLowerCase().indexOf(term.toLowerCase()) > -1);
		};
	};
});
