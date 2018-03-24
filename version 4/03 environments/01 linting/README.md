# 01 Linting

In this sample we are going to introduce Linting. This is a technique which you can analyse code for potential errors, so that can help you to make less mistakes.

We will start from sample _01 Styles/03 SASS_.

Summary steps:
 - Installing ESLint.
 - Configuring ESLint.
 - Connecting with Babel.
 - Connecting with Webpack.
 - Adding custom rules.

# Steps to build it

## Prerequisites

You will need to have nodejs installed in your computer. 

If you want to follow this step guides you will need to take as starting point sample _01 Styles/03 SASS_.

## Steps

- Run `npm install` to install packages from previous sample:

```
npm install
```

- [ESLint](http://eslint.org/) is the newest tool for _linting_ that goes to the next level and it allows us to use custom rules, parsers, plugins, etc.
Let's start by downloading the `eslint` library via `npm`:

```
npm install eslint -D
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
    "start": "webpack-dev-server",
    "build": "rimraf dist && webpack",
-   "build:prod": "rimraf dist && webpack -p"
+   "build:prod": "rimraf dist && webpack -p",
+   "lint": "eslint ."
  },
  ...
}

```

- Executing this command

```
npm run lint
```

- We get linter errors the following output:

_ESLint throws two parsing errors due to the usage of _export_ and _import_ keywords. Import and export functionalities are provided by Babel to work with modules, so it's time to connect ESLint with Babel:_

```
npm install babel-eslint -D
```

### ./.eslintrc.json
```diff
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
    "node": true
  },
+ "parser": "babel-eslint"
}

```
- Then, when we run the `npm run lint` command again we get the following result:

_As we see, this time we have an error related to `jquery` library. To solve this we need to change the linter configuration to define the `jquery` global variables, the same that we did with `browser` and `node` related variables:_

### ./.eslintrc.json
```diff
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
-   "node": true
+   "node": true,
+   "jquery": true
  },
  "parser": "babel-eslint"
}

```

- Now if we run `npm run lint` again:

![eslint no errors](../../99%20Readme%20Resources/03%20Environments/01%20Linting/eslint%20no%20errors.png)


- As we see, this time the command doesn't throw any errors. That sounds good! But we want to execute ESLint while we are writing our code, so the following step is connect ESLint with Webpack, so the `webpack-dev-server` uses it to continuously check for errors.

- We should install `eslint-loader`:

```
npm install eslint-loader --save-dev
```

- To configure Webpack, we're going to use a preloader definition. We make sure ESLint parses the code before any other process. We get a _`webpack.config.js`_ like this:

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  module: {
    rules: [
+     {
+       test: /\.js$/,
+       exclude: /node_modules/,
+       enforce: 'pre',
+       loader: 'eslint-loader',
+     },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
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
    "start": "webpack-dev-server",
    "build": "rimraf dist && webpack",
+   "build:prod": "rimraf dist && webpack -p"
-   "build:prod": "rimraf dist && webpack -p",
-   "lint": "eslint ."
  },
  ...
}

```

- Now if we execute again `npm start`, at first sight it looks like nothing new happens with the build. But let's change the code to introduce a typo:

### ./src/students.js

```diff
import {getAvg} from "./averageService";

$('body').css('background-color', 'lightSkyBlue');

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);

const messageToDisplay = `average score ${averageScore}`;

- document.write(messageToDisplay);
+ document.write(message);
```

- As soon as we save the javascript file, we get the linter error:

## Defining Rules

- As we saw previously, we are using [ESLint default rules](http://eslint.org/docs/rules/). That was set up in the linter configuration file.

### ./.eslintrc.json
```diff
{
  "extends": [
    "eslint:recommended"
  ],
  ...
}

```

- The good news is that we can [configure all of these rules](http://eslint.org/docs/user-guide/configuring#configuring-rules) using the following values:

  - `0` or `off` - Disable rule.
  - `1` or `warn` - Enable the rule with "warning" severity.
  - `2` or `error` - Enable the rule with "error" severity.

- For example, if we change `students.js` to this code:

### ./src/students.js
```diff
import {getAvg} from "./averageService";

$('body').css('background-color', 'lightSkyBlue');

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);

const messageToDisplay = `average score ${averageScore}`;

- document.write(message);
+ console.log(messageToDisplay);

```

- As result, we get this error because the use of _console_ is not allowed by default.

![console error](../../99%20Readme%20Resources/03%20Environments/01%20Linting/console%20error.png)

- We can disable this rule with the following configuration:

### ./.eslintrc.json
```diff
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jquery": true
  },
- "parser": "babel-eslint"
+ "parser": "babel-eslint",
+ "rules": {
+   "no-console": 0
+ }
}

```
- We can trigger the linting by saving the `students.js` file again with no changes. Then we can see how the error referring to the console is not shown anymore.

![disabling no-console rule](../../99%20Readme%20Resources/03%20Environments/01%20Linting/disabling%20no-console%20rule.png)

- Other example is the rule named [max-lines](http://eslint.org/docs/rules/max-lines). This rule _enforces a maximum number of lines per file, in order to aid in maintainability and reduce complexity._ For demo purposes we're going to configure it with a ridiculously low number of lines, that is, just one, so we can see the error.

### ./.eslintrc.json
```diff
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jquery": true
  },
  "parser": "babel-eslint",
  "rules": {
-   "no-console": 0
+   "no-console": 0,
+   "max-lines": ["error", 1]
  }
}

```

_NOTE:_ In the rule configuration, we can use the value `2` instead of `"error"` to define the severity, but for a better readability we prefer to use the `"error"` syntax instead of the numeric value.

- Again, we can trigger the linting action by saving the `students.js` file.

![enable max-lines rule](../../99%20Readme%20Resources/03%20Environments/01%20Linting/enable%20max-lines%20rule.png)

- To "go back to normal" we should remove the rule or configure it to a more reasonable number of lines per file.

- Finally, if we want to integrate eslint with a React based project, we can use [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) that provides linting for JSX language.
