# 04 Manejo de imágenes

En esta demostración, vamos a incluir imágenes en nuestro proyecto de dos formas: mediante JavaScript y mediante HTML.
En el lado de JavaScript veremos que es algo sencillo (utilizando los mismos complementos que utilizamos para las fuentes), para el HTML utilizaremos un nuevo cargador: [`html-loader`](https://github.com/webpack-contrib/html-loader).

Comenzaremos por la muestra _01 Estilos / 03 SASS_.

Pasos resumidos:
 - Agrega dos imágenes a nuestro proyecto.
 - Agregar la primera imagen de JavaScript.
 - Agregue una segunda imagen de HTML.
 - Instalar [`html-loader`](https://github.com/webpack-contrib/html-loader).
 - Configurar el cargador.

# Pasos para construirlo

## Prerrequisitos

Tendrá que tener [`nodejs`](https://nodejs.org/es/) instalado en su computadora (al menos v 8.9.2). Si desea seguir los pasos de esta guía, debe tomar como punto de partida la muestra _03 SASS_.

## Pasos

- Ejecute `npm install` para instalar paquetes de muestra anteriores:

```
npm install
```
- Comencemos limpiando nuestro _[index.html](./src/index.html)_. Vamos a eliminar el componente _`jumbotron`_ de Bootstrap y agregar un elemento `<div>` con un `id` determinado:

_[./src/index.html](./src/index.html)_

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 3.x by sample</title>
  </head>
  <body>
-   <div class="jumbotron">
-     <h1>Testing Bootstrap</h1>
-     <p>
-       Bootstrap is the most popular ...
-     </p>
-   </div>
+   <div id="imgContainer"></div>
    Hello Webpack 4!
    <div class="red-background">
      RedBackground stuff
    </div>
  </body>
</html>
```

- Continuaremos creando una carpeta llamada **content** dentro de la carpeta **src** y agregando dos imágenes allí: [`logo_1.png`](./src/content/logo_1.png) y [`logo_2.png`](./src/content/logo_2.png).

- Pasemos a _`students.js`_ e importaremos [`logo_1.png`](./src/content/logo_1.png) usando JavaScript.
Luego, pongámoslo bajo el `<div>` con un `id` determinado:

_[./src/students.js](./src/students.js)_

```diff
import {getAvg} from "./averageService";
+ import logoImg from './content/logo_1.png';

$('body').css('background-color', 'lightSkyBlue');

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);

const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);

+ const img = document.createElement('img');
+ img.src = logoImg;

+ document.getElementById('imgContainer').appendChild(img);
```

- Instalemos _`url-loader`_ esto nos permitirá incluir en el paquete o dividir en un archivo separado un archivo dado
dependiendo de su tamaño y _`file-loader`_ este cargador nos permitirá administrarlo con la carpeta sin procesar.

```bash
npm install url-loader file-loader -save-dev
```

- Ahora que ya hemos instalado el plugin _`url-loader`_, solo necesitamos configurar la extensión _png/jpeg_ en su sección dentro de _[webpack.config.js](webpack.config.js)_. Una cosa para anotar es que estamos agregando un parámetro adicional al cargador de url llamado **limit**. Al utilizar este parámetro le estamos diciendo al cargador que codifique la imagen si su tamaño es inferior a 5 KB y la incruste directamente en el archivo HTML.

_[webpack.config.js](webpack.config.js)_

```diff
  module: {
    rules: [
      ...
+     {
+       test: /\.(png|jpg)$/,
+       exclude: /node_modules/,
+       loader: 'url-loader?limit=5000',
+     },      
    ],
  },
```

- A continuación, agregaremos algunos estilos para las imágenes en nuestro archivo CSS:

_[./src/mystyles.scss](./src/mystyles.scss)_

```diff
$blue-color: teal;

.red-background {
 background-color: $blue-color;
}

+ img {
+   display: block;
+   width: 200px;
+ }
```

- Y ejecutamos `npm start`. Deberíamos poder ver la imagen en el navegador.

```bash
npm start
```

- Está bien, pero ¿y si ya teníamos la imagen referenciada dentro de una etiqueta HTML <img>? Agreguemos [`logo_2.png`](./src/content/logo_2.png) en el archivo index.html:

### [./index.html](./index.html)

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 3.x by sample</title>
  </head>
  <body>
    <div id="imgContainer"></div>
    Hello Webpack 4!
+   <img src="./src/content/logo_2.png"/>
    <div class="red-background">
      RedBackground stuff
    </div>
  </body>
</html>
```

- Ahora, si ejecutamos la aplicación (`npm start`), podemos verificar que se estén mostrando las dos imágenes del logotipo.

```bash
npm start
```

- Finalmente, si abrimos las herramientas de desarrollador en nuestro navegador, podemos ver que se ha insertado un `<img>` debajo del elemento `<div>`, y también que su atributo `src` ha cambiado:

- Pero estamos haciendo referencia a [`logo_2.png`](./src/content/logo_2.png) desde la ruta `./src..`. ¿Qué pasa si cargamos a la producción? Perdemos la referencia, así que necesitamos procesar este tipo de archivos usando `html-loader`:

```bash
npm install html-loader --save-dev
```

- Y configura el cargador para los archivos _`.html`_

_[webpack.config.js](webpack.config.js)_

```diff
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=5000',
      },
+     {
+      test: /\.html$/,
+      loader: 'html-loader',
+     },      
    ],    
  },
```

- Y recuerda que el `contexto` del paquete web ha terminado`./src` así que:

_[./src/index.html](./src/index.html)_

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 3.x by sample</title>
  </head>
  <body>
    <div id="imgContainer"></div>
    Hello Webpack 4!
-   <img src="./src/content/logo_2.png" />
+   <img src="./content/logo_2.png" />
    <div class="red-background">
      RedBackground stuff
    </div>
  </body>
</html>
```

- Podemos ver ahora que la imagen se referencia automáticamente (herramientas de desarrollador F12 ...).

# Apéndice - Organizar la carpeta dist en subcarpetas

Sería posible organizar la carpeta `dist` en subcarpetas.

Para ello necesitaremos modificar el fichero _webpack.config.js_.

Tenemos que modificar el cargador para los ficheros`.png` y `.jpg` para añadir un parametro llamado **name** en el que especificaremos la subcarpeta:

_webpack.config.js_

```diff
      {
       test: /\.(png|jpg)$/,
       exclude: /node_modules/,
-      loader: 'url-loader?limit=5000',
+      use: {
+        loader: 'url-loader',
+        options: {
+          limit: 5000,
+          name: './img/[hash].[name].[ext]',
+        },
+      },
      },
```

También es posible organizar los ficheros `.js` y `.css` en sus propias subcarpetas.

En el caso de los ficheros `.js` tendremos que añadir el nombre de la subcarpeta en el párametro **filename**:

```diff
  output: {
-    filename: '[name].[chunkhash].js',
+    filename: './js/[name].[chunkhash].js',
  },
```
Para los ficheros `.css` necesitaremos modificar el parámetro **filename** en el MiniCssExtractPlugin:

```diff
new MiniCssExtractPlugin({
- filename: "[name].[chunkhash].css",
+ filename: "./css/[name].[chunkhash].css",
  chunkFilename: "[id].css"
})
```

- Es importante reemplazar la optimización de splitChunks por:

```diff
...
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
-         test: /[\\/]node_modules[\\/]$/,
+         test: /[\\/]node_modules[\\/]((?!s?css).)*$/,
          enforce: true,
        },
      },
    },
  },
...
```
