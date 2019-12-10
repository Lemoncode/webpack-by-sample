# 07 Webpack Monitor

En esta demo vamos a instalar y configurar el plugin "Webpack Monitor", el cual genera datos relevantes de nuestros builds y nos provee de una herramienta interactiva de análisis de la composición de los bundles.

Comenzaremos desde la demo _03 Environments/06 Bundle Analyzer_

Resumen de los pasos a seguir:

- Instalar el plugin.
- Añadir el plugin al fichero de configuración de webpack requerido.

# Pasos para construirlo

## Prerequisitos

Es necesario tener instalado nodejs en nuestra máquina. Si quiere seguir estas guías de pasos, deberá tomar como punto de partida la muestra _06 Bundle Analyzer_

## Pasos

- `npm install` para instalar los paquetes de muestra anteriores:

```
npm install

```

- Vamos con la instalación del plugin:

```
npm install webpack-monitor --save-dev

```

- Añadir el plugin a, por ejemplo, nuestro _dev.webpack.config.js_:


```
1.- Crear la siguiente variable:

const WebpackMonitor = require('webpack-monitor');
 
2.- Añadir la siguiente entrada en el array de plugins:

new WebpackMonitor({
    capture: true, // -> default 'true'
    target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
    launch: true, // -> default 'false'
    port: 3030, // default -> 8081
})

```

- Explicación de los parámetros:

```
- "capture" captura datos del build cuando ocurren cambios que sean relevantes. El plugin no captura datos si el build que inspecciona no ha cambiado desde el anterior creado. Su valor por defecto es "true".

- "target" indica dónde se guardará los datos capturados. Su valor por defecto es "../monitor/stats.json".

- "launch" levanta un server local y abre una página web con la herramienta de análisis. Su valor por defecto es "false".

- "port" establece el puerto del server local. Su valor por defecto es "8081".

```

- Ahora podemos ver nuestro plugin en funcionamiento ejecutando el comando: `npm run build:dev`
Dependiendo de la máquina en que estemos trabajando, el plugin puede tardar un poco en mostrar la página en nuestro navegador. Ten paciencia!.

![Captura Webpack Monitor](./readme-resources/webpack_monitor.png)
