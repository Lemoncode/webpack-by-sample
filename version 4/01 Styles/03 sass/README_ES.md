# 03 SASS

En esta demo renombramos nuestros ficheros css a extensión scss y añadiremos una variable SASS simple. Aprenderemos como añadir un loader que puede hacer el preprocesamiento SASS y encadenarlo a nuestro css / pipe de stilo.

Partiremos del ejemplo _01 Styles/02 Twitter Bootstrap_.

Resumen de pasos:
 - Renombrar `mystyles.css` a scss.
 - Añadir algo de código SASS específico.
 - Instalar un cargador preprocesador de .
 - Añadir este preprocesador(actualizar `webpack.config.js`).

# Pasos para construirlo

## Prerequisitps

Requisitos previos, necesitará tener _nodejs_ (al menos v 8.9.2) instalado en su computadora. Si desea seguir estas guías de pasos, deberá tomar como punto de partida la muestra _02 Twitter Bootstrap_.

## pasos

- `npm install` para instalar los paquetes de muestra anteriores:

```bash
npm install
```


- Comencemos renombrando `mystyles.css` a `mystyles.scss`

- Abramos `mystyles.scss` y añadamos algo de código sass simple (en este caso crearemos una varable que contendrá un fondo azul, estó provocará un pequeño cambio en nuestra app de ejemplo, se mostrará un fondo azul en lugar del antiguo rojo):

### ./mystyles.scss
```diff
+ $blue-color: teal;

.red-background {
- background-color: indianred;
+ background-color: $blue-color;
}

```
- Una vez hayamos cambiado la extensión de nuestro fichero css a scss, tenemos que actualizar el fichero `webpack.config.js`.

### ./webpack.config.js
```diff
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

+ var path = require('path');

+ var basePath = __dirname;

//...

module.exports = {
  entry: {
    app: './students.js',
    appStyles: [
-     './mystyles.css',
+     './mystyles.scss',
    ],
    ...
  },
  ...
};
```

- Ahora es el momento de empezar con la fontanería de webpack. Instalemos un [sass-loader](https://github.com/webpack-contrib/sass-loader) que requiere [node-sass](https://github.com/sass/node-sass) como dependencia:

```bash
npm install sass-loader node-sass --save-dev
```

- Solo nos falta un paso más. Abrir nuestro `webpack.config.js` y añadir una nueva entrada (scss) para los cargadores que utilizarán sass-loader que acabamos de instalar. Interesante para apuntar: estamos encadenando cargadores, primero preprocesamos el scss, después aplicamos el cargador anterior al css resultantes.

- Importante aquí, necesitamos separarlo en dos cargadores, el primero utiliza `sass-loader` para appStyles y el segundo utiliza la configuración previa para vendorStyles:


```diff
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
+      {
+        test: /\.scss$/,
+        use: [
+          MiniCssExtractPlugin.loader,
+          "css-loader",
+          "sass-loader",
+        ]
+      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
```

- Si ejecutamos la app (`npm start`), podemos comprobar que ahora tenemos un fondo azul en lugar del rojo.

```bash
npm start
```
- Hasta aqui todo bien, es hora de refactorizar un poco nuestra solución para hacerla más mantenible.

- Para mantener mantenible nuestro código fuentes, vamos a crear una carpeta `src`  y mover los siguientes ficheros dentro de ella:
  - Mover a `./src/averageService.js`.
  - Mover a `./src/index.html`.
  - Mover a `./src/mystyles.scss`.
  - Mover a `./src/students.js`.

- Después de esto, debemos modificar la ruta de nuestro fichero _webpack.config.js_ , para que podeamos encontrar estos ficheros.

```diff
module.exports = {
+ context: path.join(basePath, 'src'),  
  entry: {
    app: './students.js',
    appStyles: [
      './mystyles.scss',
    ],
    vendor: [
      'jquery',
    ],
    vendorStyles: [
-     './node_modules/bootstrap/dist/css/bootstrap.css',
+     '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
```

- Comprobemos que la app todavía funciona después de esta refactorización de la estructura de carpetas.

```bash
npm start
```
- ¡Lo hicimos!


