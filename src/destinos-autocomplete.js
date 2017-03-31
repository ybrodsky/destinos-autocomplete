'use strict'

angular.module('destinos-autocomplete', ['ng', 'ngResource', 'ui.bootstrap', 'Gdo'])
	.factory('ApiDestinos', function($resource) {
  	return $resource(destinos_url + '/api', {

  	}, {
  		ciudades: {
	      url: destinos_url + '/api/cities',
	      method: 'GET',
	      headers: {
	        ajaxLoader: false
	      },
	      withCredentials: false,
	      isArray: true
	    },
	    regiones: {
	      url: destinos_url + '/api/regions',
	      method: 'GET',
	      headers: {
	        ajaxLoader: false
	      },
	      withCredentials: false,
	      isArray: true
	    },
	    paises: {
	      url: destinos_url + '/api/countries',
	      method: 'GET',
	      headers: {
	        ajaxLoader: false
	      },
	      withCredentials: false,
	      isArray: true
	    },
	    aeropuertos: {
	      url: destinos_url + '/api/aeropuertos',
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
	    var where = {
	      '$or': [{'name': {'$like': '%' + name + '%'}}, {'code': name}]
	    };
	    if($scope.defaults.iata) {
	      where.code = {'$ne': ''};
	    }

	    return ApiDestinos.ciudades({
	      where: where,
	      include: JSON.stringify([{model: "Country", attributes: ['name', 'region_id']}])
	    }).$promise.then(function(res) {
	      return res.map(function(item) {
	      	if(!item.Country) return;

	        return {
	          label: item.name + ', ' + item.Country.name,
	          value: item.id,
	          pais: item.country_id || null,
	          region: item.Country.region_id || null,
	          code: item.code || null,
	          hoteldo: item.hdo_code || null,
	          tourico: item.tourico_code || null,
	          hotelbeds: item.hotelbeds_code || null,
	          infinitas: item.infinitas_code || null,
	          lat: item.lat || null,
	          lon: item.lon || null,
	          esCiudad: true
	        };
	      });
	    });
	  };

	  function getPaises(name) {
	    return ApiDestinos.paises({
	      attributes: JSON.stringify(['id', 'name', 'code']),
	      where: {'$or': [{'name': {'$like': '%' + name + '%'}}, {'code': name}]}
	    }).$promise.then(function(res) {
	      return res.map(function(item) {
	        return {
	          label: item.name,
	          value: item.id,
	          esPais: true
	        };
	      });
	    });
	  };

	  function getCompletos(name) {
	    return $q.all([
	      ApiDestinos.regiones({
	        attributes: JSON.stringify(['id', 'name', 'code']),
	        where: {'$or': [{'name': {'$like': '%' + name + '%'}}, {'code': name}]}
	      }).$promise,
	      ApiDestinos.paises({
	        attributes: JSON.stringify(['id', 'name', 'region_id', 'code']),
	        where: {'$or': [{'name': {'$like': '%' + name + '%'}}, {'code': name}]}
	      }).$promise,
	      ApiDestinos.ciudades({
	        where: {'$or': [{'name': {'$like': '%' + name + '%'}}, {'code': name}]},
	        include: JSON.stringify([{model: "Country", attributes: ['name']}])
	      }).$promise
	    ]).then(function(results) {
	      var data = [];
	      results.forEach(function(result) {
	        data = data.concat(result);
	      });
	      return data.map(function(item) {
	        return {
	          label: item.name + (item.Country ? ', ' + item.Country.name : ''),
	          value: item.id,
	          country_id: item.country_id || null,
	          region_id: item.region_id || null,
	          pais: item.country_id || null,
	          esCiudad: item.country_id ? true : false,
	          esPais: item.country_id ? false : true
	        };
	      });
	    });
	  };

	  function getAeropuertos(name) {
	    return $q.all([
	      ApiDestinos.ciudades({
	        where: {'$or': [{'name': {'$like': '%' + name + '%'}}, {'code': name}]},
	        include: JSON.stringify([{model: "Country", attributes: ['name']}])
	      }).$promise,
	      ApiDestinos.aeropuertos({
	        where: {'$or': [{'name': {'$like': '%' + name + '%'}}, {'code': name}]},
	        include: JSON.stringify([{model: "City", attributes: ['name']}])
	      }).$promise
	    ]).then(function(results) {
	      var data = [];
	      results.forEach(function(result) {
	        data = data.concat(result);
	      });
	      return data.map(function(item) {
	        return {
	          label: item.name + ', ' + (item.Country ? item.Country.name : item.City.name),
	          value: item.id,
	          code: item.code,
	          esAeropuerto: item.country_id ? false : true,
	          esCiudad: item.country_id ? true : false
	        };
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
	.factory('httpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
	  return {
	    request: function (config) {
	    	delete config.headers.ajaxLoader;

	      return config || $q.when(config);
	    },
	  }
  }])
  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }]);