# Instalacion

npm install destinos-autocomplete



> Para que funcione necesita que este definida la variable `destinos_url` con la URL del endpoint.

```javascript
	var myApp = angular.module('myApp', ['destinos-autocomplete']);
```

```html
	<destinos-autocomplete model="uno" settings="{}"></destinos-autocomplete>
```


# Ejemplos

##Basico

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{}&quot;&gt;&lt;/destinos-autocomplete&gt;
```

##Valor preseleccionado

```html
  &lt;destinos-autocomplete model=&quot;uno&quot;  selected=&quot;selected&quot; settings=&quot;{}&quot;&gt;&lt;/destinos-autocomplete&gt;
```

##Solo con codigo Iata

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{iata: true}&quot;&gt;&lt;/destinos-autocomplete&gt;
```
##Boton limpiar

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{emptyBtn: true}&quot;&gt;&lt;/destinos-autocomplete&gt;
```
##Vaciar input despues de seleccionar

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{emptyAfterSelect: true}&quot;&gt;&lt;/destinos-autocomplete&gt;
```
##Array <small>(model tiene que ser array)</small>

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{emptyBtn: true, isArray: true}&quot;&gt;&lt;/destinos-autocomplete&gt;
```
##Callback al seleccionar

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{emptyBtn: true, onSelect: 'custom'}&quot;&gt;&lt;/destinos-autocomplete&gt;
```

##Paises

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{emptyBtn: true, destino: 'paises'}&quot;&gt;&lt;/destinos-autocomplete&gt;
```

##Aeropuertos

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{emptyBtn: true, destino: 'aeropuertos'}&quot;&gt;&lt;/destinos-autocomplete&gt;
```

##Completo

```html
  &lt;destinos-autocomplete model=&quot;uno&quot; settings=&quot;{emptyBtn: true, destino: 'completos'}&quot;&gt;&lt;/destinos-autocomplete&gt;
```

##Opciones
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
