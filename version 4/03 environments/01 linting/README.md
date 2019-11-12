# 01 Linting

In this sample we are going to introduce Linting. This is a technique which you can analyse code for potential errors, so that can help you to make less mistakes.

We will start from sample _02 fx/01 typescript_.

Summary steps:
 - Installing ESLint.
 - Configuring ESLint.
 - Connecting with Babel.
 - Connecting with Webpack.
 - Adding custom rules.

# Steps to build it

## Prerequisites

You will need to have nodejs installed in your computer. 

If you want to follow this step guides you will need to take as starting point sample _02 fx/01 typescript_.

## Steps

- Run `npm install` to install packages from previous sample:

```
npm install
```

- [ESLint](http://eslint.org/) is the newest tool for _linting_ that goes to the next level and it allows us to use custom rules, parsers, plugins, etc.
Let's start by downloading the `eslint` library via `npm`:

```
npm install eslint --save-dev
```

- ESLint works with Babel and JSX syntax by installing plugins. That is, it's a great library to develop React projects. This sample is a demo, so we're going to implement just a basic configuration.
We are going to create a file `.eslintrc.json` (there are many [file formats options](http://eslint.org/docs/user-guide/configuring#configuration-file-formats))

### ./.eslintrc.json
```json
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
    "node": true
  }
}
```
- **Note that `eslint:recommended` must not include spaces after the colon (:) character.**
- This is the most basic configuration, where we are using [defaults rules](http://eslint.org/docs/rules/) provided by ESLint and we are defining [browser and node environments](http://eslint.org/docs/user-guide/configuring#specifying-environments) to define `browser` related global variables like *window* object, and `node` related global variables like *require* or *__dirname*.

- We can implement a [npm command script](https://docs.npmjs.com/misc/scripts) to run eslint:

### ./package.json
```diff
{
  ...
  "scripts": {
    ...    
+   "lint": "eslint './src/**/*.{ts,tsx}'"
  },
  ...
}

```

- Executing this command

```
npm run lint
```

- We get linter errors the following output:

_ESLint throws errors due to the usage of _export_ and _import_ keywords. Import and export functionalities are provided by Babel to work with modules, so it's time to connect ESLint with Typescript:_

```
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

### ./.eslintrc.json
```diff
{
  "extends": [
-   "eslint:recommended"
+   "plugin:@typescript-eslint/recommended"
  ],
  "env": {
    "browser": true,
    "node": true
  },
+ "parser": "@typescript-eslint/parser",
+ "plugins": ["@typescript-eslint"]
}

```

- If we run `npm run lint` again, we still have some issues related with React. Let's configure it:

```
npm install eslint-plugin-react --save-dev
```

### ./.eslintrc.json
```diff
{
  "extends": [
    "plugin:@typescript-eslint/recommended",
+   "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"]
}

```

- Let's fix some errors:

### ./src/averageService.ts

```diff
+ function getTotalScore(scores: number[]): number {
+   return scores.reduce((score, count) => score + count);
+ }

export function getAvg(scores: number[]): number {
  return getTotalScore(scores) / scores.length;
}

- function getTotalScore(scores: number[]): number {
-   return scores.reduce((score, count) => score + count);
- }

```

- We can [configure all of these rules](http://eslint.org/docs/user-guide/configuring#configuring-rules) using the following values:

  - `0` or `off` - Disable rule.
  - `1` or `warn` - Enable the rule with "warning" severity.
  - `2` or `error` - Enable the rule with "error" severity.

### ./.eslintrc.json
```diff
{
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
+ "rules": {
+   "@typescript-eslint/no-var-requires": 0
+ }
}

```

> NOTE: If you want to remove the React warning:

```diff
...
  "rules": {
    "@typescript-eslint/no-var-requires": 0
  },
+ "settings": {
+   "react": {
+     "version": "detect"
+   }
+ }
}
```

- As we see, this time the command doesn't throw any errors. That sounds good! But we want to execute ESLint while we are writing our code, so the following step is connect ESLint with Webpack, so the `webpack-dev-server` uses it to continuously check for errors.

- We should install `eslint-loader`:

```
npm install eslint-loader --save-dev
```

> What about getting error at IDE editing code time (install a Vs Code plugin).

- To configure Webpack, we're going to use a preloader definition. We make sure ESLint parses the code before any other process. We get a _`webpack.config.js`_ like this:

### ./webpack.config.js

```diff
...

module.exports = {
  ...
  module: {
    rules: [
+     {
+       test: /\.tsx?$/,
+       exclude: /node_modules/,
+       enforce: 'pre',
+       loader: 'eslint-loader',
+     },
      ...
    ],
  },
  ...
};

```

- Now we can remove the npm command introduced previously to run the linter and use only the `webpack-dev-server`.

### ./package.json
```diff
{
  ...
  "scripts": {
  ...
-   "lint": "eslint './src/**/*.{ts,tsx}'"
  },
  ...
}

```

- Now if we execute again `npm start`, at first sight it looks like nothing new happens with the build. But let's change the code to introduce a typo:

### ./src/students.tsx

```diff
...
- const img = document.createElement('img');
+ const image = document.createElement('img');
```
