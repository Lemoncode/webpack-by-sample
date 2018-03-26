# Detect webpack.config changes and auto restart DevServer

You may have realized that any change made into webpack config file will require us to manually re-initialize `webpack-dev-server` by killing current instance and launching a new one (`npm start`). Sometimes, this could be annoying, especially when dealing with many changes in webpack configuration.

In this demo we will find a very simple way to make our webpack-dev-server to automatically restart whenever a change is detected in `webpack-config-file`. For that purpose we will use a tool called [nodemon](https://github.com/remy/nodemon), which in essence, will watch our files and trigger actions whenever a change occurs.

Let's start from the previous sample _00 Intro/05 JQuery_.

Summary steps:

- Install `nodemon` via `npm`.
- Modify `start` script in `package.json`.

# Steps to build it

## Prerequisites

You need to have `Node.js` installed on your computer. Please, take sample _05 JQuery_ as starting point.

## steps

- `npm install` to install previous sample packages, those that are reflected in the `package.json` file:

```bash
npm install
```

- Let's install `nodemon` via `npm` as well. This is a development-only utility (it should be in _devDependencies_), so let's add `--save-dev` modifier.

> Remember that `npm i nodemon -D` we get the same result but with shortcuts.

```bash
npm install nodemon --save-dev
```

It automatically adds that entry to our _package.json_.

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

- Open `package.json` and replace the `start` script by the following one:

### ./package.json

```diff
 "scripts": {
-   "start": "webpack-dev-server --mode development --open",
+   "start": "nodemon --watch webpack.config.js --exec \"webpack-dev-server --mode development\"",
    "build": "webpack --mode development"
  },
```

- As you can see, we can watch whatever file(s) with the `--watch` modifier. In this case we are pointing towards 'webpack.config.js' file. Then, upon any change on that file, let's execute our webpack dev server command: `--exec webpack-dev-server`.

> Now in webpack 4, it is advisable to inform the mode in which we are working, development or production, that's why we add the `--mode development` modifier.

# Test it

Just start your development server

```bash
npm start
```

and notice how `nodemon` is now the launcher of our `webpack-dev-server` as well as the watcher of `webpack.config.js`.

![Command Prompt Start](../../99%20Readme%20Resources/00%20Intro/BONUS%20Auto%20Restart%20DevServer/commandPrompt_start.png)

Now open `webpack.config.js` and just add a empty line at the end to force a change. Save it and look at the terminal.

![Command Prompt Restart](../../99%20Readme%20Resources/00%20Intro/BONUS%20Auto%20Restart%20DevServer/commandPrompt_restart.png)