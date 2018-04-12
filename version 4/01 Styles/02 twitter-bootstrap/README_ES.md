# 02 Importar Bootstrap

En esta demo veremos la instalación y configuración de webpack para una correcta importación de la librería de CSS [Bootstrap](https://getbootstrap.com/).

Comenzaremos desde el ejemplo _01 Styles / 01 Custom CSS_.

Pasos resumidos:
 - Instalar Bootstrap.
 - Importar la biblioteca CSS.
 - Utiliza un elemento _jumbotron_ de Bootstrap en nuestro HTML.
 - Compruebe que obtenemos errores al ejecutar el paquete web.
 - Instale cargadores adicionales para administrar fuentes y otros
 archivos requeridos por Bootstrap.
 - Verificar resultados.

 # Pasos para construirlo

## Prerrequisitos

Requisitos previos, necesitará tener _nodejs_ (al menos v 8.9.2) instalado en su computadora. Si desea seguir estas guías de pasos, deberá tomar como punto de partida la muestra  _00 Intro/05 JQuery_.

## pasos

- `npm install` para instalar los paquetes de muestra anteriores

```
npm install
```

- Comencemos por la instalación de Bootstrap:

```
npm install bootstrap --save
```

- Ahora, importemos la biblioteca CSS para incluirla en nuestro proyecto:

_webpack.config.js_

```diff
module.exports = {
  entry: {
    app: './students.js',
    appStyles: [
      './mystyles.css',
    ],
    vendor: [
      'jquery',
    ],
+     vendorStyles: [
+       './node_modules/bootstrap/dist/css/bootstrap.css',
+     ],    
  },
``` 

- Dado que vamos a profundizar en * node_modules *, en la sección del cargador de CSS, excluiremos los node_modules:

_webpack.config.js_

```diff
  {
    test: /\.css$/,
-    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: {
        loader: 'css-loader',
      },
    }),
  },
```

- Modifiquemos nuestro * index.html * e incluyamos algún componente específico de Bootstrap:

_index.html_

```diff
<body>
+    <div class="jumbotron">
+      <h1>Testing Bootstrap</h1>
+      <p>
+        Bootstrap is the most popular ...
+      </p>
+    </div>

  Hello Webpack 4!
  <div class="red-background">
    RedBackground stuff
  </div>
</body>
```

- Intenta ejecutar el paquete web ahora, solo ingresa la línea de comando:

```bash
npm start
```

> Bootstrap 4 no envía glyphicons u otro tipo de archivos, si está trabajando
con la versión 3, necesitará tuberías adicionales (consulte la versión 3)
