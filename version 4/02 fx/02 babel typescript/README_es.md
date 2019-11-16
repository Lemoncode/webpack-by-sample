# 00 TypeScript

En esta demo añadiremos soporte para TypeScript. 
Se hará el proceso de transpilación en dos pasos:
  - Typescript a ES6 usando plomería de Typescript.
  - De ES6 a ES5 usando babel.

¿Por qué este enfoque? 
Queremos que nuestro proyecto sea lo más estándar posible, si transpilas de es6 a es5
usando babel estarías usando el mismo enfoque que muchos proyectos y librerías existentes.

Comenzamos desde el ejemplo  _01 Styles/03 SASS_, instalando TypeScript localmente,
luego configuramos el fichero tsconfig, añadimos un ts, instalamos awesome-typescript-loader y lo 
aplicamos al webpackconfig.

Resumen de pasos: 
 - Instalamos TypeScript como una dependencia local.
 - Configuramos TypeScript en nuestro proyecto (tsconfig)
 - Convertimos nuestro proyecto a TypeScript y añadimos en nuestro código  algunas de las características
 del ts.
 - Instalar [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader).
 - Añadir la configuración apropiada en `webpack.config.js`

## Prerrequisitos

Necesitas tener nodejs instalado en tu ordenador (al menos v. 8.9.2). 
Si quieres seguir estos pasos necesitas tomar como punto de partida el ejemplo _03 SASS_.

## Pasos

- _npm install_ para instalar los paquetes previos:

```bash
npm install
```

- TypeScript un buen set de JavaScript que permite el tipado estático entre otras características interesantes. Todo el código que tipamos con TypeScript no correrá en el navegador, por lo que necesitamos transpilarlo. Vamos a instalar TypeScript localmente(\*).

```
npm install typescript --save-dev
```

_(*) Porqué instalamos TypeScript localmente y no globalmente? Instalando localmente el proyecto, no dependemos de dependencias globales y es más fácil hacer por ejemplo un build y pasar los tests unitarios en limpio en
una máquina de integración contínua, CI (Continuous Integration) como [Travis](https://travis-ci.org/), [Docker](https://www.docker.com/), [Jenkins](https://jenkins.io/), etc.

Otro beneficio de instalar localmente es que podemos poner una versión de typescript sin que interfiera con la versión global._

- El próximo paso es añadir el fichero de configuración de TypeScript, *`tsconfig.json`*.
En este archivo definiremos la configuración que queremos por ejemplo transpilar a ES5 entre otras.

_./tsconfig.json_

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "jsx": "react",
    "sourceMap": true,
    "noLib": false,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}
```

- Para poder tener  el intelisense de JQuery, podemos instalar los tipados de  JQuery:

```
npm install @types/jquery --save-dev
```

- Vamos a portar nuestro código a Typescript, luego renombramos los ficheros *`students.js`* y *`averageService.js`* a _students.**ts**_ y _averageService.**ts**_.


- Introduciremos algún código TypeScript, en *`students.ts`* vamos a tipar las variables
que estamos usando:

_./src/students.ts_
```diff
import {getAvg} from "./averageService";

$('body').css('background-color', 'lightSkyBlue');

- const scores = [90, 75, 60, 99, 94, 30];
+ const scores: number[] = [90, 75, 60, 99, 94, 30];
- const averageScore = getAvg(scores);
+ const averageScore: number = getAvg(scores);

- const messageToDisplay = `average score ${averageScore}`;
+ const messageToDisplay: string = `average score ${averageScore}`;

document.write(messageToDisplay);
```

- Ahora vamos a tipar nuestra función en *`averageService.ts`*:

```diff
- export function getAvg(scores) {
+ export function getAvg(scores: number[]): number {
   return getTotalScore(scores) / scores.length;
  }

- function getTotalScore(scores) {
+ function getTotalScore(scores: number[]): number {
    return scores.reduce((score, count) => {
      return score + count;
    });
  }
```

- Ahora nos toca configurar *wepback*, vamos a instalar un loader que manejará TypeScript: [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader).

```
npm install awesome-typescript-loader --save-dev
```

- Vamos a actualizar el *`webpack.config.js`* para poder usar este loader en los archivos con extensiones **ts** y para evitar tener que añadir extensiones a las importaciones de los archivos ts, solo lo añadimos 
 al array de extensiones a ser resueltas:

_./webpack.config.js_
```diff
module.exports = {
  context: path.join(basePath, 'src'),
+  resolve: {
+    extensions: ['.js', '.ts']
+  },  
  entry: {
-    app: './students.js',
+    app: './students.ts'
    appStyles: [
      './mystyles.scss',
    ],
    vendor: [
      'jquery',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
```

- Ahora vamos a configurar el loader apropiado para las extensiones _.ts_ 

_./webpack.config.js_
```diff
  module: {
    rules: [
+      {
+        test: /\.(ts|tsx)$/,
+        exclude: /node_modules/,
+        loader: 'awesome-typescript-loader',
+        options: {
+          useBabel: true,
+          "babelCore": "@babel/core", // needed for Babel v7
+        },
+      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
```

> Es posible usar directamente babel 7 para transpilar a typescript (preset-typescript) pero el chequeo de los tipados será omitido:
https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/, es un proceso más rápido pero tendrás que confiar al editor las habilidades de chequeo.

- Si corremos la app (`npm start`) podemos chequear que todo va como esperamos.

- Si abrimos la consola del navegador podemos acceder a los ficheros `.ts` y podemos añadir breakpoints gracias
a la configuración previa de los `sourceMap`:

### ./tsconfig.json
```javascript
{
  "compilerOptions": {
    ...
    "sourceMap": true,
    ...
  },
  ...
}

```

### ./webpack.config.js
```javascript
...
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  ...

```