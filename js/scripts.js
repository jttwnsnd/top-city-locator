var citiesApp = angular.module('citiesApp', []);
citiesApp.controller('citiesController',function($scope, $http){

	var myLatlng = {lat: 40.0000, lng: -98.0000};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatlng
	});
	var markers = [];

	function createMarker(city){
		var cityLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker({
			position: cityLatlng,
			map: map,
			title: city.city
		});
		var infoWindow = new google.maps.InfoWindow({
			content: city.city
		});

		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.open(map, marker);
		})
		markers.push(marker);
	}
	$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index], 'click');
	}
	

	$scope.message = "hello!";
	$scope.cities = cities;
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}
});