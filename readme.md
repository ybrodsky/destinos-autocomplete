# Instalacion

> npm install destinos-autocomplete

> Para que funcione necesita que este definida la variable `destinos_url` con la URL del endpoint.

```javascript
var myApp = angular.module('myApp', ['destinos-autocomplete']);
```

```html
<destinos-autocomplete model="uno" settings="{}"></destinos-autocomplete>
```


# Ejemplos

## Basico

```html
<destinos-autocomplete model="uno" settings="{}"></destinos-autocomplete>
```

## Valor preseleccionado

```html
<destinos-autocomplete model="uno"  selected="selected" settings="{}"></destinos-autocomplete>
```

## Solo con codigo Iata

```html
<destinos-autocomplete model="uno" settings="{iata: true}"></destinos-autocomplete>
```
## Boton limpiar

```html
<destinos-autocomplete model="uno" settings="{emptyBtn: true}"></destinos-autocomplete>
```
## Vaciar input despues de seleccionar

```html
<destinos-autocomplete model="uno" settings="{emptyAfterSelect: true}"></destinos-autocomplete>
```
## Array <small>(model tiene que ser array)</small>

```html
<destinos-autocomplete model="uno" settings="{emptyBtn: true, isArray: true}"></destinos-autocomplete>
```
## Callback al seleccionar

```html
<destinos-autocomplete model="uno" settings="{emptyBtn: true, onSelect: 'custom'}"></destinos-autocomplete>
```

## Paises

```html
<destinos-autocomplete model="uno" settings="{emptyBtn: true, destino: 'paises'}"></destinos-autocomplete>
```

## Aeropuertos

```html
<destinos-autocomplete model="uno" settings="{emptyBtn: true, destino: 'aeropuertos'}"></destinos-autocomplete>
```

## Completo

```html
<destinos-autocomplete model="uno" settings="{emptyBtn: true, destino: 'completos'}"></destinos-autocomplete>
```

## Opciones
```javascript
  {
    placeholder: 'Ingresá 3 letras y seleccioná del listado', //Placeholder del input
    emptyBtn: false,                                          //Activar o no el boton para vaciar la seleccion
    destino: 'ciudades',                                      //Tipo de busqueda: ciudades | paises | completos | aeropuertos,
    iata: false,                                              //Solo ciudades con codigo iata
    isArray: false,                                           //Guardar seleccion en array
    emptyAfterSelect: false,                                  //vaciar el input despues de seleccionar
    onSelect: null                                            //funcion callback que llama al seleccionar Ej: 'pepe' llama a $scope.pepe
  }
```
