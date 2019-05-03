'use strict'

angular.module('destinos-autocomplete', ['ng', 'ngResource', 'ui.bootstrap', 'Gdo'])
	.factory('ApiDestinos', function($resource) {
  	return $resource(destinos_url + '/api', {

  	}, {
			autocompleteFull: {
	      url: destinos_url + '/api/cities/autocomplete/full',
	      method: 'GET',
	      headers: {
	        ajaxLoader: false
	      },
	      withCredentials: false,
	      isArray: true
			},
  		cities: {
	      url: destinos_url + '/api/cities/autocomplete',
	      method: 'GET',
	      headers: {
	        ajaxLoader: false
	      },
	      withCredentials: false,
	      isArray: true
	    },
	    countries: {
	      url: destinos_url + '/api/countries/autocomplete',
	      method: 'GET',
	      headers: {
	        ajaxLoader: false
	      },
	      withCredentials: false,
	      isArray: true
	    },
	    airports: {
	      url: destinos_url + '/api/airports/autocomplete',
	      method: 'GET',
	      headers: {
	        ajaxLoader: false
	      },
	      withCredentials: false,
	      isArray: true
	    },
  	})
	})
	.directive('destinosAutocomplete', [ '$templateCache', function($templateCache) {
		return {
	    restrict: 'AE',
	    //replace: true,
	    scope: {
	      model: '=',
	      selected: '=?',
	      settings: '=?'
	    },
	    templateUrl: 'template.html',
	    controller: 'DestinosAutocompleteCtrl'
	  }
	}])
	.controller('DestinosAutocompleteCtrl', ['$scope', 'ApiDestinos', '$q', function($scope, ApiDestinos, $q) {
		$scope.selected = $scope.selected || '';
		$scope.model = $scope.selected;

		$scope.defaults = {
			placeholder: 'Ingresá 3 letras y seleccioná del listado',
			emptyBtn: false,
			destino: 'ciudades', // paises | regiones | completos | aeropuertos,
			iata: false,
			isArray: false,
			emptyAfterSelect: false,
			onSelect: null
		};

		$scope.defaults = angular.merge($scope.defaults, $scope.settings);

	  var promise;

	  switch($scope.defaults.destino) {
	  	case 'ciudades':
	  		$scope.getDestinos = getCiudades;
	  		break;
	  	case 'paises':
	  		$scope.getDestinos = getPaises;
	  		break;
	  	case 'completos':
	  		$scope.getDestinos = getCompletos;
	  		break;
  		case 'aeropuertos':
	  		$scope.getDestinos = getAeropuertos;
	  		break;
	  }

	  $scope.vaciar = function() {
	    $scope.model = null;
	    $scope.selected = '';
	  };

	  function getCiudades(name) {
	    return ApiDestinos.cities({
	      query: name,
	    }).$promise.then(function(res) {
				return res.filter(function(i) {
					return i.Country
				}).map(function(item) {
					return Object.assign({}, item, {
						name: item.name + ', ' + item.Country.name,
						value: item.id,
						label: item.name + ', ' + item.Country.name,
					});
				});
	    });
	  };

	  function getPaises(name) {
	    return ApiDestinos.countries({
	      query: name
	    }).$promise.then(function(res) {
	      return res.map(function(item) {
					return Object.assign({}, item, {
						value: item.id,
						label: item.name,
					});
				});
	    });
	  };

	  function getCompletos(name) {
			return ApiDestinos.autocompleteFull({
				query: name,
			}).$promise.then(function(results) {
	      return results.map(function(item) {
					return Object.assign({}, item, {
						value: item.id,
						label: item.name,
					});
				});
			});
	  };

	  function getAeropuertos(name) {
			return ApiDestinos.airports({
				query: name,
			}).$promise.then(function(res) {
				return res.map(function(item) {
					return Object.assign({}, item, {
						name: item.name + ', ' + (item.Country ? item.Country.name : item.City.name),
						value: item.id,
						label: item.name,
					});
				});
			});
	  };

	  $scope.onSelect = function(data) {
	    if(!data) return false;

	    if($scope.defaults.isArray == true) {
	      $scope.model.push(data);
	      $scope.selected = '';
	    }else {
	      if($scope.defaults.emptyAfterSelect) {
	        $scope.selected = '';
	      }
	      $scope.model = data;
	    }

	    setTimeout(function() {
	      if($scope.defaults.onSelect) {
	        $scope.$parent[$scope.defaults.onSelect](data);
	      }
	    }, 10);
	  };
	}])
	.factory('destinosHttpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
	  return {
	    request: function (config) {
	    	delete config.headers.ajaxLoader;

	      return config || $q.when(config);
	    },
	  }
  }])
  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push('destinosHttpInterceptor');
  }]);