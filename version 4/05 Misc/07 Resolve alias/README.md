# Resolve alias

In this sample we will create aliases to import or require certain modules more easily. For example, we will create an alias for the common _src_ folder.

We will start from sample _02 Plain Vanilla_ of the [jest-testing-by-sample](https://github.com/Lemoncode/jest-testing-by-sample/tree/master/frontend/02%20Plain%20Vanilla) repo.

Summary steps:
 - Edit webpack config.
 - Edit Typescript config.
 - Edit Jest config.
 - Update files with aliases.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Edit webpack config in _common.js_ file:

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

Now, instead of using relative paths when importing like so:

`import { Input, Button } from '../../../common/components/form';`

you can use the alias:

`import { Input, Button } from '@/common/components/form';`

More info about [Resolve alias](https://webpack.js.org/configuration/resolve/#resolve-alias) in Webpack.

- Edit Typescript config in _tsconfig.json_ file:

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

More info about [Resolve alias/Module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html) with Typescript.

- Edit Jest config in _jest.json_ file:

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

More info about [Jest using with webpack](https://jestjs.io/docs/en/webpack).

- Update paths in files and test:

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

- Update in the rest files and test:

```
npm start
```

```
npm run build
```

- And Test Jest config:

```
npm run test
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
