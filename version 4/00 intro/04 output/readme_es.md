# 04 OUTPUT

En este ejemplo vamos a usar la configuración por defecto de webpack y copiar nuestro HTMLa es ruta de distribución.

> Hay que tener en cuenta que webpack usa por defecto la carpeta dist como configuración predeterminada.

Empezaremos desde el ejemplo _00 Intro/02 Server_,

Pasos:
   - Redireccionar la salida (`bundle.js`) a la carpeta "dist".
   - Incluir en el proceso de compilación: copiar el fichero `index.html` a la carpeta "dist"
    - Dejar que webpack incluya el script `bundle.js` en el fichero index.html
    - Añadir compatibilidad para permitir que los ficheros ES6 se depuren directamente en el navegador.
    - Generar una version simplificada de `bundle.js`

## PREREQUISITOS

Necesitarás tener instalado nodejs en tu ordenador (al menos 8.9.2). Si quieres seguir esta guía paso a paso necesitarás empezar por el ejemplo _00 Intro/03 Server_

## pasos

- `npm install` instala previamente los paquetes de ejemplo:

```bash
npm install
```

- Si ejecutamos npm, veremos que automáticamente el bundle generado es copiado en la carpeta _dist_

```bash
npm start
```

- Está bien, pero también necesitamos copiar el HTML a la carpeta dist, y ... ¿No estaría bien que webpack inyectase automáticamente el script del bundle dentro de la copia del fichero HTNL? Hay un plugin que hace eto para ti _html-webpack-plugin_ , vamos a instalarlo.

```bash
npm install html-webpack-plugin --d
```

- Vamos a eliminar de nuestro index.html el script:

_./index.html_
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
    Hello Webpack 3!
-   <script src="bundle.js"></script>
  </body>
</html>

```

- Este plugin (html-webpack-plugin) cogerá como entrada nuestra plantilla `index.html`, y marcaremos un destino como salida (`index.html` debajo de la carpeta dist). Este plugin copiará el `index.html` dentro del destino e inyectará la etiqueta del script, incluyendo una etiqueta hash, para evitar almacenar la caché cuando se implementen nuevs versiones. Una vez instalado, necesitamos llamarlo en la parte superior de nuestro fichero `webpack.config.js`:

```diff
+ var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./students.js'],
  output: {
    filename: 'bundle.js',
  },
```
- Para configurarlo tenemos que añadir la siguiente sección en nuestro webpack.config.js (justo después de la definición de los módulos).

_webpack.config.js_

```diff
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
+   plugins: [
+     //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
+     new HtmlWebpackPlugin({
+       filename: 'index.html', //Name of file in ./dist/
+       template: 'index.html', //Name of template in ./src
+      }),
+   ],
```

- Ahora, si ejecutamos webpack veremos como `index.html` es copiado debajo de la carpeta dist y la etiqueta del script se genera automáticamente. Solo una advertencia, no recogemos ningún parámetro hash adicional para evitar el almacenamiento en caché del navegador, podemos hacerlo cambiando la opción hash a true:

```bash
npm run build
```

- Añadimos un parámetro adicional que agregará un valor hash al script generado en el HTML

```diff
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
+     hash:true,
    }),
  ],
```