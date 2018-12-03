# Resolve alias

En este ejemplo crearemos alias para importar o requerir ciertos módulos más fácilmente. Por ejemplo, crearemos un alias para la carpeta común _src_.

Empezaremos desde el ejemplo _02 Plain Vanilla_ del repo [jest-testing-by-sample](https://github.com/Lemoncode/jest-testing-by-sample/tree/master/frontend/02%20Plain%20Vanilla).

Pasos resumidos:
 - Editar la configuración de Webpack.
 - Editar la configuración de Typesript.
 - Editar la configuración de Jest.
 - Actualizar los ficheros con los alias.

# Pasos para construirlo.

- `npm install` para instalar los paquetes del ejemplo previo.

```bash
npm install
```

- Editar la configuración de webpack en el fichero _common.js_:

### ./src/config/webpack/common.js

```diff
const { CheckerPlugin } = require('awesome-typescript-loader');
+ const helpers = require('../helpers');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
+    alias: {
+      '@': helpers.resolveFromRootPath('src'),
+    },
  },
  module: {
    ···
```

Ahora, en lugar de usar rutas relativas cuando importemos algo como:

`import { Input, Button } from '../../../common/components/form';`

puedes usar el alias:

`import { Input, Button } from '@/common/components/form';`

Más información sobre [Resolve alias](https://webpack.js.org/configuration/resolve/#resolve-alias) en Webpack.

- Editar la configuración de Typescripten el fichero _tsconfig.json_:

### ./src/tsconfig.json

```diff
···
    "skipLibCheck": true,
-    "esModuleInterop": true
+    "esModuleInterop": true,
+    "baseUrl": ".",
+    "paths": {
+      "@/*": ["src/*"],
+    }
  },
  "compileOnSave": true,
  ···

```

Más información sobre [Resolve alias/Module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html) con Typescript.

- Editar la configuración Jest en el fichero _jest.json_:

### ./src/config/test/json.json

```diff
{
  "rootDir": "../../",
+  "moduleNameMapper": {
+    "^@/(.*)": "<rootDir>/src/$1"
+  },
  "preset": "ts-jest",
  ···

```

Más información sobre [Jest using with webpack](https://jestjs.io/docs/en/webpack).

- Actualizar las rutas en los ficheros siguientes (como muestra):

### ./src/pages/login/components/form.tsx

```diff
import * as React from 'react';
import { FormProps } from './formProps';
- import { Input, Button } from '.../../../common/components/form';
+ import { Input, Button } from '@/common/components/form';
···

```

### ./src/pages/login/mappers.ts

```diff
- import * as model from '../../rest-api/model';
+ import * as model from '@/rest-api/model';
import * as vm from './viewModel';
···

```

### ./src/pages/members/list/mappers.spec.ts

```diff
- import * as model from '../../../rest-api/model';
+ import * as model from '@/rest-api/model';
import * as vm from './viewModel';
import { mapMemberListModelToVM } from './mappers';
···

```

- Actualiza las rutas en el resto de ficheros y pruébalo:

```
npm start
```

```
npm run build
```

- Y prueba la configuración de Jest:

```
npm run test
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
