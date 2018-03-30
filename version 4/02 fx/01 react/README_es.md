# 03 React

En esta demo agregaremos soporte para [React](https://reactjs.org/).

Comenzaremos desde la demo _01 Styles / 03 SASS_, instalaremos React localmente, actualizaremos students.js a students.jsx e incluiremos algunas renderizados básicos.

Resumen de pasos:

- Instala [React](https://facebook.github.io/react/) como una dependencia local.
- Actualiza `students.js` a `students.jsx` y su contenido en consecuencia.
- Resuelve las extensiones `jsx` y señala que el punto de entrada ha cambiado.
- Configura el `webpack.config.js` para admitir `jsx`.

# Pasos para construirlo

## Requisitos previos

Deberás tener instalado [Node.js](https://nodejs.org/en/) en tu equipo. Si deseas seguir esta guía de pasos deberás tomar la demo _03 SASS_ como punto de partida.

## Pasos

- `npm install` para instalar los paquetes de muestra anteriores:

```bash
 npm install
```

- Elimina `mystyles.scss`, no lo necesitaremos para esta demo.

- Actualiza `webpack.config.js`:

### ./webpack.config.js

```diff
  ...
  module.exports = {
    context: path.join(basePath, 'src'),
    entry: {
      app: './students.js',
-     appStyles: [
-       './mystyles.scss',
-     ],
      ...
    },
    ...
  };

```

- React es una biblioteca de código abierto para crear interfaces de usuario, bastante popular hoy en día. Comencemos instalando la biblioteca que está dividida en 2: [react](https://www.npmjs.com/package/react) es la biblioteca central y [react-dom](https://www.npmjs.com/package/react-dom) es como el pegamento entre React y el DOM.

```bash
  npm install react --save
  npm install react-dom --save
```

- `jquery` no lo necesitamos para esta demo por lo que puedes desinstalarlo de forma segura:

```bash
  npm uninstall jquery --save
```

- Y actualiza la entrada vendor en `webpack.config.js` con los siguientes cambios:

### ./webpack.config.js

```diff
  ...
  module.exports = {
    context: path.join(basePath, 'src'),
    entry: {
      app: './students.js',
      vendor: [
-       'jquery',
+       'react',
+       'react-dom',
      ],
      vendorStyles: [
        '../node_modules/bootstrap/dist/css/bootstrap.css',
      ],
    },
    ...
  };
```

- Y elimina de la sección de plugins:

### ./webpack.config.js

```diff
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
-    new webpack.ProvidePlugin({
-      $: "jquery",
-      jQuery: "jquery"
-    }),
```

- En el archivo *`index.html`* agregaremos un elemento `<div>` que será el punto de entrada de nuestra aplicación React..

### ./src/index.html

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
-     <div class="jumbotron">
-       <h1>Testing Bootstrap</h1>
-       <p>
-         Bootstrap is the most popular ...
-       </p>
-     </div>
-     Hello Webpack 3!
-    <div class="red-background">
-      RedBackground stuff
-    </div>
+    <div id="root">
+    </div>
    </body>
  </html>

```

- Vamos a crear nuestro primer componente React `AverageComponent` en la carpeta `src`:

### ./src/averageComponent.jsx

```javascript
  import * as React from 'react';
  import {getAvg} from './averageService';

  export class AverageComponent extends React.Component {
    constructor() {
      super();

      this.state = {
        scores: [90, 75, 60, 99, 94, 30],
        average: 0,
      };
    }

    componentDidMount() {
      this.setState({average: getAvg(this.state.scores)});
    }

    render() {
      return (
        <div>
          <span>Students average: {this.state.average}</span>
        </div>
      );
    }
  }
```

- Vamos a renombrar `students.js` a `students.jsx` y actualizar el código para utilizar React:

### ./src/students.jsx

```diff
+   import * as React from 'react';
+   import * as ReactDOM from 'react-dom';
+   import {AverageComponent} from './averageComponent';
-   import {getAvg} from './averageService';

-   $('body').css('background-color', 'lightSkyBlue');

-   const scores = [90, 75, 60, 99, 94, 30];
-   const averageScore = getAvg(scores);

-   const messageToDisplay = `average score ${averageScore}`;

-   document.write(messageToDisplay);

+   ReactDOM.render(
+     <div>
+       <h1>Hello from React DOM</h1>
+       <AverageComponent />
+     </div>,
+     document.getElementById('root')
+   );
```

- Para que *Babel* analice los archivos `jsx` de React necesitaremos instalar [*babel-preset-react*](https://github.com/babel/babel/tree/master/packages/babel-preset-react).

```bash
  npm install babel-preset-react --save-dev
```

- Agregar la configuración `.babelrc`:

### ./.babelrc

```diff
  {
    "presets": [
-     "env"
+     "env",
+     "react"
    ]
  }
```

- Es hora de actualizar *`webpack.config.js`*, comenzaremos agregando la extensión `jsx`:

### ./webpack.config.js

```diff
  ...
  module.exports = {
    context: path.join(basePath, 'src'),
+   resolve: {
+     extensions: ['.js', '.jsx'],
+   },
    entry: {
-     app: './students.js',
+     app: './students.jsx',
      ...
    },
    ...
  };

```

- En la sección de loader, debemos indicar a *babel-loader* que debe tener en cuenta no sólo los `js` sino también  **`jsx`**, y los ajustes predefinidos de React.

### ./webpack.config.js

```diff
  ...
  module.exports = {
    ...
    module: {
      rules: [
        {
-         test: /\.js$/,
+         test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        ...
      ],
    },
    ...
  };

```

- Finalmente, si ejecutamos la aplicación, veremos la funcionalidad de React en acción.

```bash
  npm start
```