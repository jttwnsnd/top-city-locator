var citiesApp = angular.module('citiesApp', ['ngMaterial']);
citiesApp.controller('citiesController',function($scope, $http){

	var myLatlng = {lat: 40.0000, lng: -98.0000};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatlng
	});
	var reset = document.getElementById('reset')
	var markers = [];
	google.maps.event.addListener(reset, 'click', function(){
          	map.setZoom(4);
          	map.setCenter(myLatlng);
		});
	$scope.resetZoom = function(){
		console.log('hello');
		google.maps.event.trigger(reset, 'click');
	}
	function createMarker(city){
		var cityLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker({
			position: cityLatlng,
			map: map,
			title: city.city
		});
		console.log(marker);
		var infoWindow = new google.maps.InfoWindow({
			content: city.city
		});

		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.open(map, marker);
          	map.setZoom(8);
          	map.setCenter(marker.getPosition());
		})
		markers.push(marker);
		$scope.moreInfo = function(){
			console.log('hello');
		}
	}
	$scope.triggerClick = function(yearRank){
		google.maps.event.trigger(markers[yearRank-1], 'click');

	}
	

	$scope.message = "hello!";
	$scope.cities = cities;
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}
});