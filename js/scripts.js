var citiesApp = angular.module('citiesApp', ['ngMaterial', 'ngMessages']);
citiesApp.controller('citiesController',function($scope, $http, $mdDialog){

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
	var infoWindow = new google.maps.InfoWindow({});
	function createMarker(city){
		var icon = 'css/pokeball.png';
		var cityLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker({
			position: cityLatlng,
			map: map,
			title: city.city,
			//sets the icon image
			icon: icon
		});
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.setContent('<h3>' + city.city + '</h3>')
			infoWindow.open(map, marker);
          	map.setZoom(8);
          	map.setCenter(marker.getPosition());
		})
		// var alertContent = "Year Rank: "+ city.yearRank + ", Year Estimate of Population: " + city.yearEstimate + ", Last Census: " + city.lastCensus ", Percent Change: " + city.change + ", Land Area sq mi/km2: " + city.landArea + "/" + city.landAreaInKm + ", Population Density sq mi/km2: " + city.lastPopDensity + "/" + city.lastPopDensityInKM + ", Lat/Lng Location: " + city.latLon;
		$scope.showAlert = function(ev, city) {
			var name = city.city +", "+ city.state;
			var alertContent = 'Year Rank: ' + city.yearRank + ", Year Estimate of Population: " + city.yearEstimate + ", Last Census: " + city.lastCensus + ", Percent Change: " + city.change + ", Land Area sq mi/km2: " + city.landArea + "/" + city.landAreaInKm + ", Population Density sq mi/km2: " + city.lastPopDensity + "/" + city.lastPopDensityInKM + ", Lat/Lng Location: " + city.latLon;
		// // Appending dialog to document.body to cover sidenav in docs app
		// // Modal dialogs should fully cover application
		// // to prevent interaction outside of dialog
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title(name)
				.textContent(alertContent)
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(ev)
			);
		console.log(name);
		};
		markers.push(marker);
	}
	$scope.triggerClick = function(yearRank){
		google.maps.event.trigger(markers[yearRank-1], 'click');

	}
	$scope.$watch('filterCities', function(newValue, oldValue){
		console.log(newValue);
	})

	$scope.message = "hello!";
	$scope.cities = cities;
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}
	$scope.updateMarkers = function(){
		for(var i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
		($scope.filteredCities);
		for(var i = 0; i < $scope.filteredCities.length; i++){
			createMarker($scope.filteredCities[i]);
		}
	}

	$scope.getDirections = function(lat, lon){
		var changeDestination = new google.maps.LatLng(lat, lon);
		console.log(changeDestination);

		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('list-window'));
		directionsService.route({
			origin: 'Atlanta, GA',
			destination: changeDestination,
			travelMode: 'DRIVING',
		}, function(response, status){
			if(status === 'OK'){
				directionsDisplay.setDirections(response);
			}else{
				window.alert('Directions request failed due to ' + status);
			}
		})
		console.log(directionsService.route.destination);
	}
});