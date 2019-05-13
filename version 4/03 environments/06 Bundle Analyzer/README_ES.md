# 06 Bundle Analyzer

En esta demo vamos a configurar el plugin Webpack Bundle Analyzer, una plugin que nos ayuda a visualizar el tamaño de nuestras librerias y archivos en un treemap interactivo.


Comenzaremos desde el ejemplo _03 Environments/04 Production Configuration_.

Resumen de pasos:
- Instalar plugin Webpack Bundle Analyzer
- Añadir archivo de configuración para performance
- Añadir configuración del plugin en el archivo 
- Crear script de ejecución

# Pasos para construirlo

## Prerequisitos

Requisitos previos, necesitarás tener nodejs instalado en tu ordenador. Si quieres seguir estas guías de pasos, deberá tomar como punto de partida la muestra _04 Production Configuration_.

## Pasos

- `npm install` para instalar los paquetes de muestra anteriores:

```
npm install
```

- Vamos con la instalación del plugin

```
npm install webpack-bundle-analyzer --save-dev
```

- Ahora es momento de crear el archivo de configuración para performance, este usará de base nuestro archivo de configuración de producción (prod.webpack.config.js)


### ./perf.webpack.config.js


- Usaremos el paquete `webpack-merge` para combinar el archivo de configuración de producción con nuestro nuevo archivo de performance.


- Nuestro archivo de configuración de performance se vería así:


```javascript
const merge = require('webpack-merge');
const common = require('./prod.webpack.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
   plugins: [
    new BundleAnalyzerPlugin()
  ]
});

```


- Por último, necesitamos actualizar nuestro script.
- Finally we need to update command script:

### ./package.json

```diff
{
  ...
  "scripts": {
    "start": "webpack-dev-server --open --config dev.webpack.config.js",
    "start:dev": "webpack-dev-server --open --config dev.webpack.config.js",
    "start:prod": "node ./server",
    "build:dev": "rimraf dist && webpack --config dev.webpack.config.js",
    "build:prod": "rimraf dist && webpack --config prod.webpack.config.js"
+   "build:perf": "rimraf dist && webpack --config perf.webpack.config.js" 
  },
  ...
}
```

- Ahora podemos ver nuestro treemap interactivo en funcionamiento ejecutando `npm run build:perf`

![Captura Webpack Bundle Analyzer](./readme-resource/bundleAnalyzer.png)
