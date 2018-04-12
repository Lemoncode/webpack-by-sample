# Sin configuración

Una de las nuevas características anunciadas por webpack es la posibilidad de usar este paquete sin necesidad de configuración, simplemente, si sigue algunas convenciones, no necesitará crear fichero de configuración.

Aunque suene genial, solo funcionará para casos sencillos (demos rápidas o testeos); por ejemplo, sin configuración no podrá transpilar usando babel.

En esta demo vamos a probar como podemos ejecutar un sencillo ejemplo.

# Pasos para generarlo

## Prerrequisitos

Instalar [Node.js y npm](https://nodejs.org/es/) (min v8.9) si todavía no los ha instalado en su ordenador.

> Verifique que está utilizando como mínimo las versiones de node v8.x.x y npm 5.x.x ejecutando los comandos `node -v` y `npm -v` en la consola/terminal de windows. Versiones antiguas pueden dar errores.

## Pasos

- Navegue a la carpeta donde va a crear el proyecto vacío.

- Ejecute `npm init`, se le pedirá que responda sobre algunas cuestiones del proyecto (una vez las haya respondido se generará el fichero **`package.json`**)

```bash
npm init -y
```

> Usando "y" aceptamos los valores por defecto que pregunta init (tenga cuidado si ha creado una carpeta cuyo nombre contenga mayúsculas o espacios en blanco porque fallará).

- Instalar **webpack** y **webpack-cli** localmente como una dependencia de desarrollo (la razón para instalarlo localmente y no globalmente es para que sea sencillo de configurar; por ejemplo, puede ser lanzada en un equipo limpio sin tener que instalar nada globalmente excepto nodejs).

```bash
npm install webpack webpack-cli --d
```

- Para poder lanzar webpack, modifique el fichero **`package.json`** y añada la siguiente propiedad `"build": "webpack --mode development"` dentro del objeto scripts. Esto nos permitirá lanzar webpack desde la línea de comandos con la instrucción de npm `npm run build`.

> Ahora en webpack 4, en la línea de comandos desde donde lo llamamos, es obligatorio informar el modo en el que estamos trabajando, desarrollo o producción (minificación, etc...).

Ahora, nuestro fichero **`package.json`** debería ser parecido a este:

### ./package.json
```diff
{
  "name": "ejemplosinconfiguracion",
  "version": "1.0.0",
  "description": "Una de las nuevas características anunciadas por webpack es la posibilidad de usar este paquete sin necesidad de configuración, simplemente, si sigue algunas convenciones no necesitará crear fichero de configuración",
  "main": "index.js",
  "scripts": {
+   "build": "webpack --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "webpack": "^4.0.1",
    "webpack-cli": "^2.0.10"
  }
}
```

- Con esta configuración, por defecto, webpack buscará el punto de entrada en
_./src/index.js_; vamos a crear un fichero de prueba:

_./src/index.js_

```javascript
console.log('mira! sin configuración');
```

- Ahora, si lo ejecutamos

```bash
npm run build
```

Tendremos todos los ficheros necesarios en la carpeta _./dist_.

Hasta aqui todo bien. En esta versión, esta característica esta bien para demos rápidas, pero no para ser usada en un entorno real. Se espera que en futuras versiones se optimice esta configuración.
