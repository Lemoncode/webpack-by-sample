# 01 Custom CSS

Vamos a empezar trabajando con estilos.

En esta demo crearemos un fichero personalizado CSS (él contendrá una clase css simple que establecerá el color de fondo a rojo).

Empezaremos desde el ejemplo _00 Intro/05 JQuery_.

Resumen de pasos:
- Crear un fichero css personalizado.
- Instalar los paquetes del cargador de estilo y del cargador css.
- Configurar webpackconfig.

# Pasos para construirlo

## Requisitos previos

Como requisitos previos, necesitarás tener `nodejs` (al menos la versión 8.9.2) instalado en tu equipo. Si tu quieres seguir estos pasos guiados necesitarás tomar el ejemplo _00 Intro/05 JQuery_ como punto de partida.

## pasos

- Ejecuta `npm install` para instalar los paquetes del ejemplo previo:

```
npm install
```

- Ahora vamos a crear un fichero css simple que añadirá un color de fondo rojo cuando se use en algún div, por ejemplo. (lo llamaremos `mystyles.css`):

_./mystyles.css_
```css
.red-background {
 background-color: indianred;
}
```

- Y ahora podemos simplemente usar este estilo directamente en nuestro archivo HTML (hasta ahora todo bien, si ejecutamos este proyecto ahora no veremos aplicado este estilo, tenemos que pasar por alguna configuración de webpack), actualicemos `index.html`.

_./index.html_
```diff
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
+  <div class="red-background">
+   RedBackground stuff
+  </div>
</body>
</html>

```

- Comencemos instalando `style-loader` and `css-loader` como dependencias de desarrollo.
  - `css-loader` es para cargar ficheros `.css`.
  - `style-loader` es para insertar los estilos en el fichero html, para que podemos usar estos estilos.

```bash
npm install style-loader css-loader --save-dev
```

- Agreguemos este estilo a nuestro punto de entrada, primero nuestro punto de entrada tendrá más entradas, pero en este caso nosotros lo definiremos como entradas con nombre.

_webpack.config.js_

```diff
module.exports = {
-  entry: ['./students.js'],
+  entry: ['./students.js', './mystyles.css'],
  output: {
    filename: 'bundle.js',
  },
```

- Si lanzamos una compilación de webpack arrojará unos errores, eso se debe a que no hemos definido ningún cargador para manejar la extensión css. Para configurar correctamente webpack, agreguemos a la sección del cargador una entrada css y ejecutemos primero la extensión css-loader (para manejar los archivos css), luego el cargador de estilo (agregue CSS inyectando una clase de estilo).

_webpack.config.js_

```diff
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
+     {
+       test: /\.css$/,
+       exclude: /node_modules/,
+       use: [
+         {
+           loader: 'style-loader',
+         },
+         {
+           loader: 'css-loader',
+         },
+       ],
+     },      
    ],
  },
```

- Ahora podemos ejecutar la aplicación (npm start) y comprobar cómo se muestra el fondo rojo en el div que hemos elegido.

```bash
npm start
```

- Hasta ahora todo bien, si hacemos un _npm run build_ podemos verificar que myStyles.css se ha incrustado en el archivo _bundle.js_. En algunos casos, podemos preferir dividir la aplicación en varios archivos de paquetes, veamos cómo podemos cortar esto.

> Crearemos tres grupos principales: aplicación (app), estilos de aplicación (appStyles) y proveedor (vendor), para bibliotecas de terceros)

- En la sección de entrada, crearemos dos grupos:

_webpack.config.js_

```diff
module.exports = {
-  entry: ['./students.js', './mystyles.css'],
+  entry: {
+    app: './students.js',
+    appStyles: [
+      './mystyles.css',
+    ],
+    vendor: [
+      'jquery',
+    ],
+  },

  output: {
```

- En la sección de salida definiremos un patrón para los nombres de archivo de salida (chunks).

_webpack.config.json_

```diff
output: {
-   filename: 'bundle.js',
+   filename: '[name].[chunkhash].js',
},
+ optimization: {
+  splitChunks: {
+    cacheGroups: {
+      vendor: {
+        chunks: 'initial',
+        name: 'vendor',
+        test: 'vendor',
+        enforce: true,
+      },
+    }
+  },
+ },
```

> Más información sobre esto: https://webpack.js.org/plugins/split-chunks-plugin/
> https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0

- Antes de ejecutar la compilación (npm run build), vamos a asegurarnos de borrar la carpeta dist.

```bash
npm install rimraf --save-dev
```

- Agreguemos el siguiente comando a nuestro script build:

_./package.json_

```diff
  "scripts": {
    "start": "webpack-dev-server --mode development --open",
-    "build": "webpack --mode development"
+    "build": "rimraf dist && webpack --mode development"
  },
```

- Ahora si ejecutaremos una compilación

```
npm run build
```

- Nosotros podemos verificar que obtenemos tres tipos de chunks: vendor, app y appStyles.

> Este es un gran cambio comparado con webpack 3, donde tuvimos que usar el plugin commonChunks para hacer esto, ahora webpack incorpora el plugin splitChunks y automáticamente toma las decisiones por nosotros, si quieres tener más control sobre él https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693

- Ahora podemos ver que los estilos están encerrados en un archivo js, ¿y si queremos mantenerlo como un archivo css separado? Podemos hacer uso de MiniCssExtractPlugin.

```bash
npm install mini-css-extract-plugin --save-dev
```

> En el mapa de ruta de la webpack (versiones 4.x o 5), se supone que el core de webpack implementará la funcionalidad de este complemento.

- Vamos a configurar el cargador:

- Referencia el plugin.

_webpack.config.js_

```diff
var HtmlWebpackPlugin = require('html-webpack-plugin');
+ var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack');

module.exports = {
```

- Configura el cargador para la extensión _.css_

```diff
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
-        exclude: /node_modules/,
-        use: [
-          {
-            loader: 'style-loader',
-          },
-          {
-            loader: 'css-loader',
-          },
-         ],
+       use: [
+          MiniCssExtractPlugin.loader, 
+         "css-loader"
+        ]
      },
    ],
  },
```

- Finalmente, agregue el objecto del plugin para este paquete:

```diff
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
+   new MiniCssExtractPlugin({
+     filename: "[name].css",
+     chunkFilename: "[id].css"
+   }),
  ],
```

- Ejecutemos `webpack` de nuevo, se dividió en dos archivos `appStyles.js` y `appStyles.css` y ha disminuido el tamaño.

- Ahora si ejecutamos una compilación, veremos que la carpeta dist se elimina y obtenemos solo el nuevo contenido generado.

```bash
npm run build
```
