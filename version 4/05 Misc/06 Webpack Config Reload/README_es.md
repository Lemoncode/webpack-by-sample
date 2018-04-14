# Detecta los cambios de webpack.config y reinicia automáticamente DevServer

Es posible que te hayas dado cuenta de que cualquier cambio realizado en el archivo de configuración del webpack (`webpack.config.js`) nos obligará a reiniciar manualmente `webpack-dev-server`, finalizando la instancia actual y lanzando una nueva (`npm start`). A veces, esto podría ser molesto, especialmente cuando se trata de muchos cambios en la configuración del paquete web.

En esta demostración, encontraremos una manera muy simple de hacer que nuestro servidor webpack-dev-server se reinicie automáticamente cada vez que se detecte un cambio en el `webpack.config.js`. Para eso utilizaremos una herramienta llamada [nodemon](https://github.com/remy/nodemon), que en esencia, se dedicará a observar nuestros archivos y activará las acciones que definamos cada vez que ocurra un cambio.

Comencemos desde el ejemplo anterior _00 Intro/05 JQuery_.

Pasos resumidos:

- Instalar `nodemon` vía `npm`.
- Modificar el script `start` en el `package.json`.

# Pasos para generarlo

## Requisitos previos

Debes tener `Node.js` instalado en tu equipo. Por favor, revisa el ejemplo _05 jQuery_ como punto de partida.

## Pasos

- `npm install` para instalar los paquetes del ejemplo anterior, es decir, los que se encuentran reflejados en el archivo `package.json`:

```bash
npm install
```

- Ahora, vamos a instalar `nodemon` vía `npm` también. Ésta es una utilidad de sólo desarrollo (es decir, deberá estar en _devDependencies_), así que agreguemos el modificador `--save-dev`.

> Recuerda que `npm i nodemon -D` obtenemos el mismo resultado pero con comandos abreviados.

```bash
npm install nodemon --save-dev
```

Automáticamente agregará la entrada `nodemon` a nuestro  _package.json_.

### ./package.json

```diff
{
  ...
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.3",
    "babel-preset-env": "^1.6.1",
    "webpack": "^4.0.1",
    "webpack-cli": "^2.0.9",
    "html-webpack-plugin": "^3.0.4",
    "webpack-dev-server": "^3.1.0",
+   "nodemon": "^1.17.2"
  },
}
```

- Abrir `package.json` y remplazar el script `start` con la siguiente línea:

### ./package.json

```diff
 "scripts": {
-   "start": "webpack-dev-server --mode development --open",
+   "start": "nodemon --watch webpack.config.js --exec \"webpack-dev-server --mode development\"",
    "build": "webpack --mode development"
  },
```

- Como puedes ver, podemos vigilar cualquier archivo con el modificador `--watch`. En este caso, apuntamos al archivo `webpack.config.js`. Después de producirse cualquier cambio en ese archivo, se ejecutará en nuestro servidor el comando: `--exec webpack-dev-server --mode development`.

> Ahora en webpack 4, es recomendable informar el modo en el que estamos trabajando, desarrollo o producción, por eso añadimos el modificador `--mode development`.

# Pruébalo

Simplemente inicia el servidor de desarrollo.

```bash
npm start
```

y observa cómo ahora `nodemon` es el lanzador de nuestro `webpack-dev-server` y el observador apunta a `webpack.config.js`.

![Command Prompt Start](../../99%20Readme%20Resources/00%20Intro/BONUS%20Auto%20Restart%20DevServer/commandPrompt_start.png)

Ahora abre el archivo `webpack.config.js` y simplemente agrega una línea vacía al final para forzar un ciclo de cambio. Guárdalo y mira la terminal.

![Command Prompt Restart](../../99%20Readme%20Resources/00%20Intro/BONUS%20Auto%20Restart%20DevServer/commandPrompt_restart.png)