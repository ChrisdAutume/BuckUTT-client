'use strict';

buckutt.controller('Waiter', [
	'$scope',
	'$location',
	'$timeout',
	'GetUser',
	'GetId',
	'GetGroups',
	'Device',
	'User',
	'Notifier',
	function($scope, $location, $timeout, GetUser, GetId, GetGroups, Device, User, Notifier) {
		if(!User.hasRight('waiter', Device.getDevicePoint())) {
			Notifier('Erreur', 'error', 3);
			User.logout();
			$location.path("/")
		}

		$scope.cardId = '';
		$scope.lastBuyerData = User.getLastBuyerData();
		
		$scope.autofocus = function() {
			$scope.cardIdFocus = true;
		};

		$scope.pressEnter = function() {
			var cardId = $scope.cardId.replace(/(\s+)?.$/, '');
			if(cardId != "") {
				GetId.get({
					data: cardId,
					isRemoved: false
				},
				function(res_api) {
					if(!res_api.error && res_api.data) {
						GetUser.get({
							id: res_api.data.UserId,
							isRemoved: false
						},
						function(res_api2) {
							if(!res_api2.error && res_api2.data) {
								User.setBuyer(res_api2.data);
								GetGroups.get({
									UserId: res_api2.data.id,
									now: (new Date()).toISOString(),
									isRemoved: false,
									embed: 'Period'
								},
								function(res_api3) {
									if(!res_api3.error && res_api3.data) {
										User.setBuyerGroups(res_api3.data);
										$location.path("/buy");
									} else Notifier('Erreur', 'error', 10);
								});
							}
							else Notifier('Erreur', 'error', 2, '(user)');
						});
					}
					else Notifier('Erreur', 'error', 2, '(user)');
				});
			} else Notifier('Erreur', 'error', 2, '(empty)');
			$scope.cardId = '';
		};

		$scope.askLogout = function() {
			$('#modalLogout').modal();
		};

		$scope.logout = function() {
			User.logout();
			$timeout(function() { $location.path("/"); }, 1000);
		};

		$scope.autofocus();
	}
]);
