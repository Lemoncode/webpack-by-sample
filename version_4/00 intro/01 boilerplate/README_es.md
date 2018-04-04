# 01 Boilerplate

En este ejemplo, vamos a configurar un proyecto que se puede administrar fácilmente por webpack.

Configuraremos un proyecto npm, dando soporte a ES6, e instalaremos webpack.
Después crearemos un archivo `helloworld.js` de ejemplo.

Resumen:
 - Prerrequisitos: Instalar Node.js
 - Inicializar `package.json` (npm init)
 - Crear un archivo HTML básico.

# Pasos para construirlo

## Prerequisitos

Instala [Node.js and npm](https://nodejs.org/en/) (min v8.9) si aún no lo tienes instalado en tu ordenador.

> Verifica que estás utilizando al menos la versión de node v8.x.x y npm 5.x.x para ello ejecuta `node -v` y `npm -v` en un terminal/consola de Windows. OLas versiones anteriores pueden generar errores.

## Pasos

- Navega a la carpeta donde vas a crear el proyecto vacío.

- Ejecuta `npm init`, tendrás que responder a algunas preguntas sobre la información del proyecto (una vez lo rellenes de forma correcta se generará un archivo **`package.json`**).

```
npm init -y
```

> Al usar "y" estamos de acuerdo en utilizar los valores por defecto que solicita init (ten cuidado si tu carpeta tiene el nombre con mayúsculas o espacios en blanco, ya que es probable que de error.

- Instala **webpack** y **webpack-cli** localmente, como una dependencia de desarrollo (la razón para instalarlo de manera local y no global es para hacerlo fácil de configurar, ya que por ejemplo se puede inicializar en un equipo limpio sin tener nada instalado de forma global).

```
npm install webpack webpack-cli --save-dev
```

- Para ejecutar webpack, modifica el fichero **`package.json`** y agrega la siguiente propiedad `"start": "webpack"` debajo del objeto scripts. Esto nos permite lanzar el paquete web desde la línea de comandos a través de npm escribiendo `npm start`.

> En webpack 4 ahora es obligatori indicar en que entorno estamos trabajando, es decir si se trata de desarrollo o producción(minificado, etc.) en esa línea de comando es donde lo llamaremos.

 Ahora, nuestro **`package.json`** debería tener el siguiente aspecto:

### ./package.json
```diff
{
  "name": "boilerplate",
  "version": "1.0.0",
  "description": "Front End Lemoncode Master, Bundle Modules, Webpack Demo 00 Boilerplate",
  "main": "index.js",
  "scripts": {
+   "start": "webpack --mode development"
-   "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Lemoncode/webpack-3.x-by-sample.git"
  },
  "author": "Lemoncode",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Lemoncode/webpack-3.x-by-sample/issues"
  },
  "homepage": "https://github.com/Lemoncode/webpack-3.x-by-sample#readme",
  "devDependencies": {
    "webpack": "^4.0.1"
  }
}
```

> Webpack 4 ofrece un punto de entrada de configuración cero, es decir: si no vas a transpilar tu código y tienes un punto de entrada predeterminado en _./src/index.js_ funcionará de manera predeterminada. Esto es muy bueno para tener un código de ejemplo funcionando de manera muy rápida, pero en un proyecto real no es suficiente, por ello en este ejemplo iremos por un camino más largo (crear y cnfigurar el webpack.config.js).

- Escribimos código es6 pero tenemos que transpilarlo a es5, para ello instalamos `babel-core` junto a `babel-preset-env` y lo guardamos como dependencias de desarrollo en el fichero **`package.json`** que previamente se ha generado.

```bash
npm install babel-core --save-dev
npm install babel-preset-env --save-dev
```

- Necesitamos instalar un "loader" (más información sobre esto en los siguientes módulos) para que los paquetes de webpack puedan hacer uso del transpilador `babel-core`.

```bash
npm install babel-loader --save-dev
```

Nuestro archivo **`package.json`** debería mostrarse así:

### ./package.json
```diff
{
  "name": "boilerplate",
  "version": "1.0.0",
  "description": "In this sample we are going to setup a web project that can be easily managed by webpack.",
  "main": "index.js",
  "scripts": {
    "start": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
+    "babel-core": "^6.26.0",
+    "babel-loader": "^7.1.3",
+    "babel-preset-env": "^1.6.1",
+    "webpack": "^4.0.1"
  }
}
```

- Ahora crea un archivo JS llamado **`students.js`** que tenga sintaxis ES6.

### ./students.js
```javascript
// Let's use some ES6 features
const averageScore = "90";
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```

- Ahora, es el momento de añadir babel y configurarlo:

### ./.babelrc
```javascript
{
  "presets": [
    "env"
  ]
}
```

- Podemos continuar con la configuración de weboack. Crea un archivo vacío llamado **`webpack.config.js`**, e indica el punto de entrada del JS.

### ./webpack.config.js
```javascript
module.exports = {
  entry: ['./students.js'],
  output: {
    filename: 'bundle.js',
  },
};

```

- Ahora agrege soporte para ES6, le pediremos a webpack que maneje todos los archivos js que hay en la carpeta del proyecto (excluyendo la subcarpeta `node_modules` ) y que los transpile de es6a es5 (usando `babel-loader`).

```diff
module.exports = {
  entry: ['./students.js'],
  output: {
    filename: 'bundle.js',
  },
+ module: {
+   rules: [
+     {
+       test: /\.js$/,
+       exclude: /node_modules/,
+       loader: 'babel-loader',
+     },
+   ],
+ },
};
```

- Vamos a ejecutar webpack desde la línea de comandos, tecleamos `npm start` y presionamos enter.

```
npm start
```

- Podemos verificar que se haya generado un archivo llamado **`bundle.js`**.

- Si abrimos el archivo **`bundle.js`** podemos verificar que contiene (entre otro código) la transpilación a ES5 de **`students.js`**.

### ./bundle.js
```javascript
...
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Let's use some ES6 features
var averageScore = "90";
var messageToDisplay = "average score " + averageScore;

document.write(messageToDisplay);
...
```

- Crea ahora un archivo HTML simple, **`index.html`**, e incluye la etiqueta de script que llamará a nuestro archivo **`bundle.js`**.

### ./index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 4.x by sample</title>
  </head>
  <body>
    Hello Webpack 4!
    <script src="./dist/bundle.js"></script>
  </body>
</html>

```
- Ahora podemos hacer click en el archivo html y ver nuestro pequeño código en funcionamiento.
